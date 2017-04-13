var $attribute = $('[data-smart-affix]');
$attribute.each(function(){
  $(this).affix({
    offset: {
      top: $(this).offset().top,
    }
  })
})
$(window).on("resize", function(){
  $attribute.each(function(){
    $(this).data('bs.affix').options.offset = $(this).offset().top
  })
})