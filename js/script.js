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

function applyNavMods(){

// Make iOS/Touch devices handle the flyout menus

$(".parent-menu > a").each(function(i,e){
  var duplicateRootMenuItem = $("<li></li>").addClass("menu__item c-menu__item");
  var duplicateRootMenuLink = $(this).clone();
  $(duplicateRootMenuItem).prepend($(duplicateRootMenuLink));
  $(this).next(".menu").prepend($(duplicateRootMenuItem));
  });

$(".parent-menu").on("click", "> a", function(e){
  e.preventDefault();

  });

/*
$('.parent-menu > a').each(function() {
  var clicked = false;
  $(this).on('click', function() {
    if(!clicked) return !(clicked = true);
    });
  });
*/



  // Add the active icon class and css
  var activeIcon = $("<i></i> ");
  activeIcon.css({"margin-right":"5px"});
  activeIcon.addClass("fa fa-chevron-right");
  $(".menu .active").prepend(activeIcon);
} // end applyNavMods()
applyNavMods();


} // End attach property

}; // searchNavMods behavior

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
