$(id).css("background-color", styles.navBGColor);
//$(".header").css("height", styles.headerHeight);
$(id+" img").css("margin", styles.imgMargin);
$(id+" img").css("height", styles.logoHeight);

$(id+" .navButton").css("height", styles.logoHeight - 10);
$(id+" .navButton").css("padding-top", (styles.logoHeight/2) + 2 - styles.navButtonFontSize);
$(id+" .navButton").css("width", styles.navButtonWidth);

//header nav buttons styling
$(id+" .navButton").css("background-color", styles.navButtonBGColor);
$(id+" .navButton").css("color", styles.navButtonTextColor);
$(id+" .navButton").css("font-size", styles.navButtonFontSize + "px");

$(id).on({
    mouseenter: function () {
        $(this).css("background-color", styles.navButtonHoverColor);
    },
    mouseleave:function () {
        $(this).css("background-color", styles.navButtonBGColor);
    }
},'.navButton');
//$("html").append("<div id='weird'></div>");
