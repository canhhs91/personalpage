$.fn.fixsize = function(){
    $(this).css({'height':  $(parentdiv).height(), 'width':  $(parentdiv).width()});
    return this;
}

var MAGIC_A, MAGIC_B, MAGIC_C;
var is_mouse_on_menu = false;
var auto_play = true;
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

$(document).ready(function(){
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1000);

    function transition(parentdiv){
        wrapper_1 = $('.transition-canvas-wrapper.top', parentdiv);
        wrapper_2 = $('.transition-canvas-wrapper.bottom', parentdiv);
        $(wrapper_1).html('');
        $(wrapper_2).html('');
        $(wrapper_1).append($('.slide-image.active').clone().fixsize().removeClass('active'));
        $(wrapper_2).append($('.slide-image.active').clone().fixsize().removeClass('active'));
        next_slide = $('.slide-image.active', parentdiv).next('.slide-image');
        if (next_slide.length == 0) next_slide = $('.slide-image:eq(0)', parentdiv);
        $('.slide-image.active').removeClass('active');
        $(next_slide).addClass('active');
    }
    parentdiv = $('.fullscreen-slider');
    interval = setInterval(function(){
        if(auto_play) $('.navigation-arrow.left-arrow').click();
    }, 5000);
    $('body').on('mousemove click', function(){
        window.clearInterval(interval);
        interval = setInterval(function(){
            if(auto_play) $('.navigation-arrow.left-arrow').click();
        }, 5000);
    })

    $('.navigation-arrow').click(function(){
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
    if($(window).width > 600){
        $('.header').on('mousemove', function(e){
            MAGIC_A = {x:$('.page-title span').offset().left + $('.page-title span').width()/2,y: 0};
            MAGIC_B = {x:$('.main-menu > ul').offset().left,y: $('.main-menu > ul').offset().top};
            MAGIC_C = {x:$('.main-menu > ul').offset().left + $('.main-menu > ul').outerWidth(), y:$('.main-menu > ul').offset().top};
            // $('#magic-triangle').attr('points', MAGIC_A.x +','+MAGIC_A.y +' '+MAGIC_B.x +','+MAGIC_B.y +' '+MAGIC_C.x +','+MAGIC_C.y +' ');
            var D = {x: e.pageX, y: e.pageY};
            if (is_mouse_on_menu || pointInTriangle(D, MAGIC_A, MAGIC_B, MAGIC_C)){
                $('.main-menu > ul').addClass('show');
            }else{
                $('.main-menu > ul').removeClass('show');
            }
        })
    }else{
        $('.page-title span').on('tap', function(){
            $('.main-menu > ul').toggleClass('show');
        });

        $('body').on('tap', function(e) {
            click_on_menu = $(e.target).closest('#main-menu').length;
            click_on_title = $(e.target).closest('#page-title').length;
            if(!click_on_title && !click_on_menu){
                $('.main-menu > ul').removeClass('show');
            }
        })


    }

})
