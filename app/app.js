$( "#toolbox" ).scroll(function() {
    var scroll = $(this).scrollTop();
    console.log(scroll);
    setCookie("scroll", scroll, 999);
});

//loads the application
loadApp = function(clientName, pageName, page){


    var logoPath = context.logo;
    var ctaPath = context.cta;
    var bgPath = context.backgroundImage;

    $(".imageSelect").empty();
    $(".imageSelect").append('<option value="none"> </option>');


    $("#export").click(function(){
        $("#exportFrame").attr("src", "fileZip.php?client="+clientName+"&page="+pageName+"&logo="+logoPath+"&cta="+ctaPath+"&bg="+bgPath);
    });

    $("body").off("change", ".imageSelect");
    $("body").on({
        change: function () {
            var node = $(this).find(':selected').data('node');
            var val = $(this).val();
            var temp = { "elements" : context.elements};
            temp.elements[node].data[val] = "misc/"+$(this).data("path");
            page.update(temp);
        }
    },'.imageSelect');

    var url = "template.php?client="+clientName+"&page="+pageName;
    $("#main").attr("src", url);//+"&cta="+ctaPath+"&bg="+bgPath);

    $("#previewLink").val("template.php?client="+clientName+"&page="+pageName);

    //ref.update(getEmptyClient());
    $("#assetSummaryWrapper").empty();
    $("#linkWrapper").empty();
    $("#textWrapper").empty();
    $("#styleWrapper").empty();
    $("#layoutWrapper").empty();
    lists = {};
    elements = [];

    Object.keys(toolkitButtons).forEach(activateToolbox);

    assignHook("main", page);
    parseElementList(context.elementList, page);
    assignElementHooks(context.elementList, page, "#layoutWrapper", -1);

    var plus = $('<div class="add" id=""><i class="fa fa-plus"></i></div><br>');
    $("#layoutWrapper").append(plus);
    $( plus ).click(function() {
        AddElementModal(page);
    });
}

AddJSON = function(data, name, type, page, warning){
    if(name != "" && name && !context.elements[name]){
        var finalData = jQuery.parseJSON(data);
        finalData.data.id = name.hashCode();
        var list = context.elementList;
        var input = {
          "hook" : name,
          "type" : type
        };
        list.push(input);
        var temp = { "elements" : context.elements, "elementList" : list};
        temp.elements[name] = finalData;
        page.update(temp);
        $(modalWrap).remove();
    }
    else{
        $(warning).text("Name must be unique");
    }
}

parseElementList = function(list, page){
    if(list.length > 0){
        for( var j = 0; j < list.length; j++){
            if(list[j].hooks){
                assignHook(list[j].hook, page);
                parseElementList(list[j].hooks, page);
            }
            else{
                assignHook(list[j].hook, page);
            }
        }
    }
}

moveHook = function(hook, page){
    var temp = { "elementList" : context.elementList, "elements" : context.elements};
    CheckElements(temp.elementList,hook);
    return temp;
}

