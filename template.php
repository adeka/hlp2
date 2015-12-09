<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <link rel="shortcut icon" href="/favicon.ico">
  <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="template_style.css">
  <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.1.2/tinycolor.js"></script>
  <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
</head>

<body>
  <script id="block-expressions-template" type="text/x-handlebars-template">
    <title>{{headline}}</title>
    <div class="header col-lg-12">
      <div class="container">
        <a href="{{clientURL}}"><img src={{logo}}></img></a>
        <div class="navWrap">
          {{#list nav}}
          <a href="{{url}}"><div class='navButton'>{{title}}</div></a>
          {{/list}}
        </div>
      </div>
    </div>
    <div class="headline col-lg-12">
      {{headline}}
    </div>
    <div class="container">
      <div class="row marketing">
        <div id="mainSummary" class="col-12 col-lg-7 noPaddingRight">
          <div class="assetSummary">
            <div class="imgContainer {{ctaAlignment}}">
              <img id="ctaImage" src={{cta}}></img>
              {{#if blurb}}
              <div class="blurb">{{blurb}}</div>
              {{/if}}
            </div>
            {{#p summary}}
            <p> {{paragraph}} </p>
            {{/p}}
          </div>
          <div class="footer">
            <div>
              {{#list social}}
              <a href="{{url}}"><i class="fa fa-{{title}}"></i></a>
              {{/list}}
            </div>
            <aside>
              Copyright © 2015 {{client}}
            </aside>
          </div>
        </div>
        <div id="mainForm" class="col-12 col-lg-5">
          <div class="signup col-lg-12">
            <h2><b>{{callout}}</b></h2>
            <div data-br-form-id={{formID}} class="br-native-form"></div>
          </div>
        </div>
      </div>
    </div>
  </script>
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
