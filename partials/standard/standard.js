if(styles.showBackground){
    $(id).parent().css("background-image", "url("+obj.bg+")");
    $(id).parent().css("background-position", "center");
}
else{
    var c1 = tinycolor(styles.backgroundColor).toRgb();
    c1.a = styles.opacity;
    $(id).parent().css("background", "rgba("+ c1.r + "," + c1.g + ","+ c1.b + "," + c1.a + ")");
}
//  $(".assetSummary .blurb").css("background-color", context.accentColor);
