function show_modal(){
    $('.navigation-arrow').hide();
    $('.modal').css({
        'top': '',
        'left': '',
        'width': '',
        'height': ''
    }).addClass('show');
    $('.modal-bg').addClass('show');
}
function hide_modal(){
    $('.navigation-arrow').show();
    $('.modal-bg').removeClass('show');
    $('.modal.show').removeClass('show');
}

$('document').ready(function(){
    $('<div class="modal-bg" />').appendTo($('body'));
    $('.modal-bg, .modal-close-btn').on('click', function(){
        hide_modal();
    });


});