assignElementHooks = function(list, page, parent, hook){
    var bottomPad = "";
    var left = "";
    if(hook > -1) left = "padLeft";

    var wrap = $("<ul id="+hook+" class='els "+bottomPad+" " + left + "'></ul>");
    $(parent).append(wrap);

    var sort = Sortable.create($(wrap)[0], {
      group: { name: "common", put: ["common", true],  pull: ["common", true]  },
      animation: 400, // ms, animation speed moving items when sorting, `0` — without animation
      handle: ".handleIcon", // Restricts sort start click/touch to the specified element
      draggable: ".element", // Specifies which items inside the element should be sortable

     onAdd: function (/**Event*/evt, ui) {
          adding = true;
          var item;
          var itemEl = evt.item;  // dragged HTMLElement

          var oldIndex = evt.oldIndex;
          var newIndex = evt.newIndex;

          var idTo = evt.to.id;  // previous list
          var idFrom = evt.from.id;  // previous list

          var temp = { "elementList" : context.elementList, "elements" : context.elements};

          if(idTo > -1){
              if(idFrom > -1){
                  item = temp.elementList[idFrom].hooks[oldIndex];
                  hook = temp.elementList[idFrom].hooks[oldIndex].hook;
              }
              else {
                  item = temp.elementList[oldIndex];
                  hook = temp.elementList[oldIndex].hook;
              }
              /*
              else{
                  ui.sortable("cancel");
              }
              */
             //add empty array to container
             if(temp.elementList[idTo].hooks){
                 es = temp.elementList[idTo].hooks;
             }
             else{
                 es = [];
             }

             es.push(item);
             es.move(es.length-1, newIndex);
             temp.elementList[idTo].hooks = es;

             if(idFrom > -1){
                 for(var i = 0; i < temp.elementList[idFrom].hooks.length; i++) {
                     if (temp.elementList[idFrom].hooks[i].hook == hook) {
                         temp.elementList[idFrom].hooks.splice(i, 1);
                         break;
                     }
                 }
             }
             else{
                 for(var i = 0; i < temp.elementList.length; i++) {
                     if (temp.elementList[i].hook == hook) {
                         temp.elementList.splice(i, 1);
                         break;
                     }
                 }
             }


          }

          if(idTo == -1){
             item = temp.elementList[idFrom].hooks[oldIndex];
             hook = temp.elementList[idFrom].hooks[oldIndex].hook;

             for(var i = 0; i < temp.elementList[idFrom].hooks.length; i++) {
                 if (temp.elementList[idFrom].hooks[i].hook == hook) {
                     temp.elementList[idFrom].hooks.splice(i, 1);
                     break;
                 }
             }

             es = temp.elementList;
             es.push(item);
             es.move(es.length-1, newIndex);
             temp.elementList = es;
          }
          page.update(temp);

      },

      // dragging ended
      onEnd: function (evt) {
          if(!adding){
              evt.oldIndex;  // element's old index within parent
              evt.newIndex;  // element's new index within parent

              if(hook == -1){
                  elements.move(evt.oldIndex, evt.newIndex);
              }
              else{
                  elements[hook].hooks.move(evt.oldIndex, evt.newIndex);
              }

              var temp = { "elementList" : context.elementList};
              temp.elementList = elements;
              page.update(temp);
          }
          adding = false;
      }

    });
    if(list){
        for( var j = 0; j < list.length; j++){
            root = assignElement(list[j], wrap, hook, page, j, list);
            if(list[j].hooks || list[j].type == "standard"){
                assignElementHooks(list[j].hooks, page, root, j);
            }
            /*
            else if(list[j].type == "standard"){
                assignElementHooks([], page, root, j);
            }
            */
        }
    }


    $("#toolbox").scrollTop(getCookie("scroll"));
}

assignElement = function(e, wrap, hook, page, index, parent){
    if(hook == -1){
        elements.push(e);
    }

    var state = context.elements[e.hook].data.horizontal;
    var clientRow = $('<li class="element"></li>');
    var clientLogo = $('<h2>' + e.hook + '</h2>');

    var handleI = $('<i class="fa fa-arrows"></i>');
    var handle = $('<div class="handleIcon elementHandle"></div>');
    $(handle).append(handleI);

    var deleteI = $('<i class="fa fa-remove"></i>');
    var deleteBtn = $('<div class="deleteIcon right"></div>');

    $(deleteBtn).click(function() {
        deleteHook(e.hook, page);
    });

    $(deleteBtn).append(deleteI);

    $(clientRow).append(handle).append(clientLogo);

    /*
    if(!e.hooks && context.elements[e.hook].data["width"]){
        createWidthInput(e.hook, page, clientRow);
    }
    */

    $(clientRow).append(deleteBtn);
    if(e.type == "standard"){
        state ? arrow = "arrows-h" : arrow = "arrows-v";
        var columnsI = $('<i class="fa fa-' + arrow + ' grey"></i>');
        var columnsButton = $('<div class="deleteIcon right"></div>');

        $(columnsButton).click(function() {
            var temp = {"elements" : context.elements};
            temp.elements[e.hook].data.horizontal = !state;

            page.update(temp);
        });


        $(columnsButton).append(columnsI);

        $(clientRow).append(columnsButton);
    }
    $(wrap).append(clientRow);
    return clientRow;
}


deleteHook = function(hook, page){
    var temp = { "elementList" : context.elementList, "elements" : context.elements};
    CheckElements(temp.elementList,hook);
    delete temp.elements[hook];
    page.update(temp);
}

