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
    <script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
    <script src="sortable.min.js"></script>




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
        <div class="wrapper" id="textWrapper"></div>
        <div class="wrapper" id="linkWrapper"></div>

        <?php include "imageUploader.php"; ?>
        <div class="wrapper" id="styleWrapper"></div>
        <div class="wrapper" id="layoutWrapper"></div>
        <div class="wrapper" id="codeWrapper">
            <!--
            <h3> Get Preview Link </h3>
            <div class="row">
                <input id="previewLink"></input>
            </div>
            <h3> Export Landing Page </h3>
            <button id="export">Export .ZIP</button>
            <iframe id="exportFrame"></iframe>
        -->
        </div>
    </div>

    <iframe id="main"></iframe>
    <script src="autosize.min.js"></script>
    <script src="app/main.js"></script>
    <script src="app/helpers.js"></script>
    <script src="app/client.js"></script>
    <script src="app/app.js"></script>
</body>
</html>
