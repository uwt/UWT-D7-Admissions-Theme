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
    
      var searchRegion = $("#search");
      var searchForm = $("#search form .container-inline");
      // Add a cute icon at the end of the menu
      var menu = $("#navigation .menu-block-wrapper > .menu");
      //console.log("settings", settings);
      var themeImages = settings.basePath + "sites/all/themes/" + settings.ajaxPageState.theme + "/images/";
      //console.log("themeImages", themeImages);
      // Create the menu open button
      var menuOpenListItem = $("<li>",{
        width:"50px"
      });
      var menuOpenImg = $("<img />",
      {
        "src": themeImages + "/search-icon-large.png",
        "class": "search-toggle open"
      });
      menuOpenListItem.append(menuOpenImg);
      // Create the menu close button
      var menuCloseIcon = $("<img />",
      {
        "src": themeImages + "/search-icon-close.png",
        "class": "search-toggle close"
      });

      // Append the buttons to the elements
      menu.append(menuOpenListItem);
      searchForm.append(menuCloseIcon);
      
      // Event handler to show/hide the search region
      $(".search-toggle").click(function(){
        searchRegion.toggleClass("show-search");
      });

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
        var mainTop, ascTop, navTop, navHeight, navBottom, verticalDiff, ascVertPadding;
        if( $(window).width() >= 725){

          var wh = $(window).height(); // Window Height

          if(wh >= 300 && wh <= 600){// Medium-tall screens, dynamically assign the margin top
            //console.log("Medium Screen portion BEGIN");
            //console.log("window height", wh);


            // This determines how many vertical pixels of the "body content" is shown.
            // 100 is an arbitrary number.
            $("#header").css({
              height: wh - 100
            });


            // Calculate the difference between the bottom of the navigation and the top of the #main
            var bw = {};
            bw['backgroundColor'] = $("#header").css("background-image");
            bw['backgroundSize'] = $("#header").css("background-size");
            bw['backgroundPosition'] = $("#header").css("background-position");


            var bwSizeArr = bw.backgroundSize.split(" ");
            var bwSizeWidth = parseInt(bwSizeArr[0]);
            var bwSizeHeight = parseInt(bwSizeArr[1]);

            mainTop = $("#main").offset().top;
            navTop = $("#navigation").offset().top;
            navHeight = $("#navigation").outerHeight();
            navBottom = navTop + navHeight;
            verticalDiff = (mainTop - navBottom)


            var ar = (bwSizeWidth / bwSizeHeight);
            bwSizeHeight = (verticalDiff - 20);
            bwSizeWidth = (bwSizeHeight * ar);
            var bwSizeCss = bwSizeWidth + 'px ' + bwSizeHeight + 'px';
            //console.log("#header BACKGROUND-SIZE being set");
            var bwMaxHeight = 200;
            if(bwSizeHeight <= bwMaxHeight){
              $("#header").css({
                'background-size': bwSizeCss
              });
            }

            var scSizeHeightOrig = $(".adm-slide-content").outerHeight();

            var headerHeight = $("#header").outerHeight();
            ascTop = headerHeight - scSizeHeightOrig;
            

            //console.log("verticalDiff", verticalDiff);
            ascVertPadding = 10;
            if(verticalDiff >= 160){
              ascVertPadding += 40;
              $(".adm-slide-content").removeClass('inline');
            }else{
              $(".adm-slide-content").addClass('inline');
            }

            var ascHeight = verticalDiff - ascVertPadding;

            $(".adm-slide-content")
            .css({
              fontSize: '1em',
              height: ascHeight,
              left: '20px',
              top: navBottom + (ascVertPadding * 0.5) // 10 is 1/2 of the arbitrary 20 used when determining the ascHeight
            });


          // end medium-tall screens
          // console.log("Medium Screen portion END");
            
          /*
             * TALL SCREENS BEGIN
             */
          }else if(wh >= 600){  // Tall screens, use default margin top

            //console.log("Tall Screen portion BEGIN");
            //console.log("headerHeight", headerHeight);
            //console.log("scHeight", scHeight);
            //console.log("scSizeHeightOrig", scSizeHeightOrig);

            $("#header").css({
              height: '500px' // 500 is what we set originally in the CSS
            });

            mainTop = $("#main").offset().top;
            navTop = $("#navigation").offset().top;
            navHeight = $("#navigation").outerHeight();
            navBottom = navTop + navHeight;
            verticalDiff = (mainTop - navBottom)

            ascVertPadding = 40;


            ascTop = navBottom + (ascVertPadding * 0.5);

            //console.log("navBottom", navBottom);
            //console.log("ascVertPadding",ascVertPadding);
            //console.log("ascTop", ascTop);
            
            //console.log("verticalDiff", verticalDiff);
           
            $(".adm-slide-content")
            .css({
              height: ascHeight,
              left: '10px',
              top: ascTop
            })
            .removeClass('inline') ;
          // console.log("Tall Screen portion END");

          /*
             * SHORT SCREENS BEGIN
             */

          }else{// Short screens, use no margin top
            //console.log("Short Screen portion BEGIN");
            //console.log("#content MARGIN-TOP, BORDER-TOP BEING SET");
            $("#content").css({
              //       'margin-top':0,
              //       'border-top':0
              });
          //console.log("Short Screen portion END");
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
