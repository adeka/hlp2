//establish firebase connection
var ref = new Firebase('https://hlpgen2.firebaseio.com/');
//create empty variables
var context;
var nav = [];
var socmedia = [];
var summaries = [];

var toolkitButtons = {
        "#home" : "#homeWrapper",
        "#text" : "#textWrapper",
        "#links"  :"#linkWrapper" ,
        "#images" : "#imageWrapper",
        "#style" : "#styleWrapper",
        "#layout"  :"#layoutWrapper" ,
        "#code" : "#codeWrapper"
};
var colorPickers = [
    "#navButtonBGColor",
    "#navButtonTextColor",
    "#navButtonHoverColor",
    "#navBGColor",
    "#headlineBGColor",
    "#headlineTextColor",
    "#summaryTextColor",
    "#summaryBGColor",
    "#formHeaderBGColor",
    "#formHeaderTextColor",
    "#formBGColor",
    "#formButtonTextColor",
    "#formButtonBGColor",
    "#formButtonHoverColor",
    "#footerForegroundColor",
    "#footerBackgroundColor",
    "#footerTextColor"
];
var fields = [
    "#headlineOpacity",
    "#summaryOpacity",
    "#logoHeight",
    "#navButtonFontSize",
    "#headlineFontSize",
    "#summaryFontSize",
    "#summaryImageSize",
    "#footerFontSize",
    "#clientID",
    "#formID",
    "#analyticsCode",
    "#client",
    "#clientURL",
    "#host",
    "#callout",
    "#headline",
    "#blurb"
];
var toolbox = [
    "#home",
    "#text",
    "#links",
    "#images",
    "#style",
    "#layout",
    "#code"
];

