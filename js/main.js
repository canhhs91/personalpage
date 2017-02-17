$.fn.fixsize = function(){
    $(this).css({'height':  $(parentdiv).height(), 'width':  $(parentdiv).width()});
    return this;
}

var MAGIC_A, MAGIC_B, MAGIC_C;
var is_mouse_on_menu = false;
var auto_play = 1;
area = function(A, B, C) {
    return Math.abs(( A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y) ) / 2);
}

pointInTriangle = function(D, A, B, C) {
    var ABD = area(A, B, D);
    var BDC = area(B, D, C);
    var CAD = area(C, A, D);
    var ABC = area(A, B, C);
    if (ABC == (ABD + BDC + CAD)) {
        return true;
    }
    return false;
}
function transition_to_album(){
    auto_play = 1 - auto_play;
    $('.album-transitioner-part').each(function(){
        $(this).html('').append($('#homepage-slider').clone().attr('id', '').css({'width':$('#homepage-slider').width() , 'height': $('#homepage-slider').height()}).addClass('temp-cloner-1'));
    })
    $('.album-transitioner').css('z-index', 2 - $('.album-transitioner').css('z-index')).toggleClass('flipped');

    setTimeout(function(){
        auto_play = 1;
    }, 5000);
}
$(document).ready(function(){
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1000);

    function transition(parentdiv){
        wrapper_1 = $('.transition-canvas-wrapper.top', parentdiv);
        wrapper_2 = $('.transition-canvas-wrapper.bottom', parentdiv);
        $(wrapper_1).html('');
        $(wrapper_2).html('');
        $(wrapper_1).append($('.slide-image.active', parentdiv).clone().fixsize().removeClass('active'));
        $(wrapper_2).append($('.slide-image.active', parentdiv).clone().fixsize().removeClass('active'));
        next_slide = $('.slide-image.active', parentdiv).next('.slide-image');
        if (next_slide.length == 0) next_slide = $('.slide-image:eq(0)', parentdiv);
        $('.slide-image.active', parentdiv).removeClass('active');
        $(next_slide).addClass('active');
    }
    parentdiv = $('.fullscreen-slider');
    interval = setInterval(function(){
        if(auto_play) $('.navigation-arrow.left-arrow', parentdiv).click();
    }, 5000);
    $('body').on('mousemove click', function(){
        window.clearInterval(interval);
        interval = setInterval(function(){
            if(auto_play) $('.navigation-arrow.left-arrow',parentdiv).click();
        }, 5000);
    })

    $('.navigation-arrow', parentdiv).click(function(){
        $('.transition-canvas-wrapper', parentdiv).removeClass('open');
        transition(parentdiv[0]);
        $('.transition-canvas-wrapper', parentdiv).addClass('open');

    })
    $('.main-menu > ul').on('mouseenter', function(e){
        is_mouse_on_menu = true;
    });

    $('.main-menu > ul').on('mouseleave', function(e){
        is_mouse_on_menu = false;
    });
    if($(window).width() > 600){
        $('.header').on('mousemove', function(e){
            MAGIC_A = {x:$('.page-title span').offset().left + $('.page-title span').width()/2,y: 0};
            MAGIC_B = {x:$('.main-menu > ul').offset().left,y: $('.main-menu > ul').offset().top};
            MAGIC_C = {x:$('.main-menu > ul').offset().left + $('.main-menu > ul').outerWidth(), y:$('.main-menu > ul').offset().top};
            // $('#magic-triangle').attr('points', MAGIC_A.x +','+MAGIC_A.y +' '+MAGIC_B.x +','+MAGIC_B.y +' '+MAGIC_C.x +','+MAGIC_C.y +' ');
            var D = {x: e.pageX, y: e.pageY};
            if (is_mouse_on_menu || pointInTriangle(D, MAGIC_A, MAGIC_B, MAGIC_C)){
                $('.main-menu > ul, .page-title').addClass('show');
            }else{
                $('.main-menu > ul, .page-title').removeClass('show');
            }
        })
    }else{
        $('.page-title span').on('click', function(){
            $('.main-menu > ul, .page-title').toggleClass('show');
        });

        $('body').on('click', function(e) {
            click_on_menu = $(e.target).closest('#main-menu').length;
            click_on_title = $(e.target).closest('#page-title').length;
            if(!click_on_title && !click_on_menu){
                $('.main-menu > ul, .page-title').removeClass('show');
            }
        })


    }

})
