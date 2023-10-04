/* Astra Theme Scripts */

(function ($) {
  "use strict";

  $(window).on("load", function () {
    $("body").addClass("loaded");
  });

  /*=========================================================================
	Sticky Header
=========================================================================*/
  $(function () {
    var header = $("#header"),
      yOffset = 0,
      triggerPoint = 80;
    $(window).on("scroll", function () {
      yOffset = $(window).scrollTop();

      if (yOffset >= triggerPoint) {
        header.addClass("navbar-fixed-top");
      } else {
        header.removeClass("navbar-fixed-top");
      }
    });
  });

  /*=========================================================================
    Review Carousel
=========================================================================*/

  // $("#review-carousel").owlCarousel({
  //   loop: true,
  //   margin: 15,
  //   autoplay: true,
  //   smartSpeed: 500,
  //   items: 1,
  //   nav: false,
  //   dots: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     480: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 2,
  //     },
  //   },
  // });

  $(function () {
    $.get(
      "https://api.yasha64.ru/api/feedback/published-list",
      function (data) {
        createTable(data.data);
      }
    );
  });

  function createTable(data) {
    var html = "";
    $(".owl-carousel").trigger("destroy.owl.carousel");
    $(".owl-carousel").find(".owl-stage-outer").children().unwrap();
    $(".owl-carousel").removeClass("owl-center owl-loaded owl-text-select-on");

    data.forEach((e) => {
      html += createTableRow(e);
    });

    $(".owl-carousel").html(html);
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 15,
      autoplay: true,
      smartSpeed: 500,
      items: 1,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 2,
        },
      },
    });
  }

  // adding content to the DOM
  function createTableRow(result) {
    return `
     <div class="review-item">
        <div class="review-thumb">
          <img src=${result["photo"].image} alt="thumb" />
        </div>
        <div class="review-content">
          <h3>${result.name}</h3>
          <ul class="rattings">
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
          </ul>
          <div class="review-text">
            <p>
            ${result.message}
            </p>
          </div>
        </div>
     
      </div>`;
  }

  /*=========================================================================
    Mobile Menu
=========================================================================*/
  // $('.menu-wrap ul.nav').slicknav({
  //     prependTo: '.header-section .navbar',
  //     label: '',
  //     allowParentLinks: true
  // });

  /*=========================================================================
    Screenshot Carousel
=========================================================================*/
  function getSlide() {
    var wW = $(window).width();
    if (wW < 991) {
      return 1;
    } else if (wW < 1170) {
      return 3;
    } else {
      return 5;
    }
  }
  function getSlideSpace() {
    var wW = $(window).width();
    if (wW < 991) {
      return 0;
    }
    return 20;
  }
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: getSlide(),
    loop: true,
    autoplay: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    spaceBetween: getSlideSpace(),
  });

  /*=========================================================================
	Initialize smoothscroll plugin
=========================================================================*/
  smoothScroll.init({
    offset: 60,
  });

  /*=========================================================================
	Scroll To Top
=========================================================================*/
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll-to-top").fadeIn();
    } else {
      $("#scroll-to-top").fadeOut();
    }
  });

  /*=========================================================================
	WOW Active
=========================================================================*/
  new WOW().init();

  /*=========================================================================
	MAILCHIMP
=========================================================================*/
  if ($(".subscribe-form").length > 0) {
    $(".subscribe-form").ajaxChimp({
      language: "es",
      callback: mailchimpCallback,
      url: "https://github.us21.list-manage.com/subscribe/post?u=1a89f98df37a15c8d9cd4ecd3&amp;id=48124d0574&amp;f_id=0099dce6f0",
    });
  }

  function mailchimpCallback(resp) {
    console.log(resp.msg);
    if (resp.result === "success") {
      $("#subscribe-result").addClass("subs-result");
      $(".subscription-success").text(resp.msg).fadeIn();
      $(".subscription-error").fadeOut();
    } else if (resp.result === "error") {
      $("#subscribe-result").addClass("subs-result");
      $(".subscription-error").text(resp.msg).fadeIn();
    }
  }
  $.ajaxChimp.translations.es = {
    submit: "Submitting...",
    0: "We have sent you a confirmation email",
    1: "Please enter your email",
    2: "An email address must contain a single @",
    3: "The domain portion of the email address is invalid (the portion after the @: )",
    4: "The username portion of the email address is invalid (the portion before the @: )",
    5: "This email address looks fake or invalid. Please enter a real email address",
  };
})(jQuery);
