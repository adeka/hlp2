$(id).css("background-color", styles.navBGColor);
//$(".header").css("height", styles.headerHeight);
$(id+" img").css("margin", styles.imgMargin);
$(id+" img").css("height", styles.logoHeight);


//header nav buttons styling
$(id+" .navButton2").css("background-color", styles.navButtonBGColor);
$(id+" .navButton2").css("color", styles.navButtonTextColor);
$(id+" .navButton2").css("font-size", styles.navButtonFontSize + "px");

$(id).on({
    mouseenter: function () {
        $(this).css("background-color", styles.navButtonHoverColor);
    },
    mouseleave:function () {
        $(this).css("background-color", styles.navButtonBGColor);
    }
},'.navButton2');
//$("html").append("<div id='weird'></div>");
