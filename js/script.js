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
    Xattach: function(context, settings) {


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
    attach: function(){
      function applyNavMods(){

        /********************************************************\
        |******** Show/hide the toggler based on scroll **********|
        \********************************************************/

        // @see http://wicky.nillia.ms/headroom.js/
        // grab an element
        var searchToggler = document.querySelector("#search-toggler");
        // construct an instance of Headroom, passing the element
        var headroom  = new Headroom(searchToggler);
        // initialise
        headroom.init();


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
        var showBelow = 35;
        //console.log("bannerTop", bannerTop);
        $("html .region-banner #banner-container #banner ul li").css({
          "height": wih - bannerTop - showBelow
        });

        // Make the search and navigation container as tall as the document
        // and moved equally as far to the top...thus hiding the element.
        $("#search-n-nav").css({
          "height":height+"px",
          "top":"-"+height+"px"
        });
        
        // Add the uw button styles to the nav links
        $("#navigation .menu li a").addClass("uw-btn btn-sm");

        // Create a div that we can click on that closes the nav menu
        if($("#body-closer").length == 0){
          $("<div></div>",{
            id: "body-closer"
          })
          .css({
            "height": height
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
            //console.log($(document).scrollTop());
            // When the search and nav element is shown, position it right below
            // the search toggler
            var snnTop = $(document).scrollTop() + stHeight + "px";
            $("#search-n-nav").css({
              "top": snnTop
            });
            // Show the body closer
            $("#body-closer").addClass("shown");

          }else{ // search-n-nav is displayed
            $("#search-toggler .text").text("Open");
            $("#search-toggler").removeClass("search-opened");
            $("#body-closer").removeClass("shown");
            $("#search-n-nav").css({
              "top":"-"+height+"px"
            });
            // Hide the body closer
            $("body-closer").removeClass("shown");
          }
          // Toggle show-search
          $("#search-n-nav").toggleClass("show-search");

        }); // End #search-toggler click handler
      }
      // Apply the navigation modifies on load and window resize
      $(window).resize(applyNavMods);
      applyNavMods();

    },
    Xattach: function(context, settings) {

      function applyNavMods(){
        // Get the current window width
        var wiw = window.innerWidth;

        // First we create the navigation opener element
        if(!$("#nav-opener").length > 0){
          // Create the nav-opener element
          var navOpener = $("<div></div>", {
            id: "nav-opener"
          })
          .text("Menu & Search");
          // Add the navigation opener to the body
          $("body").prepend(navOpener);
        }

        // Then we can create the navigation closer element
        if(!$("#nav-closer").length > 0){
          // Create the "close menu" item.
          var navCloser = $("<div></div>",{
            id : "nav-closer"
          })
          .text("Hide menu")
          .click(function(){
            // Hide the search region
            $("#search-n-nav #navigation").removeClass("show-search");
            // Hide the navigation menu
            $("#navigation").removeClass("show-nav");
          })
          .prependTo("#navigation");
          // Create the menu close button
          var themeImages = settings.basePath + "sites/all/themes/" + settings.ajaxPageState.theme + "/images/";
          var menuCloseIcon = $("<img />",
          {
            "src": themeImages + "/search-icon-close.png",
            "class": "nav-closer-icon"
          })
          .prependTo(navCloser);
        }

        if (wiw <= 410){

          console.log("apply the extra narrow nav mods");

          console.log("// Move the navigation into the search region");
          $("#search").append($("#navigation"));

          console.log("// Remove the extra search toggle");
          $("#navigation #searchOpen").remove();
          
          console.log("// Move the nav/search closer to the top of the search region");
          $("#block-search-form").prepend($("#search .search-toggle"));
          
          console.log("// Remove the extra nav closer");
          $("#navigation #nav-closer").remove();
          
          console.log("// Apply the click handeler to the nav opener");
          $("#nav-opener").click(function(){
            $("#search").addClass("show-search");
          });
          
          console.log("// Move the header before the region-banner");
          $("#page .region-banner").before($("#header"));




        }else if(wiw <= 725){  // Narrow breakpoint
          console.log("Apply the narrow nav mods");

          console.log(" // Move the search back into the navigation");
          //$("#navigation").prepend($("#search"));
          
          console.log("// Prepend #nav-closer to  #search");
          $("#search").prepend($("#nav-closer"));

          console.log("// Add mobilized class to #navigation");
          $("#navigation").addClass("mobilized");
          
          console.log("// Add the click handler to the nav opener");
          $("#nav-opener").click(function(){

            console.log(" // Show the navigation menu");
            $("#navigation").addClass("show-nav");

            console.log("// Hide the close search button icon");
            $("#searchOpen , .search-toggle").css({
              "display": "none"
            });
          });


        }else{ // If the windows is wider than the narrow breakpoint
          $("#navigation").removeClass("mobilized");
          // Put the search form into the search region
          $("#navigation #block-search-form").prependTo($("#search .region-search"));
          $("#searchOpen , .search-toggle").css({
            "display" : "inline-block"
          });
        }



        

        
       
      } // End applyNavMods()
  






    } // end of attach

  };

  // We want to make sure that no matter how short a users screen is, in desktop mode, they
  // can see that there is content "below the fold"
  Drupal.behaviors.foldWorks = {
    Xattach: function(context, settings) {



      // 1. Adjust the top-margin on the #content element. This will move the "fold" vertically
      // 2. Resize the block W to an appropriate size.
      // 3. Reposition the block W. It cannot touch the top nav, and it has to touch
      function foldWork(){
        var  ascTop;
        var wiw = window.innerWidth;
        var headerHeightOrig = 500; // Matches the CSS declaration.
        var wh = $(window).height(); // Window Height
        var mainToShow = 100; // Show 100px of the #main element


        // Only position and resize wlements when we are in narrow or wider breakpoints
        if(wiw >= 411){ // 411px wide is the low end of the narrow breakpoint
          console.log("\nMedium-tall screen portion BEGIN\n");


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
          //console.log("bwSizeWidth", bwSizeWidth);
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
          var hr = $("#header > .region-header");
          var hrHeight = hr.outerHeight({
            margin: true
          });
          var hrTop = hr.offset().top;
          var mainTop = $("#main").offset().top;
          //console.log("mainTop", mainTop);
          // nr = Navigation Region
          var nr = $("#navigation");
          var nrTop = nr.offset().top;
          var nrHeight = nr.outerHeight({
            margin: true
          });
          // the mobilized menu is tall, so when the mobilized menu is shown, just use 50px
          if (nrHeight > 50){
            nrHeight = 0;
          }


          var ascWidth = 0;
          var ascHeight = 0;
          var ascTop = hrHeight + hrTop + nrHeight + nrTop + (nrHeight - nrTop);
          $(".adm-slide-content").each(function(){


            var admFontSize = parseInt($(this).css("font-size"));
            //console.log("admFontSize in each, before while", admFontSize);
            //console.log("before while", jQuery(this).isChildOverflowing('.adm-slide-content a'));

            // If the "read more" anchor is overflowing the adm-slide-content
            // then reduce the font size.  I know, 75% is arbitrary. #dealWithIt.
            // I tried many variations of the "shrink it till it fits" method but I
            // just couldn't get it to work.

            if(!jQuery(this).isChildOverflowing('.adm-slide-content a') 
              ||
              !jQuery(this).isChildOverflowing('.adm-slide-content p')){
              console.log(jQuery(this).find('*'));
              jQuery(this).find('*').css({
                "font-size" : "75%"
              });
            }


            ascWidth = $(this).outerWidth();

            // If the width of the box is more than half the window width,
            // cap the width at 50%. Otherwise, make it sized relative to the
            // block W.
            if((parseInt(ascWidth) * 2) > wiw){
              ascWidth = "50%";
            }else{
              // The 40 is 4x10 px worth of padding/margin on the elements
              ascWidth = wiw - (bwSizeWidth + 40) + "px";
            }
            //console.log("ascWidth POST", ascWidth);
            $(this).css({
              "max-width" : ascWidth
            });

            ascHeight = wh - mainToShow - ascTop;// - $(this).innerHeight();



          });  // end of each() .adm-slide-content
  
          // Determine the top and height for the admission slide content

          // Set the width and position on the admissions slide content
          $(".adm-slide-content").css({
            "top" : ascTop,
            "max-height" : ascHeight
          });

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
          speed : 4500,
          delay : 8500,
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
