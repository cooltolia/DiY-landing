//slider 

$('.slider__slides').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
     
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ] 
});
  

$('.adv-slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40px',
  });

// promo

var feedback = $(".promo__btn");
var feedbackClose = $(".feedback__close");

feedback.click(function(e) {
  e.preventDefault();
  $(".feedback").show(200);
});

feedbackClose.click(function() {
   $(".feedback").hide(200);
});

// form submit

var form1 = $(".form--vendor");
var formSubmit1 = form1.find(".form__submit");
var formPopUp1 = $(".form-modal--vendor");
var form2 = $(".form--byer");
var formSubmit2 = form2.find(".form__submit");
var formPopUp2 = $(".form-modal--byer");
var formPopUpClose1 = formPopUp1.find(".form-modal__close");
var formPopUpClose2 = formPopUp2.find(".form-modal__close");

formSubmit1.click(function(e) {
  formPopUp1.show(500);
});

formPopUpClose1.click(function(e) {
  formPopUp1.hide(500);
});

formSubmit2.click(function(e) {
  formPopUp2.show(500);
});

formPopUpClose2.click(function(e) {
  formPopUp2.hide(500);
});


// отправка формы

 $('.f-ajax').on('submit', function(event){
  event.preventDefault();
  var $form = $(this);

  $.ajax({
    url: $form.attr("action"),
    type: 'POST',
    data: $form.serialize(),
    success: function(result) {
      if(result == "OK"){}
      else
        alert("Произошла ошибка!");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("Произошла ошибка!");
    }
  });
});
