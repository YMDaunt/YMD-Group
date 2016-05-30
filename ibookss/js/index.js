

/*
 * 功能：页面收缩、还原
 * 作者：姑姑
 */

// 获取高度，存入数组
var pagesHeight = [];  
$('.btn-up').each(function(){
    pagesHeight.push($(this).parent().height());
})

// 获取模块页索引值
var i = 0;
// 自定义索引，并且赋值给每一个对象元素
$('.wrap').find('.btn-down').each(function(){
    $(this)[0].num = i;
    i++;
});

$('.btn-up').on('click', function(){
    $(this).parent().stop(true).animate({
       'height' : "120"
    },500)
    $(this).siblings('.md').slideUp(500)
    $(this).siblings('.btn-down').css({
        'display' : 'block'
    })
})
$('.btn-down').on('click', function(){
    $(this).parent().stop(true).animate({
       'height' : pagesHeight[$(this)[0].num]
    },500)
    $(this).siblings('.md').slideDown(500);
    $(this).css({
        'display' : 'none'
    })
    $(this).siblings('.btn-up').css({
        'display' : 'block'
    })
})


/*
 * 功能：就业现状内容切换
 * 作者：姑姑
 */

var conLen = $('.con-coms').children().length;
var conIndex = 0; // 内容索引

function conTab() {
    $('.con-coms').children().css({
        'display' : 'none'
    });
    $('.con-coms').children().stop(true,true).eq(conIndex).fadeIn(1000);
}

$('.con-btnr').on('click', function(){
    conIndex++;
    if (conIndex >= conLen) {
        conIndex = 0;
    };
    conTab();
})

$('.con-btnl').on('click', function(){
    conIndex--;
    if (conIndex < 0) {
        conIndex = conLen - 1;
    };
    conTab();
})


/*
 * 功能：首页讲师小列表滚动 + tab淡入切换
 * 作者：姑姑
 */

// 调用图片滚动
imgScroll('#teasul', 'li', '#teas', 0, 171, '.tea-btnl', '.tea-btnr');
$('#teasul').children().on('click', function(){
    i = $(this).index();
    $('.tea-con').children().eq(i).siblings().css({
        'display' : 'none'
    })
    $('.tea-con').children().eq(i).slideDown(1000);
})



var winScroll = $(window).scrollTop();
console.log(winScroll);



