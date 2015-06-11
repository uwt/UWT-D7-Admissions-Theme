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

  // Move the search form into the navigation for easier styling, (easier, yeah right)
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
      var searchOpenListItem = $("<li>",{
        width: "25px",
        id: "searchOpen"
      });
      searchOpenListItem.css({
        "padding-right": "0px"
      });
      var menuOpenImg = $("<img />",
      {
        "src": themeImages + "/search-icon-large.png",
        "class": "search-toggle open"
      });

      searchOpenListItem.prepend(menuOpenImg);
      // Create the menu close button
      var menuCloseIcon = $("<img />",
      {
        "src": themeImages + "/search-icon-close.png",
        "class": "search-toggle close"
      });

      // Append the buttons to the elements
      menu.append(searchOpenListItem);
      searchForm.append(menuCloseIcon);
      
      // Event handler to show/hide the search region
      $(".search-toggle").click(function(){
        searchRegion.toggleClass("show-search");
      });




    } // end of attach
  };

  // Modify the navigation menu styles.
  // Essentially, when the window gets too narrow for normal navigation, apply a
  // class to the navigation that will turn it mobiley.
  Drupal.behaviors.searchNavMods = {
    attach: function(context, settings) {

      function applyNavMods(){
        var wiw = window.innerWidth;
        if(wiw <= 724){  // If the window is at the narrow breakpoint or smaller
          $("#navigation").addClass("mobilized");
        }else{ // If the windows is wider than the narrow breakpoint
          $("#navigation").removeClass("mobilized");
          // Put the search form into the search region
          $("#navigation #block-search-form").prependTo($("#search .region-search"));
          $("#searchOpen , .search-toggle").css({
            "display" : "inline-block"
          });
        }

        if($("#nav-opener").length > 0){

        }else{
          // Create the nav-opener element
          var navOpener = $("<div></div>", {
            id: "nav-opener"
          }).click(function(){
            // Show the navigation menu
            $("#navigation").addClass("show-nav");
            // Move the search into this menu
            $("#block-search-form").insertBefore($("#navigation .block-menu-block > .menu-block-wrapper > .menu"));
            // Hide the close search button icon
            $("#searchOpen , .search-toggle").css({
              "display": "none"
            });
          })
          .text("Menu & Search");
          // Add it to the body
          $("body").append(navOpener);

          // Create the "close menu" item.
          var navCloser = $("<li></li>",{
            id : "nav-closer"
          })
          .text("Hide menu")
          .click(function(){
            // Hide the navigation menu
            $("#navigation").removeClass("show-nav");
          })
          .prependTo(".region-navigation >.block-menu-block > .menu-block-wrapper > .menu");
          // Create the menu close button
          var themeImages = settings.basePath + "sites/all/themes/" + settings.ajaxPageState.theme + "/images/";
          var menuCloseIcon = $("<img />",
          {
            "src": themeImages + "/search-icon-close.png",
            "class": "nav-closer-icon"
          })
          .prependTo(navCloser);

        }
       
      } // End applyNavMods()
  



      $(window).resize(applyNavMods);
      applyNavMods();
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
        var wiw = window.innerWidth;
        var headerHeightOrig = 500; // Matches the CSS declaration.
        var wh = $(window).height(); // Window Height
        var mainToShow = 100; // Show 100px of the #main element


        // Only position and resize wlements when we are in narrow or wider breakpoints
        if(wiw >= 411){ // 411px wide is the low end of the narrow breakpoint
          console.log("\nMedium-tall screen portion BEGIN\n");

          //console.log("wh", wh);
          //console.log("wh - mainToShow ", wh - mainToShow);
          //console.log("headerHeightOrig", parseInt(headerHeightOrig));

          /* Make sure we show the top X pixels of the #main element
           * #header height controls how far up or down #main is on the screen

           */
          if((wh - mainToShow) < headerHeightOrig){
            $("#header").css({
              "height":  (wh - mainToShow) +"px"
            });

            
          }
          /*
           * Set the block W (bw) dimensions.
           * Keep the proper aspect ratio.
           * Make the W 25% as tall as the header. 25% is arbitrary. I could change.
           * The top of header is the top of the viewport, the bottom goes to the top
           * of the #main element.
           */
          var wHeight = 0.25;
          // bw = Block W
          var bw = {};
          bw['backgroundImg'] = $("#header").css("background-image");
          bw['backgroundSize'] = $("#header").css("background-size");
          bw['backgroundPosition'] = $("#header").css("background-position");
          //console.log("bw", bw);
          var bwSizeArr = bw.backgroundSize.split(" ");
          var bwSizeWidth = parseInt(bwSizeArr[0]);
          var bwSizeHeight = parseInt(bwSizeArr[1]);
          //console.log("PRE MOD: bwSizeWidth: " + bwSizeWidth + " bwSizeHeight: " + bwSizeHeight);
          // ar = aspect ratio
          var ar = (bwSizeWidth / bwSizeHeight);
          //console.log("ar", ar);
          bwSizeHeight = parseInt($("#header").css("height")) * wHeight;
          bwSizeWidth = bwSizeHeight * ar;

          //console.log("POST MOD: bwSizeWidth: " + bwSizeWidth + " bwSizeHeight: " + bwSizeHeight);
          var bwSizeCss = bwSizeWidth + 'px ' + bwSizeHeight + 'px';
          $("#header").css({
            'background-size': bwSizeCss
          });
          /*
           * End block W dimensions
           */


          /*
           * Admissions slide content mods.
           * We want to control the size and position of the text that appears
           * over the slideshow.
           */
          // Place the admissions slide content relative to the region header
          // hr = Header Region
          var hr = $("#header .region-header h1");
          var hrHeight = hr.outerHeight();
          var hrTop = hr.offset().top;
          
          // nr = Navigation Region
          var nr = $("#navigation");
          var nrHeight = nr.outerHeight();
          // the mobilized menu is tall, so when the mobilized menu is shown, just use 50px
          if (nrHeight > 50){
            nrHeight = 0;
          }


          console.log("hrHeight", hrHeight);
          console.log("hrTop", hrTop);
          console.log("nrHeight", nrHeight);
          //console.log("bwSizeWidth", bwSizeWidth);
          var ascWidth = 0;
          var ascHeight = 0;
          $(".adm-slide-content").each(function(){
            var widest = 0;

            $(this).find("p,h2").each(function(){

              ascWidth = $(this).outerWidth();

              if(widest > ascWidth){
                widest = ascWidth;
              }

              ascHeight += $(this).outerHeight();

            });
          });
  
          var ascMaxWidth = ascWidth;
          var ascMaxHeight = ascHeight;

          console.log("hrHeight + hrTop + nrHeight + 20", hrHeight + hrTop + nrHeight + 20);

          // Set the width and position on the admissions slide content
          $(".adm-slide-content").css({
            "top" : hrHeight + hrTop + nrHeight + 20,
            "max-width" : ascMaxWidth + "px",
            "max-height" : ascMaxHeight + "px"
          });
          




          /*
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
            console.log("bwSizeWidth: " + bwSizeWidth + " bwSizeHeight: " + bwSizeHeight);
            mainTop = $("#main").offset().top;
            navTop = $("#navigation").offset().top;
            navHeight = $("#navigation").outerHeight();

            navBottom = navTop + navHeight;
            console.log("navBottom", navBottom);
            
            verticalDiff = (mainTop - navBottom)
            console.log("verticalDiff - rut roh!", verticalDiff);

            // ar = aspect ratio
            var ar = (bwSizeWidth / bwSizeHeight);
            console.log("ar", ar);
            bwSizeHeight = (verticalDiff - 20);
            bwSizeWidth = (bwSizeHeight * ar);
            console.log("bwSizeWidth: " + bwSizeWidth + " bwSizeHeight: " + bwSizeHeight);
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

            */
          // end medium-tall screens
          console.log("\nMedium-tall screen portion END\n");
            

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

      function applyUnSlider(){
        var wiw = window.innerWidth;
        $('#banner')
        .width(wiw)
        .unslider({
          speed : 2500,
          delay : 150000,
          dots : false,
          flud : true
        });
      }
      $(window).resize(applyUnSlider);
      applyUnSlider();
    } // end of attach
  }; // end of bannerSlider

})(jQuery, Drupal, this, this.document);
