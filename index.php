<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="/favicon.ico">
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.4.0/animate.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.7.1/spectrum.css">





    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.1.2/tinycolor.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.7.1/spectrum.min.js"></script>
    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/umd/tooltip.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js"></script>
    <script src="js/vendor/jquery.ui.widget.js"></script>
    <script src="//blueimp.github.io/JavaScript-Templates/js/tmpl.min.js"></script>
    <script src="//blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
    <script src="//blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
    <script src="js/jquery.iframe-transport.js"></script>
    <script src="js/jquery.fileupload.js"></script>
    <script src="js/jquery.fileupload-process.js"></script>
    <script src="js/jquery.fileupload-image.js"></script>
    <script src="js/jquery.fileupload-audio.js"></script>
    <script src="js/jquery.fileupload-video.js"></script>
    <script src="js/jquery.fileupload-validate.js"></script>
    <script src="js/jquery.fileupload-ui.js"></script>
    <script src="js/main.js"></script>
    <!-- The XDomainRequest Transport is included for cross-domain file deletion for IE 8 and IE 9 -->
    <!--[if (gte IE 8)&(lt IE 10)]>
    <script src="js/cors/jquery.xdr-transport.js"></script>
    <![endif]-->
</head>

<body>
    <div id="toolboxHeader">
        <i id="home" class="fa fa-home active"></i>
        <i id="text" class="fa fa-edit inactive"></i>
        <i id="links" class="fa fa-star-o inactive"></i>
        <i id="images" class="fa fa-file-image-o inactive"></i>
        <i id="style" class="fa fa-paint-brush inactive"></i>
        <i id="layout" class="fa fa-object-group inactive"></i>
        <i id="code" class="fa fa-file-zip-o inactive"></i>
    </div>
    <div id="toolbox">
        <div class="wrapper" id="homeWrapper">
            <div class="row">
                <input id="searchInput" placeholder="Search"></input>
            </div>
            <div class="add" id="addClient">
                <i class="fa fa-plus"></i>
                <p>Add New Client</p>
            </div>
            <div id="clientWrap"></div>
        </div>
        <div class="wrapper" id="textWrapper">
            <h3> Client Information </h3>
            <div class="col">
                <p>Client ID </p>
                <input id="clientID"></input>
            </div>
            <div class="col">
                <p>Form ID </p>
                <input id="formID"></input>
            </div>
            <div class="col2">
                <p>Google Analytics Code</p>
                <input id="analyticsCode"></input>
            </div>
            <div class="row">
                <p>Client Name </p>
                <input id="client"></input>
            </div>
            <div class="row">
                <p>Client URL </p>
                <input id="clientURL"></input>
            </div>
            <div class="row nobar">
                <p>MarPro / CNAME Host URL </p>
                <input id="host"></input>
            </div>

            <h3> Titles and Content </h3>
            <div class="row">
                <p>Form Callout </p>
                <input id="callout"></input>
            </div>
            <div class="row">
                <p>Asset Title </p>
                <input id="headline"></input>
            </div>
            <div class="row">
                <p>Asset Summary</p>
                <div id="assetSummaryWrapper"></div>
                <div class="add" id="addSummary"><i class="fa fa-plus"></i></div><br>
            </div>

            <div class="row">
                <p>CTA Blurb</p>
                <textarea id="blurb"></textarea>
            </div>
        </div>


        <div class="wrapper" id="linkWrapper">
            <h3> Social Media Icons </h3>
                <div id="socialMediaWrapper">
                </div>
            <div class="add" id="addSocialMedia"><i class="fa fa-plus"></i></div><br>
            <h3> Nav Menu Buttons </h3>
                <div id="navLinkWrapper">
                </div>
            <div class="add" id="addNavLink"><i class="fa fa-plus"></i></div><br>
        </div>
        <?php include "imageUploader.php"; ?>
        <div class="wrapper" id="styleWrapper">

            <h3> <i class="fa fa-navicon"></i> Nav Menu Style</h3>
            <div class="colColor">
                <p>Button Background Color </p>
                <input type='text' value='white' id='navButtonBGColor' />
            </div>
            <div class="colColor">
                <p>Button Text Color </p>
                <input type='text' value='white' id='navButtonTextColor' />
            </div>
            <div class="colColor">
                <p>Button Hover Color </p>
                <input type='text' value='white' id='navButtonHoverColor' />
            </div>
            <div class="colColor">
                <p>Nav Background Color </p>
                <input type='text' value='white' id='navBGColor' />
            </div>
            <div class="colHalf nobar">
                <p>Logo Height </p>
                <input type='number' value='' id='logoHeight' />
            </div>
            <div class="colHalf nobar">
                <p>Button Font Size </p>
                <input type='number' value='' id='navButtonFontSize' />
            </div>


            <h3> <i class="fa fa-header"></i> Headline Style</h3>
            <div class="colColor">
                <p>Text Color </p>
                <input type='text' value='white' id='headlineTextColor' />
            </div>
            <div class="colColor">
                <p>Background Color </p>
                <input type='text' value='white' id='headlineBGColor' />
            </div>
            <div class="colHalf nobar">
                <p>Font Size </p>
                <input type='number' value='' id='headlineFontSize' />
            </div>
            <div class="colHalf nobar">
                <p>Opacity </p>
                <input id="headlineOpacity" type ="range" min ="0.0" max="1.0" step ="0.1"/>
            </div>

            <h3 class="push"> <i class="fa fa-align-left"></i> Asset Summary Style</h3>
            <div class="colColor">
                <p>Text Color </p>
                <input type='text' value='white' id='summaryTextColor' />
            </div>
            <div class="colColor">
                <p>Background Color </p>
                <input type='text' value='white' id='summaryBGColor' />
            </div>
            <div class="colHalf nobar">
                <p>Font Size </p>
                <input type='number' value='' id='summaryFontSize' />
            </div>
            <div class="colHalf nobar">
                <p>Opacity </p>
                <input id="summaryOpacity" type ="range" min ="0.0" max="1.0" step ="0.1"/>
            </div>
            <div class="row">
                <p>Image Size </p>
                <input id="summaryImageSize" type ="range" min ="100" max="500" step ="10"/>
            </div>

            <h3> <i class="fa fa-list-alt"></i> Form Style</h3>
            <div class="colColor">
                <p>Header Background Color </p>
                <input type='text' value='white' id='formHeaderBGColor' />
            </div>
            <div class="colColor">
                <p>Header Text Color </p>
                <input type='text' value='white' id='formHeaderTextColor' />
            </div>

            <div class="colColor">
                <p>Form Background Color </p>
                <input type='text' value='white' id='formBGColor' />
            </div>
            <div class="colColor">
                <p>Button Text Color </p>
                <input type='text' value='white' id='formButtonTextColor' />
            </div>

            <div class="colColor">
                <p>Button Background Color </p>
                <input type='text' value='white' id='formButtonBGColor' />
            </div>
            <div class="colColor">
                <p>Button Hover Color </p>
                <input type='text' value='white' id='formButtonHoverColor' />
            </div>


            <h3> <i class="fa fa-thumb-tack"></i> Footer Style</h3>
            <div class="colColor">
                <p>Icon Foreground Color </p>
                <input type='text' value='white' id='footerForegroundColor' />
            </div>
            <div class="colColor">
                <p>Icon Background Color </p>
                <input type='text' value='white' id='footerBackgroundColor' />
            </div>
            <div class="colColor">
                <p>Text Color </p>
                <input type='text' value='white' id='footerTextColor' />
            </div>
            <div class="colHalf">
                <p>Font Size </p>
                <input type='number' value='' id='footerFontSize' />
            </div>

        </div>
        <div class="wrapper" id="layoutWrapper">
            <h3> Form Alignment </h3>
            <div class="row">
                <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="formAlignment" checked>
                    <label class="onoffswitch-label" for="formAlignment">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </div>
            <h3> CTA Alignment </h3>
            <div class="row">
                <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="ctaAlignment" checked>
                    <label class="onoffswitch-label" for="ctaAlignment">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="wrapper" id="codeWrapper">
            <h3> Get Preview Link </h3>
            <div class="row">
                <input id="previewLink"></input>
            </div>
            <h3> Export Landing Page </h3>
            <button id="export">Export .ZIP</button>
            <iframe id="exportFrame"></iframe>
        </div>
    </div>

    <iframe id="main"></iframe>
    <script src="autosize.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
