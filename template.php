<!doctype html>
<html class="no-js">
<head>
  <meta HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <link rel="shortcut icon" href="/favicon.ico">
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="template_style.css">
  <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.1.2/tinycolor.js"></script>
  <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
</head>

<body>
  <div id="content-placeholder"></div>
  <?php
      $client = htmlspecialchars($_GET["client"]);
      $page = htmlspecialchars($_GET["page"]);
      echo '<script>';
      echo 'var ref = new Firebase("https://hlpgen2.firebaseio.com/");';
      echo 'var client = ref.child("'.$client.'");';
      echo 'var page = client.child("'.$page.'");';
      echo '</script>';
  ?>
  <script src="template_main.js"></script>
</body>
</html>
