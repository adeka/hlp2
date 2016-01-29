//establish firebase connection
var ref = new Firebase('https://hlpgen2.firebaseio.com/');
//create empty variables
var adding = false;
var context;
var lists = {};
var elements = [];
var models = {
    "archForm" : "A simple MarPro asset gateway, with a pumpkin script",
    "altForm" : "A pardot/salesforce form",
    "footer" : "Social media icons with links, stacked on top of a line of copy",
    "wideFooter" : "Same as the standard footer, just wider and taking up 1 row with the copy on the left",
    "headline" : "A simple row with copy",
    "logo" : "Row with centered logo/image",
    "nav" : "Logo on the left, button links on the right",
    "nav2" : "Nav menu without a logo, basically just buttons in a row",
    "standard" : "This is actually a DIV container, into which you can drag other elements",
    "summary" : "An element that holds copy, and can also contain an image. Editable with tinyMCE",
    "callout" : "Image with copy and a link, all stacked on top of each other",
    "divider" : "a simple colored full width divider to place between rows"
}
var toolkitButtons = {
        "#home" : "#homeWrapper",
        "#text" : "#textWrapper",
        "#links"  :"#linkWrapper" ,
        "#images" : "#imageWrapper",
        "#style" : "#styleWrapper",
        "#layout"  :"#layoutWrapper" ,
        "#code" : "#codeWrapper"
};

//get a snapshot of the client list
ref.on("value", function(snapshot) {
    clients = snapshot.val();
    loadClients(clients);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//handle switching views
$( document ).ready(function() {
    $( "#addClient i" ).click(function() {
        newModal("Give the client a name", addClient);
    });
    Object.keys(toolkitButtons).forEach(hookToolkitButtons);
});

hookToolkitButtons = function(btn){
    $( btn ).click(function() {
        $("#toolboxHeader i").removeClass("active");
        $(this).addClass("active");
        $(".wrapper").css("display", "none");
        $( toolkitButtons[btn] ).css("display", "block");
        //$("#toolbox").scrollTop(getCookie("scroll"));

    });
}
activateToolbox = function(e){
    $(e).removeClass("inactive");
}
