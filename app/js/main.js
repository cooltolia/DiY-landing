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