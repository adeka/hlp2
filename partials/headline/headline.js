$(id).css("color", styles.headlineTextColor);
$(id).css("font-size", styles.headlineFontSize+"px");
var c2 = tinycolor(styles.headlineBGColor).toRgb();
c2.a = styles.headlineOpacity;
$(id).css("background", "rgba("+ c2.r + "," + c2.g + ","+ c2.b + "," + c2.a + ")");
