$( document ).ready(function(){

});
page.on("value", function(snapshot) {

    //console.log(snapshot.val());
    var context = snapshot.val();
    buildPage(context);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



//Google Analytics: change UA-XXXXX-X to be your site's ID.
runGoogleAnalytics = function(code){
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create',code);ga('send','pageview');
    }

    //compile function
    compileHBS = function(context){
        var theTemplateScript = $("#block-expressions-template").html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        var theCompiledHtml = theTemplate(context);
        $('#content-placeholder').html(theCompiledHtml);
    }
    //compile
buildPage = function(context){
    Handlebars.registerHelper('list', function(c, options) {
        var ret = "";
        for(var i=0, j=c.length; i<j; i++) {
            ret = ret + options.fn(c[i]);
        }
        return ret;
    });
    Handlebars.registerHelper('p', function(context, options) {
        var ret = "";
        for(var i=0, j=context.length; i<j; i++) {
            ret = ret + options.fn(context[i]);
        }
        return ret;
    });

    var els = context.elementList;
    iterate(els , context, "body", 1);
    parseMain($.extend({}, context.elements["main"].data, context.elements["main"].styles));
}

parseMain = function(context){
    if(context.showBackground){
        $("body").css("background-image", "url("+context.backgroundImage+")");
    }
    else {
        $("body").css("background-color", context.backgroundColor);
    }
    $("body").css("background-position", context.backgroundPosition);
}

iterate = function(list, context, parent, width){
    var partial = list.shift();
    var type = partial.type;
    var hook = partial.hook;
    var hooks = partial.hooks;
    var styles = context.elements[hook].styles;
    var obj = context.elements[hook].data;
    var id = "#"+obj.id;

    var w = 12 / width;


    if(!hooks){
        $.get('partials/'+type+'/'+type+'.hbs', function (data) {
            var template=Handlebars.compile(data);
            $(parent).append(template(obj));

            $.get('partials/'+type+'/'+type+'.js', function( data ) {
                eval(data);
                $(id).addClass("col-lg-"+w);


            }, 'html');

            if(type == "archForm"){
                runPumpkin(obj.clientID, obj.host);
            }
            if(list.length > 0){
                    iterate(list, context, parent, width);
            }
        }, 'html');
    }
    if(hooks){
        $.get('partials/'+type+'/'+type+'.hbs', function (data) {
            var template=Handlebars.compile(data);
            $(parent).append(template(obj));

            $.get('partials/'+type+'/'+type+'.js', function( data ) {
                eval(data);
                if(type == "standard"){
                    //$(id).removeClass("container");
                    $(id).parent().removeClass("col-lg-12");
                    $(id).parent().addClass("insideContainer col-lg-"+w);
                    $(id).addClass("col-lg-12");
                }
                else{
                    $(id).addClass("col-lg-"+w);
                }

            }, 'html');

            if(list.length > 0){
                iterate(list, context, parent, width);
            }
            if(!obj.horizontal){
                iterate(hooks, context, id, 1);
            }
            else{
                iterate(hooks, context, id, hooks.length);
            }
        }, 'html');
    }
}

setTimeout(function(){
    $("html").fadeIn(1100);
}, 500);

//marpro function
runPumpkin = function(clientID, host){
    (function(w,pk){
        var s=w.createElement('script');
        s.type='text/javascript';
        s.async=true;
        s.src='//pumpkin.' + host + '/pumpkin.js';
        var f=w.getElementsByTagName('script')[0];
        f.parentNode.insertBefore(s,f);
        if(!pk.__S){
            window._pk=pk;pk.__S = 1.1;
        }
        pk.host='conversion.' + host;
        pk.clientId=clientID;
    })(document,window._pk||[])
}
