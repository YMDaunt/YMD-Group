// 讲师列表滚动
imgScroll('#teasul', 'li', '#teas', 0, 171, '.tea-btnl', '.tea-btnr');

$(function(){
    var imgs = $('.tea-cons').children('div');
    var i = 0;
    var len = imgs.length;
    var timer3 = setInterval(show, 3000);
    function show() {
        if (timer3) {
            clearInterval(timer3);
        };
        i = i + 1;
        if (i >= len) {
            i = 0;
        };
        $('.tea-cons .tea-out').eq(i).fadeIn(3000).siblings().fadeOut(3000);
        // $('.round-btn ul li').eq(i).addClass('round-select').siblings().removeClass('round-select');
        timer3 = setInterval(show, 3000);
    }
    function move() {
        if(i <= -1){
            i = len-1;
        } else if(i >= len){
            i = 0;
        }
        $('.tea-cons .tea-out').eq(i).stop(true).fadeIn(1000).siblings().stop(true).fadeOut(1000);
        timer3 = setInterval(show, 3000);
    }

    $('.line-btn li').on('click', function(){
        if (timer3) {
            clearInterval(timer3);
        };
        if($(this).index() == 0) {
            i--;
            move();
        } else {
            i++;
            move();
        }
    })
})
