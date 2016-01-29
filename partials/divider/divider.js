var c1 = tinycolor(styles.backgroundColor).toRgb();
c1.a = styles.opacity;
$(id).css("background", "rgba("+ c1.r + "," + c1.g + ","+ c1.b + "," + c1.a + ")");
$(id).css("height", styles.height+"px");
