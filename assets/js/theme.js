(function ($) {
  "use strict";



  if ($(".range-slider-month").length) {

  }

  if ($(".range-slider-count").length) {

  }

   if ($(".range-slider-interest").length) {

  }

  if ($("#loan-calculator").length) {

    var monthRange = document.getElementById("range-slider-month");
    var interestRange = document.getElementById("range-slider-interest");
    var countRange = document.getElementById("range-slider-count");


    var limitFieldMinMonth = document.getElementById("min-value-rangeslider-month");
    var limitFieldMaxMonth = document.getElementById("max-value-rangeslider-month");

    var limitFieldMinInterest = document.getElementById("min-value-rangeslider-interest");
    var limitFieldMaxInterest = document.getElementById("max-value-rangeslider-interest");

    var limitFieldMinCount = document.getElementById("min-value-rangeslider-count");
    var limitFieldMaxCount = document.getElementById("max-value-rangeslider-count");


    noUiSlider.create(monthRange, {
      start: 8,
      behaviour: "snap",
      step: 1,
      tooltips: [wNumb({ decimals: 0 })],
      connect: [true, false],
      range: {
        min: 1,
        max: 5
      }
    });

    noUiSlider.create(interestRange, {
      start: 4,
      behaviour: "snap",
      step: 0.1,
      tooltips: [wNumb({ decimals: 1, postfix:'%'})],
      connect: [true, false],
      range: {
        min: 1,
        max: 12
      }
    });



    noUiSlider.create(countRange, {
      start: 16000,
      step: 1000,
      tooltips: [wNumb({ decimals: 0, prefix: "₹" })],
      behaviour: "snap",
      connect: [true, false],
      range: {
        min: 10000,
        max: 1000000
      }
    });


    monthRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMaxMonth) : $(limitFieldMinMonth)).attr(
        "value",
        values[handle]
      );
      let loanMoney = limitFieldMinCount.value;
      let interestRate = limitFieldMinInterest.value;
      let interestRatePercent = parseFloat(interestRate, 10) / 100;
      let totalPay = loanMoney * interestRatePercent + parseInt(loanMoney, 10);
      let monthlyPay = totalPay / parseInt(values[handle],10);

      $("#loan-month").html(parseInt(values[handle], 10));
      $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
      $("#loan-total").html(parseInt(totalPay, 10));
    });

    interestRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMaxInterest) : $(limitFieldMinInterest)).attr(
        "value",
        values[handle]
      );
      let loanMoney = limitFieldMinCount.value;
      let loanMonth = limitFieldMinMonth.value;
      let interestRatePercent = parseFloat(values[handle], 10) / 100;
      let totalPay = loanMoney * interestRatePercent + parseInt(loanMoney, 10);
      let monthlyPay = totalPay / parseInt(loanMonth,10);

      $("#loan-month").html(parseInt(values[handle], 10));
      $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
      $("#loan-total").html(parseInt(totalPay, 10));
    });

    countRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMaxCount) : $(limitFieldMinCount)).attr(
        "value",
        values[handle]
      );

      let loanMonth = limitFieldMinMonth.value;
      let interestRate = limitFieldMinInterest.value;
      let interestRatePercent = parseFloat(interestRate, 10) / 100;
      let totalPay = values[handle] * interestRatePercent + parseInt(values[handle], 10);
      let monthlyPay = totalPay / parseInt(loanMonth,10);

      $("#loan-month").html(parseInt(loanMonth, 10));
      $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
      $("#loan-total").html(parseInt(totalPay, 10));

    });

    let loanMoney = limitFieldMinCount.value;
    let loanMonth = limitFieldMinMonth.value;
    let interestRate = limitFieldMinInterest.value;
    let interestRatePercent = parseInt(interestRate, 10) / 100;
    let totalPay = loanMoney * interestRatePercent + parseInt(loanMoney, 10);
    let monthlyPay = totalPay / parseInt(loanMonth,10);

    $("#loan-month").html(parseInt(loanMonth, 10));
    $("#loan-monthly-pay").html(parseInt(monthlyPay, 10));
    $("#loan-total").html(parseInt(totalPay, 10));

  }

  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top
        },
        1000
      );

      return false;
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        },
        subject: {
          required: true
        }
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post($(form).attr("action"), $(form).serialize(), function (
          response
        ) {
          $(form).parent().find(".result").append(response);
          $(form).find('input[type="text"]').val("");
          $(form).find('input[type="email"]').val("");
          $(form).find("textarea").val("");
        });
        return false;
      }
    });
  }

  // mailchimp form
  if ($(".mc-form").length) {
    $(".mc-form").each(function () {
      var Self = $(this);
      var mcURL = Self.data("url");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          // appending response
          mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          // making things based on response
          if (resp.result === "success") {
            // Do stuff
            Self.removeClass("errored").addClass("successed");
            mcResp.removeClass("errored").addClass("successed");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
        }
      });
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      
      fixedContentPos: false
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }

  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }
  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }
  if ($(".sticky-header__content").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".sticky-header__content");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
    });
  }
  if ($(".odometer").length) {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($("#donate-amount__predefined").length) {
    let donateInput = $("#donate-amount");
    $("#donate-amount__predefined")
      .find("li")
      .on("click", function (e) {
        e.preventDefault();
        let amount = $(this).find("a").text();
        donateInput.val(amount);
        $("#donate-amount__predefined").find("li").removeClass("active");
        $(this).addClass("active");
      });
  }

  $("#accordion .collapse").on("shown.bs.collapse", function () {
    $(this).prev().addClass("active");
    $(this).prev().parent().addClass("active");
  });

  $("#accordion .collapse").on("hidden.bs.collapse", function () {
    $(this).prev().removeClass("active");
    $(this).prev().parent().removeClass("active");
  });

  $("#accordion").on("hide.bs.collapse show.bs.collapse", (e) => {
    $(e.target).prev().find("i:last-child").toggleClass("fa-plus fa-minus");
  });

  // window load event

  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }

    // swiper slider
    const swiperElm = document.querySelectorAll(".thm-swiper__slider");
    swiperElm.forEach(function (swiperelm) {
      const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
      let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
    });
  });

  // window load event

  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 130;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });
})(jQuery);
