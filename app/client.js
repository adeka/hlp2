//once snapshot is retrieved, loadclients interates and adds UI elements for them
loadClients = function(clients){
    $("#clientWrap").empty();
    var clientList = Object.keys(clients);
    clientList.forEach(createClient);
}
//creates some elements for browsing clients
createClient = function(e){
    var closed = false;
    var clientRow = $('<div class="client"></div>');
    var clientLogo = $('<h2>' + e + '</h2>');

    $( clientLogo ).on( "click", function() {
        if(!closed){
            $(clientRow).height(70);
            $(clientRow).css("overflow", "hidden");
            closed = true;
            setCookie(e, "true", 999);
        }
        else{
            $(clientRow).height("auto");
            $(clientRow).css("overflow", "auto");
            closed = false;
            setCookie(e, "false", 999);
        }
    });

    if(getCookie(e) == "true"){

        $(clientRow).height(70);
        $(clientRow).css("overflow", "hidden");
        closed = true;
    }
    else{
        $(clientRow).height("auto");
        $(clientRow).css("overflow", "auto");
        closed = false;
    }

    var removeClient = $('<div class="deleteIcon"><i class="fa fa-remove"></i><p>Add New Page</p><div>');
    var clientEdit = $('<div class="add"><i class="fa fa-plus"></i><p>Add New Page</p><div>');
    $(clientRow).append(clientLogo).append(clientEdit);
    $("#clientWrap").append(clientRow);

    $( clientEdit ).click(function() {
        newModal("Name Your Landing Page", addPage, e)
    });

    ref.child(e).on("value", function(snapshot) {
        pages = snapshot.val();
        loadPages(pages, e, clientRow);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
//loads a clients corresponding landing pages and iterates over them
loadPages = function(pages, client, scope){
    var pageList = Object.keys(pages);
    pageList.remove("locked");
    for(var i = 0; i< pageList.length; i++){
        createPage(pageList[i], client, scope, pages.locked);
    }
}
//creates elements for a client landing page
createPage = function(page, client, scope, locked){
    var isLocked = false;
    var pageRow = $('<div class="page"></div>');
    var pageTitle = $('<h4><i class="fa fa-file-o"></i> '+page+'</h4>');
    var pageLock = $('<button data-toggle="tooltip" title="Lock" class=""><i class="fa fa-unlock-alt"></button>');

    var pageEdit = $('<button data-toggle="tooltip" title="Edit" class=""><i class="fa fa-edit"></button>');
    var pageDelete = $('<button data-toggle="tooltip" title="Delete" class=""><i class="fa fa-remove"></button>');
    $( pageDelete ).click(function() {
        booleanModal("Are you sure you want to delete this page?", deletePage, client, page);
    });

    var pageClone = $('<button data-toggle="tooltip" title="Clone" class=""><i class="fa fa-copy"></button>');

    var lock = function(lock){
        if(lock){
            $(pageLock).find("i").removeClass("fa-unlock-alt");
            $(pageLock).find("i").addClass("fa-lock");
            isLocked = true;
            $(pageEdit).addClass("disabled");
            $(pageDelete).addClass("disabled");
            $(pageClone).addClass("disabled");
        }
        else{
            $(pageLock).find("i").removeClass("fa-lock");
            $(pageLock).find("i").addClass("fa-unlock-alt");
            isLocked = false;
            $(pageEdit).removeClass("disabled");
            $(pageDelete).removeClass("disabled");
            $(pageClone).removeClass("disabled");
        }

    }

    if(locked && !(locked[page] == undefined) && !(locked[page] == null) && locked[page]){
        lock(true);
    }

    $( pageLock ).click(function() {
        if(!isLocked){
            lock(true);
            var temp = {};
            temp[page] = true;
            ref.child(client).child("locked").update(temp);
        }
        else if(isLocked){
            lock(false);
            var temp = {};
            temp[page] = false;
            ref.child(client).child("locked").update(temp);
        }
    });

    var buttons = $('<div class="buttons"></div>');
    $( pageEdit ).click(function() {
        ref.child(client).child(page).on("value", function(snapshot) {
            context = snapshot.val();
            loadApp(client, page, ref.child(client).child(page));
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    });
    $(buttons).append(pageLock).append(pageDelete).append(pageClone).append(pageEdit);
    $(pageRow).append(pageTitle).append(buttons);
    $(scope).append(pageRow);
}

deletePage = function(modalWrap, client, page){
        var n = {};
        n[page] = {};
        ref.child(client).update(n);
        $(modalWrap).remove();
}

addPage = function(modalWrap, input, warning, client){
    var name = $(input).val();
    if(name != ""){
        if(
            name.indexOf('&') === -1 &&
            name.indexOf('.') === -1 &&
            name.indexOf('$') === -1 &&
            name.indexOf('[') === -1 &&
            name.indexOf(']') === -1 &&
            name.indexOf('/') === -1
        ){
        var n = {};
        n[name] = getEmptyPage(name);
        ref.child(client).update(n);
        $(modalWrap).remove();
    }
    else{
        $(warning).text("Page name is UTF-8 encoded, cannot contain & . $ # [ ] / or ASCII control characters 0-31 or 127");
    }
}
else{
    $(warning).text("Name cannot be empty");
}
}


addClient = function(modalWrap, input, warning){
    var name = $(input).val();
    if(name != ""){
        if(
            name.indexOf('&') === -1 &&
            name.indexOf('.') === -1 &&
            name.indexOf('$') === -1 &&
            name.indexOf('[') === -1 &&
            name.indexOf(']') === -1 &&
            name.indexOf('/') === -1
        ){
            var n = {};
            n[name+""] = "";
            ref.update(n);
            $(modalWrap).remove();
        }
        else{
            $(warning).text("Client name is UTF-8 encoded, cannot contain & . $ # [ ] / or ASCII control characters 0-31 or 127");
        }
    }
    else{
        $(warning).text("Name cannot be empty");
    }
}


newModal = function(title, success, client) {
    var modalWrap = $('<div id="modalWrap" class="wrap"></div>');
    var inside = $('<div id="modalDialogue" ></div>');

    $(modalWrap).append(inside);

    var header = $('<h3>'+title+'</h3>');
    var input = $('<input></input>');
    var okay = $('<button class="green"> OKAY </button>');
    var cancel = $('<button class="red" id="cancelModal"> CANCEL </button>');

    $( cancel ).click(function() {
        $(modalWrap).remove();
    });

    $(okay).click(function() {
        success(modalWrap, input, warning, client);
    });

    var warning = $('<div class="warningText"></div>');

    $(inside).append(header).append(input).append(okay).append(cancel).append(warning);
    $("body").append(modalWrap);
}

booleanModal = function(title, success, client, page) {
    var modalWrap = $('<div id="modalWrap" class="wrap"></div>');
    var inside = $('<div id="modalDialogue" ></div>');

    $(modalWrap).append(inside);

    var header = $('<h3>'+title+'</h3>');
    var okay = $('<button class="green"> YES </button>');
    var cancel = $('<button class="red" id="cancelModal"> NO </button>');

    $( cancel ).click(function() {
        $(modalWrap).remove();
    });

    $(okay).click(function() {
        success(modalWrap, client, page);
    });

    $(inside).append(header).append(okay).append(cancel);
    $("body").append(modalWrap);
}

AddElementModal = function(page) {
    var modalWrap = $('<div id="modalWrap" class="wrap"></div>');
    var cancel = $('<br><button class="red" id="cancelModal"> CANCEL </button>');
    $( cancel ).click(function() {
        $(modalWrap).remove();
    });
    var warning = $('<div class="warningText"></div>');
    var header = $('<h3>Select an Element to Add to the Page</h3>');
    var inside = $('<div id="modalDialogueWide" class="modalAdd" ></div>');
    $(inside).append(header).append(warning);

    var els = Object.keys(models);

    for(var i =0; i < els.length; i++){
        var type = els[i];
        var info = models[type];
        var row = $('<div class="modalRow" ></div>');
        $(modalWrap).append(inside);
        var tinput = "elinput"+i;
        var input = $('<h4>'+type+'</h4>');
        var infoTag = $('<p>'+info+'</p>');
        var inputName = $('<input id='+tinput+'></input>');
        $(inputName).attr("placeholder","Name your element");
        var okay = $('<button data-tname ='+type+' data-tinput ='+tinput+' class="green"> ADD </button>');

        $(okay).click(function() {
            var localName = $("#"+$(this).data("tinput")).val();
            var localType = $(this).data("tname");
            console.log(localType + " " + localName)
            $.get('partials/'+localType+'/'+localType+'.json', function (data) {
                AddJSON(data, localName, localType, page, warning);
            }, 'html');
        });

        var full = $(row).append(input).append(infoTag).append(inputName).append(okay);
        $(inside).append(full);
    }
    $(inside).append(cancel);
    $("body").append(modalWrap);
}