CheckElements = function(els, hook){
    for(var i = 0; i < els.length; i++) {
        if (els[i].hook == hook) {
            els.splice(i, 1);
            break;
        }
        else if(els[i].hooks){
            CheckElements(els[i].hooks, hook);
        }
    }
}

createWidthInput = function(hook, page, parent){
    var val = context.elements[hook].data.width;
    var row = $('<div class="widthSlider"></div>');
    var input = $('<input type ="range" min ="1" max="12" step ="1"/>');
    $(input).val(val);
    $(row).append(input);
    $(parent).append(row);
    $(input).off();

    $(input).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[hook].data;
        link["width"] = val;
        page.update(temp);
    });
}

assignHook = function(hook, page){
    var links = context.elements[hook].dataInputs.links;
    var images = context.elements[hook].dataInputs.images;
    var copy = context.elements[hook].dataInputs.copy;
    var styles = context.elements[hook].styleInputs;

    if(styles) assignStyles(context.elements[hook], hook, page);
    if(links) assignLinks(links, hook, page);
    if(images) assignImages(images, hook, page);
    if(copy) assignCopy(copy, hook, page);
}
assignImages = function(images, hook, page){
    for( var i = 0; i < images.length; i++){
        var option = $('<option value='+images[i].hook+'>'+hook + ": " +images[i].hook+'</option>');
        $(option).data("node", hook);
        $(".imageSelect").append(option);
    }
}

assignStyles = function(item, hook, page){
    var styleInputs = item.styleInputs;
    var nameRow = $('<h3>'+hook+'</h3>');
    $("#styleWrapper").append(nameRow);

    for( var i = 0; i < styleInputs.length; i++){
        if(styleInputs[i].type == "color"){
            createColorPicker(styleInputs[i], hook, page);
        }
        else if(styleInputs[i].type == "number"){
            createNumberInput(styleInputs[i], hook, page);
        }
        else if(styleInputs[i].type == "slider"){
            createSliderInput(styleInputs[i], hook, page );
        }
        else if(styleInputs[i].type == "switch"){
            createSwitch(styleInputs[i], hook, page);
        }
    }
}



createTextInput= function(hook, itemHook, page, c){
    c == null ? c = "row" : c = c;
    var val = context.elements[itemHook].data[hook];
    var row = $('<div class='+c+'></div>');

    var label = $('<p></p>');
    $(label).text(hook);
    var text = $('<input></input>');
    $(text).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements };
        var link = temp.elements[itemHook].data;
        link[hook] = val;
        page.update(temp);
    });
    $(text).val(val);
    $(row).append(label).append(text);
    $("#textWrapper").append(row);
}

assignCopy = function(copy, hook, page){
    var nameRow = $('<h3>'+hook+'</h3>');
    $("#textWrapper").append(nameRow);

    for( var i = 0; i < copy.length; i++){
        if(copy[i].type == "text"){
            createTextInput(copy[i].hook, hook, page,  copy[i].class);
        }
        else if(copy[i].type == "textarea"){
            var editor = context.elements[hook].data.id+"";
            var save = createTextArea(copy[i].hook, hook, page, editor);
            $(nameRow).append(save);
        }
    }
}

//creates paragraph textareas for describing the asset
createTextArea = function(hook, itemHook, page, editor){
    var e;
    var row = $('<div class="niceWrap"></div>');
    var val = context.elements[itemHook].data[hook];
    var text = $('<textarea></textarea>');
    $(text).addClass(editor);

    $(text).val(val);
    $(row).append(text);
    $("#textWrapper").append(row);

    tinymce.init({
        mode : "textareas",
        //theme : "advanced",
        editor_selector : editor,
        init_instance_callback : function(editor) {
            e =  editor.id;
        },

        plugins: "autoresize textcolor link",
        autoresize_bottom_margin: 0,

        toolbar: [
          'undo redo | styleselect | bold italic | alignleft aligncenter alignright | forecolor backcolor link'
        ]

    });

    var save = $("<button class='save'>SAVE</button>");
    $(save).click(function() {
        var val = tinyMCE.get(e).getContent({format : 'raw'});
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].data;
        link[hook] = val;
        //tinyMCE.EditorManager.get(editor).destroy();
        page.update(temp);
    });
    return save;
}

