<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div id="o-wrapper" class="o-wrapper">

<header class="header" id="header" role="banner">
<?php
// Set the path for accessing images
$themepath = path_to_theme('theme', 'uwtadmissions');
// Set the path for the home links
$homelink = url('<front>');
?>
<!-- narrow (-n) screen header elements -->
<!-- yes, we can use "dub" https://en.wikipedia.org/wiki/W#Name -->
<a href="<?php print $homelink; ?>">
<img id="header-block-dub-n" src="/<?php print $themepath . "/images/W_only_CMYK.png" ?>" />
<img id="header-wordmark-n" src="/<?php print $themepath . "/images/wordmark_extra_narrow.png" ?> "/>
<!-- wider (-w) screen header elements -->
<img id="header-wordmark-w" src="/<?php print $themepath . "/images/uwt_wordmark_front_white.png" ?> "/>
</a>

<!-- Search Opener -->
<div id="search-opener" class="c-buttons">
<button id="c-button--push-top" class="c-button"><i class="fa fa-search"></i> Search</button>
</div> <!-- c-buttons -->
<!-- End Search Opener -->

<h1><a href="/node/41272">Undergraduate Admissions</a></h1>

<?php print render($page['header']); ?>

</header>


<!-- Menu Opener -->
<div id="nav-opener" class="c-buttons">
<button id="c-button--slide-left" class="c-button"><i class="fa fa-navicon"></i> Menu</button>

<?php print render($title_prefix); ?>
<?php if ($title): ?>
<h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
<?php endif; ?>
<?php print render($title_suffix); ?>

</div> <!-- c-buttons -->
<!-- End Menu Opener -->

<?php print render($page['banner']); ?>

<div id="page">
<div id="main">
<div id="content" class="column" role="main">
<h1 class="page__title title" id="page-title-page"><?php print $title; ?></h1>
<?php //print render($page['highlighted']); ?>
<?php print $breadcrumb; ?>
<a id="main-content"></a>
<?php print $messages; ?>
<?php print render($tabs); ?>
<?php print render($page['help']); ?>
<?php if ($action_links): ?>
<ul class="action-links"><?php print render($action_links); ?></ul>
<?php endif; ?>
<?php print render($page['content']); ?>
<?php //print $feed_icons; ?>
</div>



<?php
// Render the sidebars to see if there's anything in them.
$sidebar_first = render($page['sidebar_first']);
$sidebar_second = render($page['sidebar_second']);
?>

<?php if ($sidebar_first || $sidebar_second): ?>
<aside class="sidebars">
<?php print $sidebar_first; ?>
<?php print $sidebar_second; ?>
</aside>
<?php endif; ?>

</div>

<?php //print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>

</div> <!-- o-wrapper -->

<nav id="c-menu--slide-left" class="c-menu c-menu--slide-left">
<button class="c-menu__close">&larr; Close Menu</button>
<?php print render($page['navigation']); ?>
</nav> <!-- c-menu-slide-left -->

<nav id="c-menu--push-top" class="c-menu c-menu--push-top">
<button class="c-menu__close">&uarr; Close Search</button>
<?php print render($page['search']); ?>
</nav>
