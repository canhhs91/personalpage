$.getScript('js/modal.js');
$.fn.fixsize = function(){
    $(this).css({'height':  $(parentdiv).height(), 'width':  $(parentdiv).width()});
    return this;
}

const TRANSITION_INTERVAL = 3000;
var MAGIC_A, MAGIC_B, MAGIC_C;
var is_mouse_on_menu = false;
var auto_play = 0;
area = function(A, B, C) {
    return Math.abs(( A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y) ) / 2);
}


point_in_triangle = function(D, A, B, C) {
    var ABD = area(A, B, D);
    var BDC = area(B, D, C);
    var CAD = area(C, A, D);
    var ABC = area(A, B, C);
    if (ABC == (ABD + BDC + CAD)) {
        return true;
    }
    return false;
}


// function transition_to_album(){
//     auto_play = 0;
//     $('.album-transitioner-part').each(function(){
//         $(this).html('').append($('#homepage-slider').clone().attr('id', '').css({'width':$('#homepage-slider').width() , 'height': $('#homepage-slider').height()}).addClass('temp-cloner-1'));
//     })
//     $('.album-transitioner').css('z-index', 2 - $('.album-transitioner').css('z-index'));
//     $('.album-transitioner .album-transitioner-part').toggleClass('flipped');
// }
function show_album(album){
    console.log('//not available yet');
}


