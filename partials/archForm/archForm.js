$(id).css("background", "linear-gradient(to bottom," + styles.formBGColor + " 0%," +  tinycolor(styles.formBGColor).darken(20).toString() + " 100%)");
$(id+" h2").css("background", "linear-gradient(to bottom," + styles.formHeaderBGColor + " 0%," +tinycolor(styles.formHeaderBGColor).darken(10).toString() + " 100%)");
$(id+" h2").css("color", styles.formHeaderTextColor);

$(id+" .signup").on({
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
    if($(id+" .br-native-form").find("form").length > 0){
        $(".signup button").trigger("mouseenter");
        $(".signup button").trigger("mouseleave");
        stopInterval();
    }
}
