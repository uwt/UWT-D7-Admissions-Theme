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


// Add the active icon class and css
var activeIcon = $("<i></i> ");
activeIcon.css({"margin-right":"5px"});
activeIcon.addClass("fa fa-chevron-right");
$(".menu .active").prepend(activeIcon);
}
applyNavMods();
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
