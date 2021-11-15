(function ($) {
  'use strict';

  // global variables

  var win = $(window);

  // check if element is in view
  function inView(element) {
    // get window height
    var windowHeight = window.innerHeight;
    // get number of pixels that the document is scrolled
    var scrollY = window.scrollY || window.pageYOffset;

    var elementHeight = element.clientHeight;
    // get current scroll position (distance from the top of the page to the bottom of the current viewport)
    var scrollPosition = scrollY + windowHeight;
    // get element position (distance from the top of the page to the bottom of the element)
    var elementPosition =
      element.getBoundingClientRect().top + scrollY + (elementHeight / 2);

    // is scroll position greater than element position? (is element in view?)
    if (scrollPosition > elementPosition) {
      return true;
    }
    return false;
  }

  // var element = document.getElementById("appear");
  // animate element when it is in view
  // function animate() {
    // console.log("into animate");
    // is element in view?
    // if (inView(element)) {
    //   // console.log("element in view");
    //   // console.log(element);
    //   // element is in view, add class to element
    //   //element.classList.add("typing-demo");
    //   // element.classList.add("animate-typing");
    // }
  // }

  // get the element to animate
  // console.log("found element from script");
  // listen for scroll event and call animate function
  // document.addEventListener("scroll", animate);

  function navBar() {
    if ($(window).scrollTop() > 70) {
      // $('.main-nav').addClass('nav-top');
      $('.main-nav').hide();
    } else {
      // $('.main-nav').removeClass('nav-top');
      $('.main-nav').show();
    }
  }

  navBar();


  // navigation fixed top
  win.on('scroll', function () {
    navBar();
  });


  $(".toggler").click(function () {
    $(".full-nav").toggleClass("show");
  });


  // clients slider
  
  $('.clients-wrap').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    dots: false,
    arrows: false,
    center: true,
    autoplay: true,
    padding: 20,
    autoplaySpeed: 6000,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }

    ]
  });
  


  // testimonial slider
  $('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [{
      breakpoint: 900,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }]
  });


  // testimonial slider 2
  $('.testimonial-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    nextArrow: '<button class="slide-arrow prev-arrow"><i class="ti-arrow-right"></i></button>',
    prevArrow: '<button class="slide-arrow next-arrow"><i class="ti-arrow-left"></i></button>',
    autoplay: true,
    autoplaySpeed: 6000
  });


  // magnific popup
  $('.portfolio-gallery').each(function () {
    $(this).find('.popup-gallery').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

  $(document).ready(function () {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });



  win.on('load', function () { // makes sure the whole site is loaded

    // -----------------------
    // Progress Bar--------------------
    //
    $('.progress-bar').each(function () {
      var width = $(this).data('percent');
      $(this).css({
        'transition': 'width 3s'
      });
      $(this).appear(function () {
        $(this).css('width', width + '%');
        $(this).find('.skill-number').countTo({
          from: 0,
          to: width,
          speed: 3000,
          refreshInterval: 50
        });
      });
    });
  }); //End On Load Function



  // search box
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // Shuffle js filter and masonry
  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    $('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  // meta social link
  $('.share-btn').on('click', function (e) {
    e.preventDefault();
    $('.meta-share .social-links').toggleClass('open');

  });

  $('div').slice(0, 6).show(); // select the first ten
  $('#load').click(function (e) { // click event for load more
    e.preventDefault();
    $('div:hidden').slice(0, 3).show(); // select next 10 hidden divs and show them
    if ($('div:hidden').length === 0) { // check if any hidden divs still exist
      alert('No more divs'); // alert if there are none left
    }
  });

  if ($("#search-input").length > 0) {
    var sjs = SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '/search.json'
    });
  }


  $(document).ready(function () {
    $(document).scroll(typeWhenVisible);

    function typeWhenVisible() {
      $(".typewrite").each(function (idx, elm) {
        if (inView(elm)) {
          let delay = 70;
          if($(elm).data("delay")){
            delay = $(elm).data("delay");
          }
          var typewrite = new Typewriter(elm, { cursor: "_", delay: delay });
          typewrite.typeString($(elm).data("text")).pauseFor(500)
            .start().callFunction(function(elem){
              $(elem.elements.cursor).hide();
            });
          $(elm).removeClass("typewrite");
        }
      });
    }

    typeWhenVisible();



    function animatePixel(imgElem, speed=100) {
      // Grab the Canvas and Drawing Context
      var canvas = document.createElement('canvas');
      $(canvas).addClass("toBePixeled");
      var ctx = canvas.getContext('2d');
      $(canvas).insertAfter(imgElem);
      var blocks = 13;

      // Create an image element
      var img = new Image();

      //When the page first loads - draw the initial demo image
      window.onload = firstDraw();

      function firstDraw() {
        //preload the demo image
        var initialImageURL = imgElem.src;
        draw(initialImageURL);
      }

      var height, width;


      function draw(imgURL) {
        img.crossOrigin = "anonymous";
        img.src = imgURL;

        img.onload = function () {
          canvas.height = imgElem.height;
          canvas.width = imgElem.width;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          height = imgElem.height;
          width = imgElem.width;
          pixelate(1);
          $(imgElem).hide();
          if(inView(canvas) && $(canvas).hasClass("toBePixeled")){
            for(let i=0; i<=12; i += 1){
              setTimeout(() => {
                pixelate(i);
              }, speed*i);
            }

            setTimeout(() => {
              pixelate(100, true);
            }, speed*12 + 200);
            $(canvas).removeClass("toBePixeled");
          }
          $(document).scroll(function(){
            if(inView(canvas) && $(canvas).hasClass("toBePixeled")){
              for(let i=0; i<=12; i += 1){
                setTimeout(() => {
                  pixelate(i);
                }, speed*i);
              }

              setTimeout(() => {
                pixelate(100, true);
              }, speed*12 + 200);
              $(canvas).removeClass("toBePixeled");
            }
          });
        };
      }

      //
      function pixelate(blocks, last=false) {
        //dynamically adjust canvas size to the size of the uploaded image
        canvas.height = height;
        canvas.width = width;

        /// if in play mode use that value, else use slider value
        var size = (blocks) * 0.01,

          /// cache scaled width and height
          w = canvas.width * size,
          h = canvas.height * size;

        /// draw original image to the scaled size
        ctx.drawImage(img, 0, 0, w, h);

        /// then draw that scaled image thumb back to fill canvas
        /// As smoothing is off the result will be pixelated
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        if(last){
          ctx.mozImageSmoothingEnabled = true;
          ctx.imageSmoothingEnabled = true;
        }
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
      }
    }

    $(".imgpx").each(function(idx, elm){
      var duration = 1;
      if($(elm).data("duration")){
        duration = $(elm).data("duration");
      }
      console.log(elm);
      animatePixel(elm, duration*100);
    });
  });
})(jQuery);