function init_images(){
    $('<div class="slide-image active" style="background-image: url(images/background-1.jpg);"></div>').appendTo($('.slide-images'));
    for (var i = 2; i < 30; i++) {
        $('<div class="slide-image" style="background-image: url(images/background-'+i+'.jpg);"></div>').appendTo($('.slide-images'));
    }
}
$(document).ready(function(){
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1000);
    init_images();
    // function transition(parentdiv, direction){
    //     $('.transition-canvas-wrapper', parentdiv).removeClass('open');
    //     wrapper_1 = $('.transition-canvas-wrapper.top', parentdiv);
    //     wrapper_2 = $('.transition-canvas-wrapper.bottom', parentdiv);
    //     $(wrapper_1).html('');
    //     $(wrapper_2).html('');
    //     $(wrapper_1).append($('.slide-image.active', parentdiv).clone().fixsize().removeClass('active'));
    //     $(wrapper_2).append($('.slide-image.active', parentdiv).clone().fixsize().removeClass('active'));
    //     if(direction == 'right'){
    //         next_slide = $('.slide-image.active', parentdiv).next('.slide-image');
    //         if (next_slide.length == 0) next_slide = $('.slide-image:first-child', parentdiv);
    //     }else{
    //         next_slide = $('.slide-image.active', parentdiv).prev('.slide-image');
    //         if (next_slide.length == 0) next_slide = $('.slide-image:last-child', parentdiv);
    //     }
    //
    //
    //     $('.slide-image.active', parentdiv).removeClass('active');
    //     $(next_slide).addClass('active');
    //     $('.transition-canvas-wrapper', parentdiv).addClass('open');
    //
    // }

    function transition(parentdiv, direction){
        $('.transition-canvas-wrapper', parentdiv).css('transition', 'none');
        if(direction == 'right'){
            $('.transition-canvas-wrapper', parentdiv).removeClass('open');
            setTimeout(function(){
                $('.transition-canvas-wrapper', parentdiv).css('transition', 'all 1s cubic-bezier(1,.01,.66,.8)');
            }, 1);
            wrapper_1 = $('.transition-canvas-wrapper.top', parentdiv);
            wrapper_2 = $('.transition-canvas-wrapper.bottom', parentdiv);
            $(wrapper_1).html('').show();
            $(wrapper_2).html('').show();
            var current_slide = $('.slide-image.active', parentdiv);
            var next_slide = current_slide.next('.slide-image');

            $(wrapper_1).append(current_slide.clone().fixsize().removeClass('active'));
            $(wrapper_2).append(current_slide.clone().fixsize().removeClass('active'));

            if (next_slide.length == 0) next_slide = $('.slide-image:first-child', parentdiv);

            next_slide.addClass('active');
            current_slide.removeClass('active');
            setTimeout(function(){
                $('.transition-canvas-wrapper', parentdiv).addClass('open');
            }, 1);
        }else{
            $('.transition-canvas-wrapper', parentdiv).addClass('open');
            setTimeout(function(){
                $('.transition-canvas-wrapper', parentdiv).css('transition', 'all 1s ease-out');
            }, 1);
            wrapper_1 = $('.transition-canvas-wrapper.top', parentdiv);
            wrapper_2 = $('.transition-canvas-wrapper.bottom', parentdiv);
            $(wrapper_1).html('').show();
            $(wrapper_2).html('').show();
            var current_slide = $('.slide-image.active', parentdiv);
            var next_slide = current_slide.prev('.slide-image');
            if (next_slide.length == 0) next_slide = $('.slide-image:last-child', parentdiv);


            $(wrapper_1).append(next_slide.clone().fixsize().removeClass('active'));
            $(wrapper_2).append(next_slide.clone().fixsize().removeClass('active'));



            setTimeout(function(){
                $('.transition-canvas-wrapper', parentdiv).removeClass('open');
            },1);
            setTimeout(function(){
                current_slide.removeClass('active');
                next_slide.addClass('active');
                $(wrapper_1).hide();
                $(wrapper_2).hide();
            }, 1000);
        }

    }
    parentdiv = $('.fullscreen-slider');
    interval = setInterval(function(){
        if(auto_play) transition(parentdiv[0], 'right');
    }, TRANSITION_INTERVAL);
    $('body').on('mousemove click', function(){
        window.clearInterval(interval);
        interval = setInterval(function(){
            if(auto_play) transition(parentdiv[0], 'right');
        }, TRANSITION_INTERVAL);
    })

    // $('.navigation-arrow', parentdiv).click(function(){
    //
    //     if($(this).hasClass('left-arrow')){
    //         transition(parentdiv[0], 'left');
    //     }else{
    //         transition(parentdiv[0], 'right');
    //     }
    // });

    parentdiv.on('click', function(e){
        if(e.clientX > $(this).width()/2){
            ga('send', 'event', 'gallery', 'next-image');
            transition(parentdiv[0], 'right');
        }else{
            ga('send', 'event', 'gallery', 'prev-image');
            transition(parentdiv[0], 'left');
        }

    }).on('mousemove', function(e){
        if(e.clientX > $(this).width()/2){
            $(this).css('cursor', 'e-resize');
        }else{
            $(this).css('cursor', 'w-resize');
        }

    });

    $('.main-menu > ul').on('mouseenter', function(e){
        is_mouse_on_menu = true;
    });

    $('.main-menu > ul').on('mouseleave', function(e){
        is_mouse_on_menu = false;
    });

    $('body').on('mousemove', function(e){
        if($(window).width() > 600 && $('.modal.show').length == 0){
            MAGIC_A = {x:$('.page-title span').offset().left + $('.page-title span').width()/2,y: 0};
            MAGIC_B = {x:$('.main-menu > ul').offset().left,y: $('.main-menu > ul').offset().top};
            MAGIC_C = {x:$('.main-menu > ul').offset().left + $('.main-menu > ul').outerWidth(), y:$('.main-menu > ul').offset().top};
            // $('#magic-triangle').attr('points', MAGIC_A.x +','+MAGIC_A.y +' '+MAGIC_B.x +','+MAGIC_B.y +' '+MAGIC_C.x +','+MAGIC_C.y +' ');
            var D = {x: e.pageX, y: e.pageY};
            if (is_mouse_on_menu || point_in_triangle(D, MAGIC_A, MAGIC_B, MAGIC_C)){
                $('.main-menu > ul, .page-title').addClass('show');
            }else{
                $('.main-menu > ul, .page-title').removeClass('show');
            }

        }
    })

    $('.page-title span').on('tap', function(){
        if($(window).width() < 600){
            $('.main-menu > ul, .page-title').toggleClass('show');
            $('.main-menu ul li').removeClass('open');
        }
    });
    $('.main-menu ul li > a').on('tap', function(){
        $(this).closest('li').toggleClass('open');
    });

    $('a').on('click', function(){
        ga('send', 'event', 'link-click', $(this).text());
    })
    $('body').on('tap', function(e) {
        // click_on_menu = $(e.target).closest('#main-menu').length;
        // click_on_title = $(e.target).closest('#page-title').length;
        // if(!click_on_title && !click_on_menu){
        //     $('.main-menu > ul, .page-title').removeClass('show');
        //     $('.main-menu ul li').removeClass('open');
        // }
    })
})