//get a snapshot of the client list
ref.on("value", function(snapshot) {
    clients = snapshot.val();
    loadClients(clients);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

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
    //var clientLogo = $('<img src="http://tech.brafton.com/hlp/misc/logo.png"></img>');
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
    console.log(getCookie(e));

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
        console.log(isLocked);
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

//loads the application
loadApp = function(clientName, pageName, page){
    var logoPath = context.logo;
    var ctaPath = context.cta;
    var bgPath = context.backgroundImage;

    $("#export").click(function(){
        $("#exportFrame").attr("src", "fileZip.php?client="+clientName+"&page="+pageName+"&logo="+logoPath+"&cta="+ctaPath+"&bg="+bgPath);
    });
    $("body").off("change", ".imageSelect");
    $("body").on({
        change: function () {
            var val = $(this).val();
            var temp = {};
            temp[val] = "misc/"+$(this).data("path");
            page.update(temp);
            console.log("changed" + pageName);
        }
    },'.imageSelect');

    $("#formAlignment").change(function(){
        var val = $(this).is(":checked") ? "right" : "left";
        var temp = {};
        temp["formAlignment"] = val;
        page.update(temp);
    });

    $("#ctaAlignment").change(function(){
        var val = $(this).is(":checked") ? "right" : "left";
        var temp = {};
        temp["ctaAlignment"] = val;
        page.update(temp);
    });

    var url = "template.php?client="+clientName+"&page="+pageName;
    $("#main").attr("src", url);//+"&cta="+ctaPath+"&bg="+bgPath);

    $("#previewLink").val("http://tech.brafton.com/hlp/"+"template.php?client="+clientName+"&page="+pageName);

    //ref.update(getEmptyClient());
    $("#assetSummaryWrapper").empty();
    $("#navLinkWrapper").empty();
    $("#socialMediaWrapper").empty();
    nav = [];
    socmedia = [];
    summaries = [];

    toolbox.forEach(activateToolbox);

    if(context.nav.length > 0){
        for( var i = 0; i < context.nav.length; i++){
            createNavLink(context.nav[i], page);
        }
    }

    if(context.social.length > 0){
        for( var i = 0; i < context.social.length; i++){
            createSocialLink(context.social[i], page);
        }
    }
    for( var i = 0; i < fields.length; i++){
        assignFirebaseHook(fields[i], page);
    }
    for( var i = 0; i < colorPickers.length; i++){
        setColorPickers(colorPickers[i], page);
    }

    for( var i = 0; i < context.summary.length; i++){
        createAssetSummary(context.summary[i], page);
    }
    $( "#addSummary i" ).off();
    $( "#addNavLink i" ).off();
    $( "#addSocialMedia i" ).off();


    //hook up the PLUS icons underneath lists
    $( "#addSummary i" ).click(function() {
        createAssetSummary({paragraph : ""});
        var updatedList = {"summary" : summaries};
        page.update(updatedList);
        resize();
        reload();
    });
    $( "#addNavLink i" ).click(function() {
        createNavLink({url : "", title : "Button"});
        var updatedList = {"nav" : nav};
        page.update(updatedList);
        reload();
    });
    $( "#addSocialMedia i" ).click(function() {
        createSocialLink({url : "", title : "facebook"});
        var updatedList = {"social" : socmedia};
        page.update(updatedList);
        reload();
    });
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

activateToolbox = function(e){
    $(e).removeClass("inactive");
}

//takes an element from the styling view, gets firebase context value, and hooks into on-change event
setColorPickers = function(el, page){
    $(el).off();
    var attr = el.substring(1);
    $(el).spectrum({
        showButtons: false,
        preferredFormat: "hex"
        //showAlpha: true
    });
    $(el).show();
    $(el).spectrum("set", context[attr]);
    $(el).change(function() {
        $(el).spectrum("set", $(el).val());
        var temp = {};
        temp[attr] = $(this).val();
        page.update(temp);
        reload();
    });
}
//retrieves firebase context value of the related element and sets it on creation
//detect on-change event, connect to firebase by using the element's ID, pass the new value
assignFirebaseHook = function(el, page){
    $(el).off();
    var attr = el.substring(1);
    $(el).val(context[attr]);
    $(el).change(function() {
        var temp = {};
        temp[attr] = $(this).val();
        page.update(temp);
        reload();
    });
}

//creates drop downs to add social media icons
createSocialLink = function(e, page){
    var index = socmedia.length;
    socmedia.push(e);
    var url = e.url;
    var title = e.title;
    var row = $('<div></div>');
    var deleteI = $('<i class="fa fa-remove linkMargin"></i>');
    var deleteBtn = $('<div class="deleteIcon"></div>');
    $(deleteBtn).append(deleteI);
    $( deleteI ).click(function() {
        socmedia.splice(index, 1);
        if(socmedia.length >= 1){
            var updatedList = {"social" : socmedia};
        }
        else{
            var updatedList = {"social" : ""};
        }
        page.update(updatedList);
    });

    var socialMediaRow = $('<div class="spacer"></div>');
    var select = $('<select> ' +
    '  <option value="facebook">Facebook</option> ' +
    '  <option value="google">Google+</option> ' +
    '  <option value="twitter">Twitter</option> ' +
    ' <option value="linkedin">LinkedIn</option> ' +
    ' <option value="pinterest">Pinterest</option> ' +
    '  </select> ');
    $(select).change(function() {
        socmedia[index].title = $(this).val();
        var updatedList = {"social" : socmedia};
        page.update(updatedList);
        reload();
    });
    $(select).val(title);
    var selectWrap = $(' <div class="col3"> ' +
    '  <p>Icon </p> ' +
    ' </div> ');
    $(selectWrap).append(select);

    var linkWrap = $(' <div class="col4"> ' +
    '  <p>Link </p> ' +
    ' </div> ');
    var link = $('<input id="linkInput"></input> ');
    $(link).change(function() {
        socmedia[index].url = $(this).val();
        var updatedList = {"social" : socmedia};
        page.update(updatedList);
        reload();
    });
    $(link).val(url);
    $(linkWrap).append(link);
    $(socialMediaRow).append(selectWrap).append(linkWrap);
    $(row).append(deleteBtn).append(socialMediaRow);
    $("#socialMediaWrapper").append(row);
}
//creates inputs to add nav links
createNavLink = function(e, page){
    var index = nav.length;
    nav.push(e);
    var url = e.url;
    var title = e.title;
    var row = $('<div></div>');
    var deleteI = $('<i class="fa fa-remove linkMargin"></i>');
    var deleteBtn = $('<div class="deleteIcon"></div>');
    $(deleteBtn).append(deleteI);
    $( deleteI ).click(function() {
        nav.splice(index, 1);
        if(nav.length >= 1){
            var updatedList = {"nav" : nav};
        }
        else{
            var updatedList = {"nav" : ""};
        }
        page.update(updatedList);
    });

    var socialMediaRow = $('<div class="spacer"></div>');
    var name = $('<input id=""></input> ');
    $(name).val(title);
    var selectWrap = $(' <div class="col3"> ' +
    '  <p>Button Name </p> ' +
    ' </div> ');
    $(selectWrap).append(name);
    $(name).change(function() {
        nav[index].title = $(this).val();
        var updatedList = {"nav" : nav};
        page.update(updatedList);
        reload();
    });

    var linkWrap = $(' <div class="col4"> ' +
    '  <p>Link </p> ' +
    ' </div> ');
    var link = $('<input id=""></input> ');
    $(link).change(function() {
        nav[index].url = $(this).val();
        var updatedList = {"nav" : nav};
        page.update(updatedList);
        reload();
    });
    $(link).val(url);
    $(linkWrap).append(link);
    $(socialMediaRow).append(selectWrap).append(linkWrap);
    $(row).append(deleteBtn).append(socialMediaRow);
    $("#navLinkWrapper").append(row);
}
//creates paragraph textareas for describing the asset
createAssetSummary = function(e, page){
    var index = summaries.length;
    summaries.push(e);
    var paragraph = e.paragraph;
    var row = $('<div></div>');
    var deleteI = $('<i class="fa fa-remove summaryMargin"></i>');
    var deleteBtn = $('<div class="deleteIcon"></div>');
    $(deleteBtn).append(deleteI);
    $( deleteI ).click(function() {
        summaries.splice(index, 1);
        if(summaries.length >= 1){
            var updatedList = {"summary" : summaries};
        }
        else{
            var updatedList = {"summary" : ""};
        }
        page.update(updatedList);

    });
    var spacer = $('<div class="spacer"></div>');
    var text = $('<textarea></textarea>');
    $(text).change(function() {
        summaries[index].paragraph = $(this).val();
        var updatedList = {"summary" : summaries};
        page.update(updatedList);
        reload();
    });
    $(text).val(paragraph);

    $(spacer).append(text);
    $(row).append(deleteBtn).append(spacer);
    $("#assetSummaryWrapper").append(row);

}
//reload the main iframe
reload = function(){
    resize();
    //autosize($("textarea"));
    //$( '#main' ).attr( 'src', function ( i, val ) { return val; });
}

resize = function(){
    setTimeout(function(){
        autosize($("textarea"));
    }, 1);
}

//handle switching views
$( document ).ready(function() {

    $("#text").click(function(){
        resize();
    });
    $( "#addClient i" ).click(function() {
        //$(".wrap").css("display", "flex");
        newModal("Give the client a name", addClient);
    });
    Object.keys(toolkitButtons).forEach(hookToolkitButtons);
});

hookToolkitButtons = function(btn){
    $( btn ).click(function() {
        $("#toolboxHeader i").removeClass("active");
        $(this).addClass("active");
        $(".wrapper").css("display", "none");
        $( toolkitButtons[btn] ).css("display", "block");
    });
}

getEmptyPage = function(name){
    return {
            "analyticsCode" : "UA-XXXXX-X",
            "callout" : "GET IT NOW!",
            "client" : "Castleford",
            "clientID" : "348",
            "clientURL" : "castleford.com.au",
            "formID" : "24",
            "headline" : name,
            "host" : "castleford.com.au",
            "footerBackgroundColor" : "#000000",
            "footerFontSize" : "16",
            "footerForegroundColor" : "#ffffff",
            "footerTextColor" : "#ffffff",
            "formBGColor" : "#ffffff",
            "formButtonBGColor" : "#000000",
            "formButtonHoverColor" : "#2c2c2c",
            "formButtonTextColor" : "#ffffff",
            "formHeaderBGColor" : "#000000",
            "formHeaderTextColor" : "#ffffff",
            "cta" : "misc/survey.jpg",
            "ctaAlignment" : "left",
            "backgroundImage" : "misc/beach.jpg",
            "backgroundPosition" : "middle",
            "headlineBGColor" : "#ffffff",
            "headlineFontSize" : "34",
            "headlineOpacity" : "0.6",
            "headlineTextColor" : "#000000",
            "imagePad" : "0",
            "imgMargin" : ".5em",
            "logo" : "misc/logo-light.png",
            "logoHeight" : "50",
            "nav" : [ {
                "title" : "About",
                "url" : ""
            } ],
            "navBGColor" : "#000000",
            "navButtonBGColor" : "#000000",
            "navButtonFontSize" : "16",
            "navButtonHoverColor" : "#444444",
            "navButtonPad" : "1.7em",
            "navButtonTextColor" : "#ffffff",
            "navButtonWidth" : "130px",
            "social" : [ {
                "title" : "facebook",
                "url" : ""
            } ],
            "summary" : [ {
                "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            }, {
                "paragraph" : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }, {
                "paragraph" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium eaque ipsa quae ab illo inventore quasi architecto beatae vitae dicta sunt explicabo. "
            }, {
                "paragraph" : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            } ],
            "summaryBGColor" : "#ffffff",
            "summaryFontSize" : "15",
            "summaryImageSize" : "270",
            "summaryOpacity" : "0.6",
            "summaryTextColor" : "#000000",
            "textColor" : "#DDD"
        }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
