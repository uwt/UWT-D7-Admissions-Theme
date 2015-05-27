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



      // 1. Adjust the top-margin on the #content element. This will move the "fold" vertically
      // 2. Resize the block W to an appropriate size.
      // 3. Reposition the block W. It cannot touch the top nav, and it has to touch
      function foldWork(){

        //console.log("window width", $(window).width())


        // Get some of the original CSS values so we can use them later
        var bwSizeOrig =  $("#main").css("background-size");
        var bwSizeHeightOrigArr = bwSizeOrig.split(" ");
        var bwSizeHeightOrig =bwSizeHeightOrigArr[0];
        var bwPosOrig = $("#main").css("background-position");

        var scSizeHeightOrig = $(".adm-slide-content").outerHeight();
        var scSizeWidthOrig = $(".adm-slide-content"). outerWidth();
        var scSizeTopOrig = $(".adm-slide-content").offset().top;

        var contentMarginTopOrig = $("#content").css('margin-top');

        console.log($(".adm-slide-content"));
        var scHeight = $(".adm-slide-content").height();

        var navHeight = $("#navigation").outerHeight();
        var headerHeight = $("#header").outerHeight();

        if( $(window).width() >= 975){

          var wh = $(window).height(); // Window Height
          var cmt = parseInt($("#content").css("margin-top")); // #content margin top (more margin, more background pic shows)
          var bw = {};
          bw['backgroundColor'] = $("#main").css("background-image");
          bw['backgroundSize'] = $("#main").css("background-size");
          bw['backgroundPosition'] = $("#main").css("background-position");


          var bwSizeArr = bw.backgroundSize.split(" ");
          var bwSizeWidth = parseInt(bwSizeArr[0]);
          var bwSizeHeight = parseInt(bwSizeArr[1]);

          var newSCTop = (headerHeight + navHeight + 10);

          if(wh >= 300 && wh <= 600){// Medium-tall screens, dynamically assign the margin top
            console.log("Medium Screen portion BEGIN");
            // 300 is the default margin-top set in the CSS
            var nmt = wh - 300;
            //console.log("#content MARGIN-TOP, BORDER-TOP being set");
            $("#content").css({
              // 'margin-top':nmt,
              // 'border-top':"20px solid #4B2E84"
              });

            // Block W background position and scale
            if(bwSizeHeight >= nmt){
              var ar = (bwSizeWidth / bwSizeHeight);
              bwSizeHeight = (nmt - 20);
              bwSizeWidth = (bwSizeHeight * ar);
              bwSizeCss = bwSizeWidth + 'px ' + bwSizeHeight + 'px';
              //console.log("#main BACKGROUND-SIZE being set");
              $("#main").css({
                //  'background-size': bwSizeCss
                });
            }
            console.log("#main BACKGROUND-POSITION being set");
            var newBgPos = 'top ' + (nmt + navHeight - bwSizeHeight) + 'px right 10px';
            console.log("newBgPos", newBgPos);
            
            $("#main").css({
              //   'background-position': newBgPos
              });

            var scSizeHeight = $(".adm-slide-content").outerHeight();
            //console.log("scSizeHeight", scSizeHeight);
            //console.log("headerHeight", headerHeight);
            //console.log("new margin top", nmt);
            //console.log("navHeight", navHeight + 10);
          
            //console.log("scSizeHeightOrig", scSizeHeightOrig);
            // console.log("scSizeHeight", scSizeHeight);
         

            //console.log(".adm-slide-content TOP being set (headerHeight + navHeight)");
            $(".adm-slide-content").css({
              //   'top': newSCTop
              });
            //console.log("new margin top (above if)", nmt);
            if (scSizeHeight >= nmt){
              $(".adm-slide-content").addClass('inline');
              //console.log(".adm-slide-content HEIGHT, WIDTH, FONT-SIZE being set");
              $(".adm-slide-content").css({
                //     'height': nmt -20,
                //     'max-width': '50%',
                //      'font-size': '100%'
                });
            }
            // end medium-tall screens
            console.log("Medium Screen portion END");

          }else if(wh >= 600){  // Tall screens, use default margin top

            console.log("Tall Screen portion BEGIN");
            console.log("headerHeight", headerHeight);
            console.log("scHeight", scHeight);
            console.log("scSizeHeightOrig", scSizeHeightOrig);
            
            //console.log("#content MARGIN-TOP, BORDER-TOP being set");
            $("#content").css({
              //     'margin-top':contentMarginTopOrig,
              //     'border-top':"20px solid #4B2E84"
              });
            //console.log("#main BACKGROUND-POSITION, BACKGROUND-SIZE being set");
            $("#main").css({
              //     'background-position' : bwPosOrig,
              //     'background-size': bwSizeOrig
              });
            //console.log("contentMarginTopOrig", contentMarginTopOrig)
            //console.log(".adm-slide-content HEIGHT being set and .inline class being removed");
            var ascTop = headerHeight - scSizeHeightOrig;

            console.log("ascTop: headerHeight - scSizeHeightOrig = ", ascTop);
            $(".adm-slide-content")
            .css({
              'left': '20px',
              'top': ascTop
            })
            .removeClass('inline') ;
            console.log("Tall Screen portion END");
           
          }else{// Short screens, use no margin top
            console.log("Short Screen portion BEGIN");
            //console.log("#content MARGIN-TOP, BORDER-TOP BEING SET");
            $("#content").css({
              //       'margin-top':0,
              //       'border-top':0
              });
            console.log("Short Screen portion END");
          }
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
