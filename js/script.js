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

  // Modify the navigation menu styles.
  // Essentially, when the window gets too narrow for normal navigation, apply a
  // class to the navigation that will turn it mobiley.

  Drupal.behaviors.searchNavMods = {
    attach: function(){
      function applyNavMods(){

        //console.log("New applyNavMods");
        // Get the current widths and heights of things
        var wiw = window.innerWidth;
        // Get the height of the window (viewport)
        var wih = window.innerHeight;
        var height = document.body.clientHeight;
        //console.log("document height", height);
        //console.log("wih", wih);

        var stHeight = $("#search-toggler").outerHeight();
        // Dynamically set the height of the banner/slider
        // Get the top position of the banner
        var bannerTop = $("#banner ul li").offset().top;
        // Set an arbitrary number of pixels to show below the banner
        var showBelow = wih * 0.075;
        //console.log("bannerTop", bannerTop);
        $("html .region-banner #banner-container #banner ul li").css({
          "height": wih - bannerTop - showBelow
        });

        
        // Add the uw button styles to the nav links
        $("#navigation .menu li a").addClass("uw-btn btn-sm");

        // Create a div that we can click on that closes the nav menu
        if($("#body-closer").length == 0){
          $("<div></div>",{
            id: "body-closer"
          })
          .css({
            //"height": height
            })
          .click(function(){
            //console.log("body closer clickey");
            // Hide the search-n-nav
            $("#search-toggler").trigger("click");
          })
          .appendTo($("body"));
        }
        // Remove the click handler before recreating it.
        $("#search-toggler").unbind("click");

        // Make the search toggler functionality happen on click
        $("#search-toggler").click(function(){
          //console.log("search-toggler clicky!!");
          // Change verbiage and icon...
          //console.log("text is", $("#search-toggler span").text());
          if($("#search-toggler .text").text() == 'Open'){ // search-n-nav is hidden
            $("#search-toggler .text").text("Close");
            $("#search-toggler").addClass("search-opened");

            // Show the body closer
            $("#body-closer").addClass("shown");

          }else{ // search-n-nav is displayed
            $("#search-toggler .text").text("Open");
            $("#search-toggler").removeClass("search-opened");

            // Hide the body closer
            $("#body-closer").removeClass("shown");
          }
          // Toggle show-search
          $("#search-n-nav").toggleClass("show-search");

        }); // End #search-toggler click handler
      }
      // Apply the navigation modifies on load and window resize
      $(window).resize(applyNavMods);
      applyNavMods();

    }
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
      $(window).resize(applyUnSlider);
      applyUnSlider();




    } // end of attach
  }; // end of bannerSlider


  jQuery.fn.isChildOverflowing = function (child) {
    var p = jQuery(this).get(0);
    var el = jQuery(child).get(0);
    return  (el.offsetTop < p.offsetTop || el.offsetLeft < p.offsetLeft) ||
    (el.offsetTop + el.offsetHeight > p.offsetTop + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
  };



})(jQuery, Drupal, this, this.document);
