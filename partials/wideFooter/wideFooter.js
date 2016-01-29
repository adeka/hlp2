//footer styles
$(id+" i").css("background-color", styles.footerBackgroundColor);
$(id+" i").css("color", styles.footerForegroundColor);
$(id+" aside").css("font-size", styles.footerFontSize + "px");
$(id).css("color", styles.footerTextColor);

$(id).on({
    mouseenter: function () {
        $(this).css("background-color", styles.footerForegroundColor);
        $(this).css("color", styles.footerBackgroundColor);
    },
    mouseleave:function () {
        $(this).css("background-color", styles.footerBackgroundColor);
        $(this).css("color", styles.footerForegroundColor);
    }
},'i');

//$("html").append("<div id='weird'></div>");
