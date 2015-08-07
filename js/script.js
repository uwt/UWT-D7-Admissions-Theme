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


$(".parent-menu > a").each(function(i,e){
  // Duplicate the root menu item and add it as the first menu item.
  var duplicateRootMenuItem = $("<li></li>").addClass("menu__item c-menu__item");
  var duplicateRootMenuLink = $(this).clone();
  $(duplicateRootMenuItem).prepend($(duplicateRootMenuLink));
  $(this).next(".menu").prepend($(duplicateRootMenuItem));
  // Add a open/close (+/-) indicator to menu items with submenus
  var indicator = $("<span></span>")
  .addClass("fa fa-plus")
  .css({"margin-right":"5px"});
  $(this).prepend(indicator);
  });

// Make iOS/Touch devices handle the flyout menus
$(".parent-menu").on("click", "> a", function(e){
    e.preventDefault();
    $(this).toggleClass("submenu-opened");
    $(this).next(".menu").toggleClass("showme");
    $(this).children("span.fa").toggleClass("fa-plus");
    $(this).children("span.fa").toggleClass("fa-minus");
    //$("#c-menu--slide-left").addClass("hovered");
    });

// Temporarily increase the height of the nav element.
// At full height, the flyout menu shows, but it disables
// any links or controls it covers up.
// At miminum height, the flyout menus don't show up.
// Ugh.
$("#c-menu--slide-left .menu-block-wrapper > .menu > li").mouseleave(function(){
  //console.log("mouseleave root li...hopefully");
  $("#c-menu--slide-left").removeClass("hovered");
  });

$(".parent-menu > a").hover(
    function(){
      // mouseenter
      //console.log("mouseenter");
      $("#c-menu--slide-left").addClass("hovered");
    },
    function(){
      // mouseleave
      //console.log("mouseleave on .parent-menu > a");
      //$("#c-menu--slide-left").removeClass("hovered");
    }
    );
// Close the nav menu when when it is clicked on
$("#c-menu--slide-left").on('mouseleave', '.parent-menu .menu',  function(){
  //console.log("bobo mouse leavey", $(this));
  $("#c-menu--slide-left").removeClass("hovered");
  });



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
