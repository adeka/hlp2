$(id).css("color", styles.summaryTextColor);//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");
$(id).css("font-size", styles.summaryFontSize+"px");//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");
$(id+" .imgContainer ").css("width", styles.summaryImageSize);//"rgba("+ white.r + "," + white.g + ","+ white.b + "," + white.a + ")");
var c1 = tinycolor(styles.summaryBGColor).toRgb();
c1.a = styles.summaryOpacity;
$(id).css("background", "rgba("+ c1.r + "," + c1.g + ","+ c1.b + "," + c1.a + ")");
if(styles.ctaAlignment && styles.ctaAlignment.toString() == "true"){
    $(id +" .imgContainer").addClass("right");
}
else if(styles.ctaAlignment == false){
    $(id +" .imgContainer").addClass("left");
}
