<?php
/**
 * This is the EXACT SAME FILE as in zen (the base theme) with one exception:
 * I've removed the viewport meta tag.  I did this because I want to add a modified
 * version of the viewport meta tag via template.php
 *
 *
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
  <?php endif; ?>
  <meta http-equiv="cleartype" content="on">

  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <?php if ($add_html5_shim and !$add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
  <?php elseif ($add_html5_shim and $add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
  <?php elseif ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
    <![endif]-->
  <?php endif; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>

<?php if ($skip_link_text && $skip_link_anchor): ?>
    <p id="skip-link">
      <a href="#<?php print $skip_link_anchor; ?>" class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
    </p>
  <?php endif; ?>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
  <div id="c-mask" class="c-mask"></div>

<script>
// Instantiate the slide left menu
var slideLeft = new Menu({
wrapper: '#o-wrapper',
type: 'slide-left',
menuOpenerClass: '.c-button',
maskId: '#c-mask'
});
var slideLeftBtn = document.querySelector('#c-button--slide-left');

slideLeftBtn.addEventListener('click', function(e) {
e.preventDefault;
slideLeft.open();
});

// Instantiate the Push Top "menu" (i.e. the search)

var pushTop = new Menu({
wrapper: '#o-wrapper',
type: 'push-top',
menuOpenerClass: '.c-button',
maskId: '#c-mask'
});
var pushTopBtn = document.querySelector('#c-button--push-top');

pushTopBtn.addEventListener('click', function(e) {
e.preventDefault;
pushTop.open();
});


// Make iOS devices close the menu on page load.
// This "closes" the menu that was open when a user clicks
// the 'back' button on the iOS safari browser.
function closeNav(){
  slideLeft.close();
  }
window.addEventListener("pageshow", closeNav);
</script>

</body>
</html>
