
var c1 = tinycolor(styles.formBGColor).toRgb();
c1.a = styles.formOpacity;
$(id).find(".altSignup").css("background", "rgba("+ c1.r + "," + c1.g + ","+ c1.b + "," + c1.a + ")");


$(id+" h2").css("color", styles.formHeaderTextColor);

$(id+" .altSignup").on({
    mouseenter: function () {
        $(this).css("background-color", styles.formButtonHoverColor);
        $(this).css("color", styles.formButtonTextColor);

    },
    mouseleave:function () {
        $(this).css("background-color", styles.formButtonBGColor);
        $(this).css("color", styles.formButtonTextColor);
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
    if($(id+" .altForm").find("form").length > 0){
        $(".altSignup button").trigger("mouseenter");
        $(".altSignup button").trigger("mouseleave");
        stopInterval();
    }
}
