<?php

/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

/**
 * Updating jquery
 */
function uwtadmissions_js_alter(&$javascript){
  $new_jq = drupal_get_path('theme', 'uwtadmissions') . '/js/jquery-1.11.3.min.js';
  $javascript['misc/jquery.js']['data'] = $new_jq;

  $jquery_browser_plugin = drupal_get_path('theme', 'uwtadmissions') . '/js/jquery.browser.min.js';
  drupal_add_js($jquery_browser_plugin);

}

/**
 * Modifying the markup of menus to work with theme scripting
 */
function uwtadmissions_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  // Create classes on the anchor tag
  $options['attributes'] = array();
  $options['attributes']['class'] = array('c-menu__link');

  $active = FALSE;
  if(array_search('is-active', $element['#attributes']['class']) !== FALSE){
    $active = TRUE;
  }
  
  $element['#attributes']['class'][] = 'c-menu__item';

  // Adding a class to parent menu items
  if($sub_menu){
    $element['#attributes']['class'][] = "parent-menu";
  }
  // Adding a class to the active link
  $active_class = "";
  if($active){
    $active_class = ' is-active';
  }
  //dpm($element);
  // Adjusting the href of the link
  $link_prefix = "";
  if(strpos($element['#href'], "node/") === 0){
    $link_prefix = base_path();
  }

  // $output is the anchor tag

  $output = '<a href="' . $link_prefix . $element['#href'].'" class="c-menu__link' . $active_class . '">'.$element['#title'].'<i>|</i></a>';

  $ret = '<li' . drupal_attributes($element['#attributes']) . '>';
  $ret .= $output . $sub_menu;
  $ret .= "</li>\n";
  return $ret;
}

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_maintenance_page(&$variables, $hook) {
// When a variable is manipulated or added in preprocess_html or
// preprocess_page, that same work is probably needed for the maintenance page
// as well, so we can just re-use those functions to do that work here.



uwtadmissions_preprocess_html($variables, $hook);
uwtadmissions_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
function uwtadmissions_preprocess_html(&$variables, $hook) {

  // Adding UW Assets
  $data = array();
  drupal_add_css('//uw.edu/assets/uw.css', 'external');
  //drupal_add_css(drupal_get_path('theme', 'uwtadmissions') . '/css/uw.css', 'file');
  drupal_add_js(drupal_get_path('theme', 'uwtadmissions') . '/js/unslider.min.js', 'file');

  // Adding meta tag
  $meta_viewport = array(
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => array(
        'name' => 'viewport',
        'content' => 'width=device-width,initial-scale=1',
        ),
      );
  drupal_add_html_head($meta_viewport, 'meta_viewport');
}

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_page(&$variables, $hook) {

   $variables['bobo'] = "Bobo wuz here, yo.";
   }
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_node(&$variables, $hook) {
   $variables['sample_variable'] = t('Lorem ipsum.');

// Optionally, run node-type-specific preprocess functions, like
// uwtadmissions_preprocess_node_page() or uwtadmissions_preprocess_node_story().
$function = __FUNCTION__ . '_' . $variables['node']->type;
if (function_exists($function)) {
$function($variables, $hook);
}
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_comment(&$variables, $hook) {
   $variables['sample_variable'] = t('Lorem ipsum.');
   }
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_region(&$variables, $hook) {
// Don't use Zen's region--sidebar.tpl.php template for sidebars.
//if (strpos($variables['region'], 'sidebar_') === 0) {
//  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
//}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
   function uwtadmissions_preprocess_block(&$variables, $hook) {
// Add a count to all the blocks in the region.
// $variables['classes_array'][] = 'count-' . $variables['block_id'];

// By default, Zen will use the block--no-wrapper.tpl.php for the main
// content. This optional bit of code undoes that:
//if ($variables['block_html_id'] == 'block-system-main') {
//  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
//}
}
// */