createSliderInput = function(e, itemHook, page){
    var val = context.elements[itemHook].styles[e.hook];
    var row = $('<div class="colHalf"></div>');
    var input = $('<input type ="range" min ="0.0" max="1.0" step ="0.1"/>');
    $(input).val(val);
    $(row).append($('<p>'+e.label+'</p>'));
    $(row).append(input);
    $("#styleWrapper").append(row);
    $(input).off();

    $(input).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].styles;
        link[e.hook] = val;
        page.update(temp);
    });
}



createSwitch = function(styleInput, itemHook, page){
    var row = $('<div class="colHalf"></div>');
    var label = $('<p>'+styleInput.label+'</p>');
    var switchWrapper = $('<div class="onoffswitch"></div>');
    $(row).append(label).append(switchWrapper);

    var checkbox = $('<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="'+itemHook+'cb" checked>');
    $(checkbox).prop('checked',  context.elements[itemHook].styles[styleInput.hook]);
    var label = $('<label class="onoffswitch-label" for="'+itemHook+'cb"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>');
    $(switchWrapper).append(checkbox).append(label);

    $("#styleWrapper").append(row);

    $(checkbox).change(function() {
        var val = $(this).is(':checked');
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].styles;
        link[styleInput.hook] = val;
        page.update(temp);
        console.log(val);
    });
}

createColorPicker = function(styleInput, itemHook, page){
    var val = context.elements[itemHook].styles[styleInput.hook];
    var row = $('<div class="colColor"></div>');
    var label = $('<p>'+styleInput.label+'</p>');
    var input = $("<input type='text'/>");
    $(row).append(label).append(input);
    $("#styleWrapper").append(row);

    $(input).off();
    $(input).spectrum({
        showButtons: false,
        preferredFormat: "hex"
        //showAlpha: true
    });
    $(input).show();
    $(input).spectrum("set", val);
    $(input).change(function() {
        var val = $(this).val();
        $(input).spectrum("set", val);
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].styles;
        link[styleInput.hook] = val;
        page.update(temp);
    });
}

createNumberInput = function(styleInput, itemHook, page){
    var val = context.elements[itemHook].styles[styleInput.hook];
    var row = $('<div class="colHalf"></div>');
    var label = $('<p>'+styleInput.label+'</p>');
    var input = $("<input type='number'/>");
    $(input).val(val);
    $(row).append(label).append(input);
    $("#styleWrapper").append(row);
    $(input).off();

    $(input).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].styles;
        link[styleInput.hook] = val;
        page.update(temp);
    });
}

assignLinks = function(links, hook, page){
    var wrap = $('<ul class="listPad"></ul>');
    var plus = $('<div class="add" id=""><i class="fa fa-plus"></i></div><br>');
    var nameRow = $('<h3>'+hook+'</h3>');
    $("#linkWrapper").append(nameRow).append(wrap).append(plus);

    var linkHook = context.elements[hook].dataInputs.linkHook;
    lists[hook] = [];

    $(plus).click(function() {
        var temp = { "elements" : context.elements};
        var link = temp.elements[hook].dataInputs.links;
        var data = temp.elements[hook].data[temp.elements[hook].dataInputs.linkHook];
        var type = temp.elements[hook].dataInputs.linkType;
        var i = link.length;
        var input, obj;
        if(type == "button"){
            input = {
                "hook" : i,
                "type" : "button"
            };
            obj =  {
                "title" : "",
                "url" : ""
            };
        }
        if(type == "icon"){
            input = {
                "hook" : i,
                "type" : "icon"
            };
            obj =  {
                "title" : "facebook",
                "url" : ""
            };
        }

        link[i] = input;
        data[i] = obj;
        page.update(temp);
    });

    for( var i = 0; i < links.length; i++){
        if(links[i].type == "button"){
            createNavLink(links[i], hook, page, links[i].hook, wrap);
        }

        else if(links[i].type == "icon"){
            createSocialLink(links[i], hook, page, links[i].hook, wrap);
        }

    }

    var sort = Sortable.create($(wrap)[0], {
      animation: 400, // ms, animation speed moving items when sorting, `0` — without animation
      handle: ".handleIcon", // Restricts sort start click/touch to the specified element
      draggable: ".sortable", // Specifies which items inside the element should be sortable
      onUpdate: function (evt/**Event*/){
         var item = evt.item; // the current dragged HTMLElement
     },
      // dragging ended
      onEnd: function (/**Event*/evt) {
          evt.oldIndex;  // element's old index within parent
          evt.newIndex;  // element's new index within parent
          lists[hook].move(evt.oldIndex, evt.newIndex);
          console.log(lists);
          var temp = { "elements" : context.elements};
          var link = temp.elements[hook].data;
          link[linkHook] = lists[hook];
          page.update(temp);
      }
    });
}

