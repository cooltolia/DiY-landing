//slider 

$('.slider__slides').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
   
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
      }
    }
  ]
  });


// promo

var feedback = $(".promo__btn");
var feedbackClose = $(".feedback__close");

feedback.click(function(e) {
  e.preventDefault();
  $(".feedback").addClass("feedback--active");
});

feedbackClose.click(function() {
   $(".feedback").removeClass("feedback--active");
});