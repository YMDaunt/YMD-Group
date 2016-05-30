
/*
 * 功能：滚动切换
 * 参数：ele1(子元素)，scrlooEle1(顶部切换内容)，scrollEle2(底部切换内容)，allShow（上、下显示区），allCon（上、下内容区），num（滚动超出值）
 * 负责人：张建辉、 吴肖琪、 杨敏达
 */

function imgDbScroll(ele1, scrollEle1, scrollEle2, allShow, allCon, con1, con2, num, btnL, btnR) {
        function init() {
            var unitLen = $(ele1)[0].offsetWidth + num;
            $(scrollEle1)[0].innerHTML +=  $(scrollEle1)[0].innerHTML;
            $(scrollEle2)[0].innerHTML +=  $(scrollEle2)[0].innerHTML;
            var len = $(scrollEle1).find(ele1).length;
            $(allShow).width(len / 2 * unitLen - num + 'px');
            $(allCon).width(len * unitLen + 'px');
        }init();
        var scrollValue = 0;
        $(btnL).on('click', function(){
            scrollValue = $(con1).scrollLeft() + $(con1).width() + num;
            if(scrollValue >= $(scrollEle1)[0].offsetWidth - $(con1)[0].clientWidth) {
                scrollValue = 0;
            }
            $(con1).stop(true,true).animate({
              'scrollLeft' : scrollValue
            }, 1000);
            $(con2).stop(true,true).animate({
              'scrollLeft' : scrollValue
            }, 1000);
        })
        $(btnR).on('click', function(){
            scrollValue = $(con2).scrollLeft() + $(con2).width() + num;
            if(scrollValue >= $(scrollEle1)[0].offsetWidth - $(con1)[0].clientWidth) {
                scrollValue = 0;
            }
            $(con1).stop(true,true).animate({
                'scrollLeft' : scrollValue
            }, 1000)
            $(con2).stop(true,true).animate({
                'scrollLeft' : scrollValue
            }, 1000);
        })
    }