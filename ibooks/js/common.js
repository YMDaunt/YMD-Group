    /* 
     * 导航栏的border-bottom临界消失
     */
    if ($(window).scrollTop() >= 400) {
        $('.head').css({
            'border-bottom' : 0
        })
    }
    /*
     * 功能：图片滚动
     * 参数：eleShow(内容区), eleChild(滚动的对象), eleCon(显示区), num(内容超出值), eleWidth(滚动对象宽度), btnl(左按钮)，btnr(右按钮)
     * 作者：张剑辉、杨敏达
     */
    function imgScroll(eleShow, eleChild, eleCon, num, eleWidth, btnl, btnr) {
        var step = 1;
        var timer1 = null;
        var timer2 = null;     
        function slipt() {
            $(eleShow)[0].innerHTML += $(eleShow)[0].innerHTML;
            var len = $(eleShow).find(eleChild).length;
            $(eleShow).width(len * eleWidth - num + 'px');
            $(eleCon).width(len / 2 * eleWidth - num + 'px');
            timer1 = setInterval(move, 20);
        }slipt();

        function move(){
            $(eleCon)[0].scrollLeft += step;
            if ($(eleCon)[0].scrollLeft % eleWidth == 0) {
                clearInterval(timer1);
                timer2 = setTimeout(function(){
                    timer1 = setInterval(move,20)
                },2000)
            };
            if (step > 0) {
                if ($(eleCon)[0].scrollLeft == $(eleShow)[0].offsetWidth - $(eleCon)[0].clientWidth) {
                    $(eleCon)[0].scrollLeft = 0;
                };
            } else {
                if ($(eleCon)[0].scrollLeft == 0) {
                    $(eleCon)[0].scrollLeft = $(eleShow)[0].offsetWidth - $(eleCon)[0].clientWidth;
                };
            }
        }
        $(eleShow).on('mouseover', function(){
            clearInterval(timer1);
        })
        $(eleShow).on('mouseout', function(){
            if (timer2) {
                clearTimeout(timer2);
            };
            timer1 = setInterval(move,20);
        })

        $(btnl).on('click', function() {
            if (timer1) {
                clearInterval(timer1);
            };
            if (timer2) {
                clearTimeout(timer2);
            };
            step = 1;
            timer1 = setInterval(move,20);
        })
        $(btnr).on('click', function() {
            if (timer1) {
                clearInterval(timer1);
            };
            if (timer2) {
                clearTimeout(timer2);
            };
            step = -1;
            timer1 = setInterval(move,20);
        })
    }

    /*
     * 功能：大图渐变效果
     * 参数：imgparent：img的父级， bord：蒙版,  btnLeft：左按钮
     *       btnRight：右按钮， img：获取大图的图片标签
     * demo: changeImg('.min-pics div', 'p', '.our-btnl', '.our-btnr', '.our-out img');
     * 负责人：吴肖琪
     */
    function changeImg(imgparent, bord, btnLeft, btnRight, img){
        var mark = 0; 
        var maxMark = $(imgparent).length;
        var nowClick = null;
        var btnClick = false;
        var timer = setInterval(change, 4000);
        // 缩略图鼠标移入、移出
        $(imgparent).hover(function(){
            $(this).children(bord).css('display', 'none');
        }, function(){
            if ($(this).index() != nowClick) {
                $(this).children(bord).css('display', 'block');
            }
            if (nowClick != null) {
                nowClick = null;
                mark++;
                if (mark >= maxMark) {
                    mark = 0;
                }
                change();
                timer = setInterval(change, 4000);      
            }
        })
        // 缩略图鼠标点击事件
        $(imgparent).click(function(){
            clearTimeout(timer);
            mark = $(this).index();
            $(this).children(bord).css('display', 'none');
            $(this).siblings().children(bord).css('display', 'block');
            $(img).eq(mark).stop(true).fadeIn(2000).siblings('img').stop(true).fadeOut(2000);
            nowClick = $(this).index();
        })
        // 左按钮移入、移出事件
        $(btnLeft).hover(function(){
            $(this).css('background', 'url("../images/scroll.png") -11px -49px');
        }, function(){
            $(this).css('background', 'url("../images/scroll.png") -11px -7px');
            if (btnClick) {
                btnClick = false;      
                mark += 2;
                if (mark >= maxMark) {
                    mark = 0;
                }
                change();
                timer = setInterval(change, 4000);      
            }
        })
        // 右按钮移入、移出事件
        $(btnRight).hover(function(){
            $(this).css('background', 'url("../images/scroll.png") -63px -49px');
        }, function(){
            $(this).css('background', 'url("../images/scroll.png") -63px -7px');
            if (btnClick) {
                btnClick = false;      
                change();
                timer = setInterval(change, 4000);      
            }
        })
        // 左按钮点击事件
        $(btnLeft).click(function(){
            clearTimeout(timer);
            if (!btnClick) {
                mark -= 2;
            }
            if (mark < 0) {
                mark = maxMark - 1;
            }
            $(imgparent).eq(mark).children(bord).css('display', 'none');
            $(imgparent).eq(mark).siblings().children(bord).css('display', 'block');
            $(img).eq(mark).stop(true,true).fadeIn(2000).siblings('img').stop(true,true).fadeOut(2000);
            mark--;
            if ( mark >= maxMark) {
                mark = 0;
            }  
            btnClick = true;
        })
        // 右按钮点击事件
        $(btnRight).click(function(){
            clearTimeout(timer);
            if (mark >= maxMark) {
                mark = 0;
            }
            $(imgparent).eq(mark).children(bord).css('display', 'none');
            $(imgparent).eq(mark).siblings().children(bord).css('display', 'block');
            $(img).eq(mark).stop(true,true).fadeIn(2000).siblings('img').stop(true,true).fadeOut(2000);
            mark++;
            if ( mark >= maxMark) {
                mark = 0;
            }
            btnClick = true;
        })
        // 主功能函数
        function change() {
            $(imgparent).eq(mark).children(bord).css('display', 'none');
            $(imgparent).eq(mark).siblings().children(bord).css('display', 'block');
            $(img).eq(mark).stop(true,true).fadeIn(2000).siblings('img').stop(true,true).fadeOut(2000);
            mark++;
            if ( mark >= maxMark) {
                mark = 0;
            }
        }
        change();
    }

    /*
     * 功能：自动根据父级定位居中
     * 参数：ele：自身元素
     *       prop：定位属性（left | right | top | bittom）
     * demo: position('.detial-pic span', 'left')
     * 负责人：吴肖琪
     */
    function position(ele, prop) {
        if (prop == 'left' || prop == 'right') {
            $(ele).css({
                'left' :  ($(ele).parent().width() - $(ele).width()) / 2 + 'px'
            })
        } else {
            $(ele).css({
                'top' :  ($(ele).parent().height() - $(ele).height()) / 2 + 'px'
            })
        }
    }

    /*
     * 功能：多行超出省略号
     * 参数：ele: 元素 （JQ获取元素的方式）
     *       num: 最多的字符长度（不包括num）
     * demo: ellipsis('.con-left p a', 130);
     * 负责人: 吴肖琪        
     */
    function ellipsis(ele, num) {
        $(ele).each(function(){
            $(this)[0].innerHTML = $(this)[0].innerHTML.slice(0, num) + '...';
        });
    }

    /*
     * 功能：返回顶部
     * 参数：id: 元素的ID名
     * demo: backTop('top');
     * 负责人: 张剑辉        
     */
    function backTop(id) {
        var top = document.getElementById(id);
        var timer = null;
        var scrollTopVal = document.documentElement.scrollTop + document.body.scrollTop;
        var scrolled = false;

        function move() {
            scrollTopVal = document.documentElement.scrollTop + document.body.scrollTop;
            scrollTopVal -= Math.ceil(scrollTopVal / 20);
            if (scrollTopVal <= 0) {
                clearInterval(timer);
                scrollTopVal = 0;
                document.onmousewheel = function() {
                    return true;
                }

            }
            if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop = scrollTopVal;
            } else {
                document.body.scrollTop = scrollTopVal;
            }

        }
        top.onclick = function() {
            if (scrolled == false) {
                if (timer) {
                    clearInterval(timer);
                };
                timer = setInterval(move, 20);
                document.onmousewheel = function() {
                    return false;
                }
                
            } 
        }
    }


    /*
     * 功能：HTML5就业明星、项目展示tab切换 
     * 参数：btnL: 左按钮  btnR: 右按钮   ele: 要切换的元素 
     * demo: tabChange('.star-btnl', '.star-btnr', '.star-con ul'); 
     * 负责人：吴肖琪
     */

    function tabChange(btnL, btnR, ele) {
        var mark = 0; // 判断当前显示的是第几个ul
        $(btnL).click(function(){
            mark--;
            if (mark < 0) {
                mark = $(ele).length - 1;
                $(ele).eq(mark).siblings().css('display', 'none');
            } else {
                $(ele).eq(mark).css('display', 'block');
            }
        })
        $(btnR).click(function(){
            if (mark + 1 > $(ele).length - 1) {
                mark = 0;
                $(ele).css('display', 'block');
            } else {
                $(ele).eq(mark).css('display', 'none');
                 mark++;
            }
        })
    }


    /*
     * 功能：鼠标移入、移出li改变数字的背景颜色
     *       下拉按钮点击事件
     * 负责人：吴肖琪
     */
    function wuUl() {
        var li = $('.public_list_ul').children();
        var mark = false; // 判断是否点击了下拉按钮

        // 鼠标移入、移出li改变数字的背景颜色
        $('.public_list li').hover(function(){
                $(this).children('div').css('background', '#ffa18f')
            }, function(){
                $(this).children('div').css('background', '#bebebe')
            })

    // 判断是否要出现下拉按钮
        if (li.length < 6) {
            $('.public_list h3').css('display', 'none');
        } 
        else {
            $('.public_list h3').css('display', 'block');

            // 下拉按钮的点击事件
            $('.public_list h3 span').click(function(){

                if (!mark) { // 判断是否点击了下拉按钮
                    $('.public_list_ul').animate({
                    'height' : $('.public_list_ul').children().length * 38 + 'px'
                    }, 1000, function(){
                        $('.public_list h3 span').css('background', 'url("../images/public_list.png") -114px -21px');
                        mark = true;
                    })
                } else {
                    $('.public_list_ul').animate({
                    'height' : 190 + 'px'
                    }, 1000, function(){
                        $('.public_list h3 span').css('background', 'url("../images/public_list.png") -66px -19px');
                        mark = false;
                    })
                }
            })
        }
    } 
