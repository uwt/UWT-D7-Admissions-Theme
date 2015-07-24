<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>


<div id="search-wrapper">
  <?php print render($page['search']); ?>
</div>

<div id="nav-wrapper">
  <div id="navigation">
    <h2>Menu</h2>
    <?php print render($page['navigation']); ?>
  </div>
</div>

<header class="header" id="header" role="banner">
  <div id="search-toggler" class="fa fa-search fa-2x"></div>
  <?php
  $themepath = path_to_theme('theme', 'uwtadmissions');
  ?>
  <img id="header-block-w" src="/<?php print $themepath . "/images/W_only_CMYK.png" ?>" />
  <img id="header-wordmark" src="/<?php print $themepath . "/images/wordmark_extra_narrow.png" ?> "/>
  <h1><a href="/node/41272">Undergraduate Admissions</a></h1>

  <?php print render($page['header']); ?>

</header>


<div id="nav-toggler">
  <span id="st-container"><span class="icon"></span><span class="text">Open</span> <span>Menu</span></span>
</div>

<?php print render($page['banner']); ?>

<div id="page">




  <div id="main">

    <div id="content" class="column" role="main">
      <?php print render($page['highlighted']); ?>
      <?php print $breadcrumb; ?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php print render($tabs); ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
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

  <?php print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>
