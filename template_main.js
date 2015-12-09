page.on("value", function(snapshot) {
    //console.log(snapshot.val());
    var context = snapshot.val();
    buildPage(context);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//compile function
compileHBS = function(context){
    var theTemplateScript = $("#block-expressions-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theCompiledHtml = theTemplate(context);
    $('#content-placeholder').html(theCompiledHtml);
}
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
//Google Analytics: change UA-XXXXX-X to be your site's ID.
runGoogleAnalytics = function(code){
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create',code);ga('send','pageview');
    }

    applyStyles = function(context){

        $("#ctaImage").css("float", context.ctaAlignment);
        $("#mainSummary").insertBefore("#mainForm");

        //  $(".assetSummary .blurb").css("background-color", context.accentColor);

        $("body").css("background-image", "url("+context.backgroundImage+")");
        $("body").css("background-position", context.backgroundPosition);

        //styles

        $(".header").css("background-color", context.navBGColor);
        //$(".header").css("height", context.headerHeight);
        $(".header img").css("margin", context.imgMargin);
        $(".header img").css("height", context.logoHeight);

        $(".header .navButton").css("height", context.logoHeight - 10);
        $(".header .navButton").css("padding-top", (context.logoHeight/2) + 2 - context.navButtonFontSize);
        $(".header .navButton").css("width", context.navButtonWidth);

        //header nav buttons styling
        $(".header .navButton").css("background-color", context.navButtonBGColor);
        $(".header .navButton").css("color", context.navButtonTextColor);
        $(".header .navButton").css("font-size", context.navButtonFontSize + "px");

        $(".header").on({
            mouseenter: function () {
                $(this).css("background-color", context.navButtonHoverColor);
            },
            mouseleave:function () {
                $(this).css("background-color", context.navButtonBGColor);
            }
        },'.navButton');

        $(".signup").css("background", "linear-gradient(to bottom," + context.formBGColor + " 0%," +  tinycolor(context.formBGColor).darken(20).toString() + " 100%)");
        $(".signup h2").css("background", "linear-gradient(to bottom," + context.formHeaderBGColor + " 0%," +tinycolor(context.formHeaderBGColor).darken(10).toString() + " 100%)");
        $(".signup h2").css("color", context.formHeaderTextColor);

        $(".footer").css("color", context.footerTextColor);

        var c1 = tinycolor(context.summaryBGColor).toRgb();
        c1.a = context.summaryOpacity;
        $(".assetSummary").css("background", "rgba("+ c1.r + "," + c1.g + ","+ c1.b + "," + c1.a + ")");

        var c2 = tinycolor(context.headlineBGColor).toRgb();
        c2.a = context.headlineOpacity;
        $(".headline").css("background", "rgba("+ c2.r + "," + c2.g + ","+ c2.b + "," + c2.a + ")");


        $(".assetSummary").css("color", context.summaryTextColor);//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");
        $(".assetSummary").css("font-size", context.summaryFontSize+"px");//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");
        $(".headline").css("color", context.headlineTextColor);
        $(".headline").css("font-size", context.headlineFontSize+"px");

        $(".assetSummary .imgContainer ").css("width", context.summaryImageSize);//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");

        $(".signup").on({
            mouseenter: function () {
                $(this).css("background-color", context.formButtonHoverColor);
                $(this).css("color", context.formButtonTextColor);

            },
            mouseleave:function () {
                $(this).css("background-color", context.formButtonBGColor);
                $(this).css("color", context.formButtonTextColor);
            }
        },'button');

        //worst code ive ever written
        //angular can suck it
        function stopColor() {clearInterval(myVar);}
        var myVar = setInterval(function(){ setButtonColor() }, 1);
        function stopInterval() {
            clearInterval(myVar);
        }
        setButtonColor = function(){
            if($(".signup .br-native-form").find("form").length > 0){
                $(".signup button").trigger("mouseenter");
                $(".signup button").trigger("mouseleave");
                stopInterval();
            }
        }

        //footer styles
        $(".footer i").css("background-color", context.footerBackgroundColor);
        $(".footer i").css("color", context.footerForegroundColor);
        $(".footer aside").css("font-size", context.footerFontSize + "px");

        $(".footer").on({
            mouseenter: function () {
                $(this).css("background-color", context.footerForegroundColor);
                $(this).css("color", context.footerBackgroundColor);
            },
            mouseleave:function () {
                $(this).css("background-color", context.footerBackgroundColor);
                $(this).css("color", context.footerForegroundColor);
            }
        },'i');
    }

    //compile
    buildPage = function(context){
        Handlebars.registerHelper('list', function(context, options) {
            var ret = "";
            for(var i=0, j=context.length; i<j; i++) {
                ret = ret + options.fn(context[i]);
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

        compileHBS(context);

        runPumpkin(context.clientID, context.host);
        //runGoogleAnalytics(context.analyticsCode);
        applyStyles(context);
    }
