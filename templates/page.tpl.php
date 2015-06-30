<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div id="search-toggler">
  <span class="icon"></span><span class="text">Open</span> <span>Menu &amp; Search</span>
</div>

<div id="search-n-nav">
  <h2>Menu &amp; Search</h2>
  <div id="search">
    <?php print render($page['search']); ?>
  </div>

  <div id="navigation">
    <?php if ($main_menu): ?>
      <nav id="main-menu" role="navigation" tabindex="-1">
        <?php
        // This code snippet is hard to modify. We recommend turning off the
        // "Main menu" on your sub-theme's settings form, deleting this PHP
        // code block, and, instead, using the "Menu block" module.
        // @see https://drupal.org/project/menu_block
        print theme('links__system_main_menu', array(
                    'links' => $main_menu,
                    'attributes' => array(
                        'class' => array('links', 'inline', 'clearfix'),
                    ),
                    'heading' => array(
                        'text' => t('Main menu'),
                        'level' => 'h2',
                        'class' => array('element-invisible'),
                    ),
                ));
        ?>
      </nav>
    <?php endif; ?>

    <?php print render($page['navigation']); ?>

  </div>

</div>

<header class="header" id="header" role="banner">
  <?php
  $themepath = path_to_theme('theme', 'uwtadmissions');
  ?>
  <img id="header-block-w" src="/<?php print $themepath . "/images/W_only_CMYK.png" ?>" />
  <img id="header-wordmark" src="/<?php print $themepath . "/images/wordmark_extra_narrow.png" ?> "/>
  <h1>Undergraduate Admissions</h1>
  <?php print render($page['header']); ?>

  <?php print render($page['banner']); ?>
</header>

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
