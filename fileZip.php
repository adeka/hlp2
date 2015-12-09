<html>
<?php
$client = $_GET["client"];
$page = $_GET["page"];

$logo = $_GET["logo"];
$cta = $_GET["cta"];
$bg = $_GET["bg"];

$template = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html class="no-js"><head> <meta charset="utf-8"> <meta name="description" content=""> <meta name="viewport" content="width=device-width"> <link rel="shortcut icon" href="/favicon.ico"> <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css"> <link rel="stylesheet" href="template_style.css"> <link href="http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" type="text/css"> <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js"></script> <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.1.2/tinycolor.js"></script> <script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script></head><body> <script id="block-expressions-template" type="text/x-handlebars-template"> <title>{{headline}}</title> <div class="header col-lg-12"> <div class="container"> <a href="{{clientURL}}"><img src={{logo}}></img></a> <div class="navWrap"> {{#list nav}} <a href="{{url}}"><div class="navButton">{{title}}</div></a> {{/list}} </div> </div> </div> <div class="headline col-lg-12"> {{headline}} </div> <div class="container"> <div class="row marketing"> <div id="mainSummary" class="col-12 col-lg-7 noPaddingRight"> <div class="assetSummary"> <div class="imgContainer {{ctaAlignment}}"> <img id="ctaImage" src={{cta}}></img> {{#if blurb}} <div class="blurb">{{blurb}}</div> {{/if}} </div> {{#p summary}} <p> {{paragraph}} </p> {{/p}} </div> <div class="footer"> <div> {{#list social}} <a href="{{url}}"><i class="fa fa-{{title}}"></i></a> {{/list}} </div> <aside> Copyright © 2015 {{client}} </aside> </div> </div> <div id="mainForm" class="col-12 col-lg-5"> <div class="signup col-lg-12"> <h2><b>{{callout}}</b></h2> <div data-br-form-id={{formID}} class="br-native-form"></div> </div> </div> </div> </div> </script> <div id="content-placeholder"></div>';
$hook = '<script> var ref = new Firebase("https://hlpgen.firebaseio.com/"); var client = ref.child("'.$client.'"); var page = client.child("'.$page.'"); </script>';
$js = 'page.on("value",function(o){var e=o.val();buildPage(e)},function(o){console.log("The read failed: "+o.code)}),compileHBS=function(o){var e=$("#block-expressions-template").html(),n=Handlebars.compile(e),t=n(o);$("#content-placeholder").html(t)},runPumpkin=function(o,e){!function(n,t){var r=n.createElement("script");r.type="text/javascript",r.async=!0,r.src="//pumpkin."+e+"/pumpkin.js";var s=n.getElementsByTagName("script")[0];s.parentNode.insertBefore(r,s),t.__S||(window._pk=t,t.__S=1.1),t.host="conversion."+e,t.clientId=o}(document,window._pk||[])},runGoogleAnalytics=function(o){!function(o,e,n,t,r,s){o.GoogleAnalyticsObject=t,o[t]||(o[t]=function(){(o[t].q=o[t].q||[]).push(arguments)}),o[t].l=+new Date,r=e.createElement(n),s=e.getElementsByTagName(n)[0],r.src="//www.google-analytics.com/analytics.js",s.parentNode.insertBefore(r,s)}(window,document,"script","ga"),ga("create",o),ga("send","pageview")},applyStyles=function(o){function e(){clearInterval(r)}$("#ctaImage").css("float",o.ctaAlignment),$("#mainSummary").insertBefore("#mainForm"),$("body").css("background-image","url("+o.backgroundImage+")"),$("body").css("background-position",o.backgroundPosition),$(".header").css("background-color",o.navBGColor),$(".header img").css("margin",o.imgMargin),$(".header img").css("height",o.logoHeight),$(".header .navButton").css("height",o.logoHeight-10),$(".header .navButton").css("padding-top",o.logoHeight/2+2-o.navButtonFontSize),$(".header .navButton").css("width",o.navButtonWidth),$(".header .navButton").css("background-color",o.navButtonBGColor),$(".header .navButton").css("color",o.navButtonTextColor),$(".header .navButton").css("font-size",o.navButtonFontSize+"px"),$(".header").on({mouseenter:function(){$(this).css("background-color",o.navButtonHoverColor)},mouseleave:function(){$(this).css("background-color",o.navButtonBGColor)}},".navButton"),$(".signup").css("background","linear-gradient(to bottom,"+o.formBGColor+" 0%,"+tinycolor(o.formBGColor).darken(20).toString()+" 100%)"),$(".signup h2").css("background","linear-gradient(to bottom,"+o.formHeaderBGColor+" 0%,"+tinycolor(o.formHeaderBGColor).darken(10).toString()+" 100%)"),$(".signup h2").css("color",o.formHeaderTextColor),$(".footer").css("color",o.footerTextColor);var n=tinycolor(o.summaryBGColor).toRgb();n.a=o.summaryOpacity,$(".assetSummary").css("background","rgba("+n.r+","+n.g+","+n.b+","+n.a+")");var t=tinycolor(o.headlineBGColor).toRgb();t.a=o.headlineOpacity,$(".headline").css("background","rgba("+t.r+","+t.g+","+t.b+","+t.a+")"),$(".assetSummary").css("color",o.summaryTextColor),$(".assetSummary").css("font-size",o.summaryFontSize+"px"),$(".headline").css("color",o.headlineTextColor),$(".headline").css("font-size",o.headlineFontSize+"px"),$(".assetSummary .imgContainer ").css("width",o.summaryImageSize),$(".signup").on({mouseenter:function(){$(this).css("background-color",o.formButtonHoverColor),$(this).css("color",o.formButtonTextColor)},mouseleave:function(){$(this).css("background-color",o.formButtonBGColor),$(this).css("color",o.formButtonTextColor)}},"button");var r=setInterval(function(){setButtonColor()},1);setButtonColor=function(){$(".signup .br-native-form").find("form").length>0&&($(".signup button").trigger("mouseenter"),$(".signup button").trigger("mouseleave"),e())},$(".footer i").css("background-color",o.footerBackgroundColor),$(".footer i").css("color",o.footerForegroundColor),$(".footer aside").css("font-size",o.footerFontSize+"px"),$(".footer").on({mouseenter:function(){$(this).css("background-color",o.footerForegroundColor),$(this).css("color",o.footerBackgroundColor)},mouseleave:function(){$(this).css("background-color",o.footerBackgroundColor),$(this).css("color",o.footerForegroundColor)}},"i")},buildPage=function(o){Handlebars.registerHelper("list",function(o,e){for(var n="",t=0,r=o.length;r>t;t++)n+=e.fn(o[t]);return n}),Handlebars.registerHelper("p",function(o,e){for(var n="",t=0,r=o.length;r>t;t++)n+=e.fn(o[t]);return n}),compileHBS(o),runPumpkin(o.clientID,o.host),applyStyles(o)};';
$css = '.header,html *{margin:0;padding:0}.header .navButton,.signup button{cursor:pointer;transition:all 150ms cubic-bezier(.42,0,.58,1)}.footer,.footer aside,.header .navButton,.headline,.signup h2{text-align:center}.footer i,.header .navButton,.signup button{transition:all 150ms cubic-bezier(.42,0,.58,1)}body{background-size:1920px 1080px;background-attachment:fixed;color:#000}.header{overflow:hidden;white-space:nowrap}.header img{margin-left:1em;float:left;width:auto;height:50px}.header .navButton{margin:10px 0 0;float:right;font-weight:700}.headline{padding:.3em;font-size:2.5em;box-shadow:0 10px 30px 0 rgba(0,0,0,.15)}.assetSummary img,.signup input{box-shadow:0 0 7px 0 rgba(0,0,0,.25)}.noPaddingRight{padding-right:0!important;padding-left:0!important}.right{float:right;margin-left:1.5em}.left{float:left;margin-right:1.5em;margin-bottom:0}.assetSummary{font-size:1.1em;margin:1em .5em 1em 1em;padding:1.5em;border-radius:.3em;overflow:auto}.assetSummary p{margin-bottom:.5em}.assetSummary img{border-radius:.2em;width:100%;height:auto}.assetSummary .imgContainer{position:relative;width:300px}.assetSummary .blurb{font-weight:700;color:#000;padding:1em;z-index:1000;width:100%;position:absolute;bottom:0;border-top:3px solid #FF9D01;border-bottom:3px solid #FF9D01}.signup{padding:0;margin-top:1.1em;margin-left:0;border-radius:.3em}.signup form{padding:0;margin:0}.signup h2{margin:0;padding:.75em;border-top-left-radius:.3rem;border-top-right-radius:.3rem}.signup .pull-right{float:none!important}.signup button{float:none;font-size:1.5em;margin:0 auto;border:none;border-radius:.2em;padding:.5em .75em}.signup .br-native-form{text-align:center;padding:0 1em 1em;width:95%;margin:auto}.signup p{margin-bottom:1em}.signup label{padding:.25em;bottom:5px;position:relative}.signup input{margin:-.3em;border:none;padding:.25em .25em .25em .75em}.footer{border-radius:.25em}.footer div{padding-left:2.3em;display:inline-block;overflow:auto;margin:0 auto}.footer aside{width:100%;padding-top:.25em}.footer i{margin-right:1em;width:1.75em;height:1.75em;border-radius:50%;font-size:2em;float:left;padding-top:.35em}@media screen and (min-width:600px){.container{max-width:1640px}}';
$footer = '</body></html>';

$content = $template.$hook."<script>".$js."</script>"."<style>".$css."</style>".$footer;

//if true, good; if false, zip creation failed


/* creates a compressed zip file */
function create_zip($files = array(),$destination = '',$overwrite = false) {
	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) { return false; }
	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($files)) {
		//cycle through each file
		foreach($files as $file) {
			//make sure the file exists
			if(file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}
	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();
		if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}
		//add the files
		foreach($valid_files as $file) {
			$zip->addFile($file,$file);
		}
		//debug
		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

		//close the zip -- done!
		$zip->close();

		//check to make sure the file exists
		return file_exists($destination);
	}
	else
	{
		return false;
	}
}

//$name = "temp/".hash("md5", $content).".html";
$name = $page.".html";
file_put_contents($name, $content);

$files_to_zip = array(
	$name,
	$logo,
	$cta,
	$bg
);
$zipName = 'temp/'.$page.'.zip';
create_zip($files_to_zip,$zipName);
unlink($name);

echo "<a href='".$zipName."'>DOWNLOAD</a>";
?>
</html>
