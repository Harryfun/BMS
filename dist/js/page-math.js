$( function(){
    // 侧边栏active展开状态
    // var slideBarActive = (function(){
    //     $(".submenu li").each(function(i){
    //         var sliderBarLi = $(this).text();
    //         var slideBarName = $(".slidebarname").text();
    //         if(sliderBarLi === slideBarName && !$(this).hasClass("active")){
    //             $(this).addClass("active");
    //             $(".submenuparent").removeClass("submenu-open");
    //             $(this).closest(".submenuparent").addClass("submenu-open");
    //         }
    //     });
    // }());
    // 滑动展开
    var slideList = (function(){
        $(".list-unstyled li").filter(':not(:first-child)').hide();
        var num = 0;
        $(document).on('click','.list-unstyled', function(){
            num++;
            if (num%2) {
                $(this).find('li').filter(':hidden').slideDown();
                 $(this).find(".glyphicon").removeClass("glyphicon-menu-down");
                $(this).find(".glyphicon").addClass("glyphicon-menu-up");
            }else {
                $(this).find('li').filter(':not(:first-child)').slideUp();
                $(this).find(".glyphicon").removeClass("glyphicon-menu-up");
                $(this).find(".glyphicon").addClass("glyphicon-menu-down");
            }
        });
    }());

    // 切换左边栏
    $('.toggle-sidebar').on('click',function(){
        if ($(this).find('i').hasClass('glyphicon-menu-left')) {
            $(this).css({
                right: '-16px',
                top: '12px'
            });
            $(this).find('.glyphicon').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
            $('.sidebar').animate({'left':'-240px'});
            $('.mainer').animate({
                marginLeft: 0,
                width: '100%'
            });
        }else {
            $(this).css({
                right: '10px',
                top: '0'
            });
            $(this).find('.glyphicon').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
            $('.sidebar').animate({'left':0});
            $('.mainer').animate({
                marginLeft: '240px',
                width: '-=240px'
            });
        }
    });

    // 提示文字
    $(".tip-text").popover({
        html: true
    });        
}); 

