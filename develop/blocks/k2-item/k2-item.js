var prod = new bem('k2-item');


//* клик куплено */
$(prod.e("cart")).on("click", function(){

    var prod_single = prod.single(this);
    var $popup = prod_single.JQe("popup-cart"); //popup
    var thisProdId = prod_single.JQb().attr("prodid");

    var idAdded = prod_single.JQb().hasClass(prod_single._bm("added-to-cart"));
    if( idAdded )  return; // если товар добавлен уже

    // пролетание картинки
    prod_single.JQe("img")
        .clone()
        .css({'position' : 'absolute', 
            'z-index' : '11100', 
            'height' : 'auto',
            'opacity' : '0.8',
            top: $(this).offset().top-285, 
            left:$(this).offset().left-145})
        .appendTo("body")
        .animate({opacity: 0.05,
            left: $(".cart").offset()['left'],
            top: $(".cart").offset()['top'],
            width: 20}, 500, function() {
                $(this).remove();
            });



    $popup.show(); //показываем
    $("#pr-"+thisProdId).addClass(prod_single._bm("added-to-cart")); //модификатор куплено
    $("#pr-"+thisProdId+"-m").addClass(prod_single._bm("added-to-cart")); //модификатор куплено

    /* сохраняем кукисы */
    var added_prods = {}; //обьект созраняемый в кукисы
    var ii = 0;
    


    $(prod.bm("added-to-cart")).each(function(){

        var prod_single = prod.single(this);
        var id = $(this).attr("id"); //идшник
        var thisProdId = prod_single.JQb().attr("prodid");

        if(added_prods[thisProdId] != undefined) return;

        added_prods[thisProdId] = {
            id : id, //идшник
            name : prod_single.JQe("title").html().trim(), //наименвание прод
            cost : prod_single.JQe("price").html().trim(), //цена
            count : prod_single.mix("prod-counter", "productcounter").JQe("counter").val(), //кол-во
            img : prod_single.JQe("img").attr("src") //картинка
        };

        ii ++;        
    });
    $.cookie('added_prods', JSON.stringify(added_prods));
    /* сохраняем кукисы */

    cartChange(); //корзна была изменна
    
    setTimeout(function(){ $popup.hide(); }, 2000); //скрываем попап
}); 
//* клик куплено */


/* из кукисов активируем проданное */
var added = JSON.parse($.cookie('added_prods'));
if(added != null || added != undefined)
    $.each(added, function(thisProdId, value){

        // var thisProdId = index;
        $("#pr-"+thisProdId).addClass(prod._bm("added-to-cart")); //модификатор куплено
        $("#pr-"+thisProdId+"-m").addClass(prod._bm("added-to-cart")); //модификатор куплено

    });
/* --из кукисов активируем проданное-- */



/* если высплывающая корзина выходит за граниу экрана поправим ее */
var popup_cart = prod.mix("popup-cart"); //получаем высплывающею корзины все

$popup_cart = popup_cart.JQb();

$popup_cart.each(function(){
    var popup_cart_single = popup_cart.single(this);
    var offs = popup_cart_single.JQb().offset();
    var l = offs.left;
    var w =  popup_cart_single.JQb().outerWidth();
    if((l + w ) > window.innerWidth)
    {
        var ml = -1*((l + w + 20) - window.innerWidth);
        popup_cart_single.JQb().css("margin-left", ml);
        popup_cart_single.JQe("treangle").css("margin-right", ml);

    }
});
/* --если высплывающая корзина выходит за граниу экрана поправим ее-- */

//прячем все всплыающие кона
prod.JQe("popup-cart").hide();