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




// отправка формы

 $('.f-ajax').on('submit', function(event){
  event.preventDefault();
  var $form = $(this);
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

  $.ajax({
    url: $form.attr("action"),
    type: 'POST',
    data: $form.serialize(),
    success: function(result) {
      if(result == "OK"){
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
      }
      else
        alert("Произошла ошибка!");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("Произошла ошибка!");
    }
  });
});


// Флипающая кнопка

$(".promo__btn").bind(function(){
  var buttonflip = this; 

  var buttonflipFront = buttonflip.querySelector( '.buttonflip-front' ),
    // buttonflipYes = buttonflip.querySelector( '.buttonflip-back .yes' ),
    buttonflipNo = buttonflip.querySelector( '.buttonflip-back .no' );

    
    buttonflipFront.addEventListener( 'click', function( event ) {
      // var buttonflipRealOffset = cumulativeOffset(buttonflipFront);
      var buttonflipRealOffset = $(buttonflipFront).offset();

      /* x and y of click */
      var clickX=0, clickY=0;

        if ((event.clientX || event.clientY) &&
         document.body &&
         document.body.scrollLeft!=null) {
          clickX = event.clientX + document.body.scrollLeft;
        clickY = event.clientY + document.body.scrollTop;
        }else
        if ((event.clientX || event.clientY) &&
         document.compatMode=='CSS1Compat' && 
         document.documentElement && 
         document.documentElement.scrollLeft!=null) {
          clickX = event.clientX + document.documentElement.scrollLeft;
        clickY = event.clientY + document.documentElement.scrollTop;
      }else
      if (event.pageX || event.pageY) {
        clickX = event.pageX;
        clickY = event.pageY;
      }
      /* x and y of click */


  var mx = clickX - buttonflipRealOffset.left,
  my = clickY - buttonflipRealOffset.top;

  var w = buttonflip.offsetWidth,
  h = buttonflip.offsetHeight;

  var directions = [
  { id: 'top', x: w/2, y: 0 },
  { id: 'right', x: w, y: h/2 },
  { id: 'bottom', x: w/2, y: h },
  { id: 'left', x: 0, y: h/2 }
  ];

  directions.sort( function( a, b ) {
    return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
  } );

  buttonflip.setAttribute( 'data-direction', directions.shift().id );
  buttonflip.classList.add( 'is-open' );

  $bfback = $(buttonflip).children('.buttonflip-back');
  buttonflipBackRealOffset = cumulativeOffset($bfback[0]);

  if((buttonflipBackRealOffset.left + 520 ) > window.innerWidth)
  {
    var ml = (buttonflipBackRealOffset.left + 520  ) - window.innerWidth;
    $(buttonflip).css("margin-left", -1*( ml + 25))
  }

} );



    $(e('close')).click( function( event ) {
      b('buttonflip');
      $bflip = $(this).closest(b());
      $bflip.removeClass( 'is-open' );
      $bflip.removeAttr('style');
    } );

    // buttonflipYes.addEventListener( 'click', function( event ) {   
    //   buttonflip.classList.remove( 'is-open' );
    // } );

    // buttonflipNo.addEventListener( 'click', function( event ) {
    //   buttonflip.classList.remove( 'is-open' );
    // } );
  });

function distance( x1, y1, x2, y2 ) {
  var dx = x1-x2;
  var dy = y1-y2;
  return Math.sqrt( dx*dx + dy*dy );
}

$(document).ready(function(){
 
 var el_top = $(".wp:first-of-type").offset().top; //первый в типе. нам надо один эл. взять для опдерелния ывсоты  ширниы
 var el_bottom = $(".wp:first-of-type").offset().top + $(".wp:first-of-type").height();

$(window).on('scroll', function(){
   var bottomPos = $(window).scrollTop() + $(window).height();// топ + высота
   
   if(bottomPos > el_top + 50  && $(window).scrollTop() < el_bottom){
     var interval = 0; //эта перменнная на каждой итерации each увеличиваеться на знаяение delay таким образом превый эл. загрузться через 0 сек вторй 0 + delay тертий 0 + delay + delay
     var delay = 1000;
     $(".wp").each(function(){
       var self = this; //это нужно для передачи контекста в замыкание
       setTimeout(function(){console.log(interval); $(self).addClass("active")}, interval); //вфзов замыкания с задержкой
       interval += delay;
       
     });
   }
   
   if(bottomPos < el_top + 50 || $(window).scrollTop() > el_bottom){ //если нижняя часть экрана ниже вархней части эелмента с заступом 50 или верхняя часть экрана ниже низа элмента
     $(".wp").removeClass("active");
   }
     //alert();
 });
});
