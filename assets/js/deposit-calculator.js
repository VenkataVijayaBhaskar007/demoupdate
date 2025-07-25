if ($("#deposit-calculator").length) {
  jQuery(function ($) {
      function formatINR(x) {
          return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      // Initialize sliders
      $("#deposit-amount-slide").slider({
          range: "min",
          min: 10000,
          max: 1000000,
          value: 100000,
          step: 1000,
          slide: function (event, ui) {
              $("#deposit-amount").text(ui.value);
              calculateFD();
          }
      });

      $("#deposit-amount").text($("#deposit-amount-slide").slider("value"));

      $("#deposit-tenure-slide").slider({
          range: "min",
          min: 1,
          max: 5,
          value: 2,
          step: 1,
          slide: function (event, ui) {
              $("#deposit-tenure").text(ui.value);
              calculateFD();
          }
      });

      $("#deposit-tenure").text($("#deposit-tenure-slide").slider("value"));

      $("#deposit-interest-slide").slider({
          range: "min",
          min: 1,
          max: 12,
          step: 0.1,
          value: 6.5,
          slide: function (event, ui) {
              $("#deposit-interest").text(ui.value);
              calculateFD();
          }
      });

      $("#deposit-interest").text($("#deposit-interest-slide").slider("value"));

      // FD Calculation
      function calculateFD() {
          const principal = parseFloat($("#deposit-amount").text());
          const years = parseInt($("#deposit-tenure").text());
          const rate = parseFloat($("#deposit-interest").text());

          const maturityAmount = principal * Math.pow((1 + rate / 100), years);
          const monthlyPayout = maturityAmount / (years * 12);

          $("#loan-total").text(formatINR(maturityAmount));
          $("#loan-monthly-pay").text(formatINR(monthlyPayout));
      }

      calculateFD();
  });
}