//creates inputs to add nav links
createNavLink = function(e, itemHook, page, hook, wrap){
    var linkHook = context.elements[itemHook].dataInputs.linkHook;
    var link = context.elements[itemHook].data[linkHook][hook];
    lists[itemHook].push(link);

    var url = link.url;
    var title = link.title;
    var row = $('<li class="sortable"></li>');
    var deleteI = $('<i class="fa fa-remove linkMargin"></i>');
    var deleteBtn = $('<div class="deleteIcon"></div>');
    $(deleteBtn).append(deleteI);

    var handleI = $('<i class="fa fa-arrows"></i>');
    var handle = $('<div class="handleIcon handleIconMod"></div>');
    $(handle).append(handleI);

    $( deleteI ).click(function() {
        var temp = { "elements" : context.elements};
        var data = temp.elements[itemHook].data[linkHook];
        var inputs = temp.elements[itemHook].dataInputs.links;
        data.splice(e.hook, 1);
        inputs.splice(inputs.length - 1, 1);
        page.update(temp);
    });


    var socialMediaRow = $('<div class="spacer"></div>');
    var name = $('<input id=""></input> ');
    $(name).val(title);
    var selectWrap = $(' <div class="col3"> ' +
    '  <p>Button Name </p> ' +
    ' </div> ');
    $(selectWrap).append(name);
    $(name).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].data[linkHook][hook];
        link.title = val;
        page.update(temp);
    });

    var linkWrap = $(' <div class="col4"> ' +
    '  <p>Link </p> ' +
    ' </div> ');
    var link = $('<input id=""></input> ');
    $(link).change(function() {

        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].data[linkHook][hook];
        link.url = val;
        page.update(temp);

    });
    $(link).val(url);
    $(linkWrap).append(link);
    $(socialMediaRow).append(selectWrap).append(linkWrap).append(handle);
    $(row).append(deleteBtn).append(socialMediaRow);
    $(wrap).append(row);
}
//creates drop downs to add social media icons
createSocialLink = function(e, itemHook, page, hook, wrap){
    var linkHook = context.elements[itemHook].dataInputs.linkHook;
    var link = context.elements[itemHook].data[linkHook][hook];
    lists[itemHook].push(link);

    var url = link.url;
    var title = link.title;
    var row = $('<li class="sortable"></li>');
    var deleteI = $('<i class="fa fa-remove linkMargin"></i>');
    var deleteBtn = $('<div class="deleteIcon"></div>');
    $(deleteBtn).append(deleteI);

    $( deleteI ).click(function() {
        var temp = { "elements" : context.elements};
        var data = temp.elements[itemHook].data[linkHook];
        var inputs = temp.elements[itemHook].dataInputs.links;
        data.splice(e.hook, 1);
        inputs.splice(inputs.length - 1, 1);
        page.update(temp);
    });


    var handleI = $('<i class="fa fa-arrows"></i>');
    var handle = $('<div class="handleIcon handleIconMod"></div>');
    $(handle).append(handleI);

    var socialMediaRow = $('<div class="spacer"></div>');
    var select = $('<select> ' +
    '  <option value="facebook">Facebook</option> ' +
    '  <option value="google">Google+</option> ' +
    '  <option value="twitter">Twitter</option> ' +
    ' <option value="linkedin">LinkedIn</option> ' +
    ' <option value="pinterest">Pinterest</option> ' +
    '  </select> ');
    $(select).change(function() {
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].data[linkHook][hook];
        link.title = val;
        page.update(temp);

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
        var val = $(this).val();
        var temp = { "elements" : context.elements};
        var link = temp.elements[itemHook].data[linkHook][hook];
        link.url = val;
        page.update(temp);
    });
    $(link).val(url);
    $(linkWrap).append(link);
    $(socialMediaRow).append(selectWrap).append(linkWrap).append(handle);
    $(row).append(deleteBtn).append(socialMediaRow);
    $(wrap).append(row);
}
