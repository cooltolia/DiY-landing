$(b('buttonflip')).each(function(){
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

