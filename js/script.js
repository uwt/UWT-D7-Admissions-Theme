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

  // Move the search form into the navigation for easier styling
  Drupal.behaviors.searchFormMods = {
    attach: function(context, settings) {
    
      var searchForm = $("#block-search-form");
      searchForm.appendTo($(".block-menu-block .menu-block-wrapper"));
    } // end of attach
  };

  // We want to make sure that no matter how short a users screen is, in desktop mode, they
  // can see that there is content "below the fold"
  Drupal.behaviors.foldWorks = {
    attach: function(context, settings) {
      // Get some of the original CSS values so we can use them later
      var bwSizeOrig =  $("#main").css("background-size");
      var bwSizeHeightOrigArr = bwSizeOrig.split(" ");
      var bwSizeHeightOrig =bwSizeHeightOrigArr[0];

      var bwPosOrig = $("#main").css("background-position");
      var contentMarginTopOrig = $("#content").css('margin-top');
     
      // 1. Adjust the top-margin on the #content element. This will move the "fold" vertically
      // 2. Resize the block W to an appropriate size.
      // 3. Reposition the block W. It cannot touch the top nav, and it has to touch
      function foldWork(){
        var wh = $(window).height(); // Window Height
        var cmt = parseInt($("#content").css("margin-top")); // #content margin top (more margin, more background pic shows)
        var bw = {};
        bw['backgroundColor'] = $("#main").css("background-image");
        bw['backgroundSize'] = $("#main").css("background-size");
        bw['backgroundPosition'] = $("#main").css("background-position");


        var bwSizeArr = bw.backgroundSize.split(" ");
        var bwSizeWidth = parseInt(bwSizeArr[0]);
        var bwSizeHeight = parseInt(bwSizeArr[1]);


        if(wh >= 300 && wh <= 600){// Medium-tall screens, dynamically assign the margin top

          // 300 is the default margin-top set in the CSS
          var nmt = wh - 300;

          $("#content").css({
            'margin-top':nmt,
            'border-top':"20px solid #4B2E84"
          });

          // Block W background position and scale
         
          if(bwSizeHeight >= nmt){
            var ar = (bwSizeWidth / bwSizeHeight);
            bwSizeHeight = (nmt - 20);
            bwSizeWidth = (bwSizeHeight * ar);
            bwSizeCss = bwSizeWidth + 'px ' + bwSizeHeight + 'px';
            $("#main").css({
              'background-size': bwSizeCss
            });
          }

          var newBgPos = 'top ' + (nmt + 50 - bwSizeHeight) + 'px right 10px';

          $("#main").css({
            'background-position': newBgPos
          });

        // end medium-tall screens
        }else if(wh >= 600){  // Tall screens, use default margin top
          $("#content").css({
            'margin-top':contentMarginTopOrig,
            'border-top':"20px solid #4B2E84"
          });
          $("#main").css({
            'background-position' : bwPosOrig,
            'background-size': bwSizeOrig
          });
         
        }else{// Short screens, use no margin top
          $("#content").css({
            'margin-top':0,
            'border-top':0
          });
        }
      } // end of foldWork

      foldWork();
      $(window).resize(foldWork);
      
    } // end of attach
  }; // end of formWorks

  // Adding the slider functionality
  // @see http://unslider.com/
  Drupal.behaviors.bannerSlider = {
    attach: function(context, settings) {

      $('#banner').unslider({
        speed : 2500,
        delay : 10000,
        dots : false,
        flud : true
      });
    } // end of attach
  }; // end of bannerSlider

})(jQuery, Drupal, this, this.document);
