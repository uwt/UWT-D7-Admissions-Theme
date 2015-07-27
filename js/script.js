/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.searchNavMods = {
    attach: function(){
      // Apply the 'you are here' item
      $("#c-menu--slide-left .menu a.active").prepend(
      '<i class="fa fa-hand-o-right" style="font-size:1.25em;"></i> ');

      // Apply the navigation item feedback spinners
      $("#c-menu--slide-left .menu a").bind('click', function(e){
        // Remove all existing feedback spinners
        $("#c-menu--slide-left .menu a i").remove();
        // Create a new feedback spinner
        $(this).append(' <i class="fa fa-spinner fa-spin" style="font-size:2em;"></i>');
      });

    } // End attach property
  };

  // Adding the slider functionality
  // @see http://unslider.com/
  Drupal.behaviors.bannerSlider = {
    attach: function(context, settings) {

      function applyUnSlider(){
        var wiw = window.innerWidth;
        $('#banner')
        .width(wiw)
        .unslider({
          speed : 1500,
          delay : 10000,
          dots : true,
          fluid : true
        });
      }
      //$(window).resize(applyUnSlider);
      applyUnSlider();




    } // end of attach
  }; // end of bannerSlider

})(jQuery, Drupal, this, this.document);
