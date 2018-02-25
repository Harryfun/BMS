(function(){
    jQuery(function($){
        var wrapper = $('.wrapper');
        var sidebar = $('.sidebar');
        
        var submenu     = sidebar.find('.submenu');
        var sidebarMenu = sidebar.find('.sidebar-menu');
        var sidebarHide = wrapper.hasClass('sidebar-hide');
        var btnOpenall  = $('.btn-openall');

        var editBtns      = $('.edit-btns');
        var btnCalaEdit   = $('.kncatalog .edit-btns').find('.btn-edit');
        var btnCalaSave   = $('.kncatalog .edit-btns').find('.btn-save');
        var btnCalaCancel = $('.kncatalog .edit-btns').find('.btn-cancel');
        var btnCalabar    = $('.catalog-edit-bar');

        var qListWrap = $( '.qlist-wrap' );
        var qList = $( '.qlist' );

        var qZonghe  = $('.q-zonghe');
        var qXingshi = $('.q-xingshi');
        var qDiffStar = $('.q-diffstar');

        

        // 更新mainer高度
        function updataMainerHeight(){
            var mainerHeight = $(window).outerHeight(true) - $('header').outerHeight() - $('footer').outerHeight();
            $('.mainer').css({'min-height':mainerHeight});
            // $('.mainer').animate({'min-height':mainerHeight},100);
        }
        updataMainerHeight();

        // 窗体改变，更新mainer高度
        $(window).on('resize',function(){
            updataMainerHeight();
        })

        // 侧边导航sidebar
        if(sidebarHide) {
            sidebar.on('mouseenter','.sidebar-menu>li',sidebarHover);
        }
        else{
            sidebar.on('click','li',sidebarDisplay);
        }
        

        // 更新侧边栏目 一级菜单的状态
        function updateSidebarMenu(){
            submenu.find('li.active').closest('.submenu-open','.sidebar-menu').addClass('active').siblings().removeClass('addClass');
        }

        // 更新二级菜单的显示与隐藏
        function updateSubmenuStatus(){
            var submenuV  = sidebar.find('.submenu:visible');
            var submenuH  = sidebar.find('.submenu:hidden');
            submenuV.closest('li','.sidebar-menu').addClass('submenu-open');
            submenuH.closest('li','.sidebar-menu').removeClass('submenu-open');
        }

        // 收起侧边栏目时，鼠标移动到菜单事件（未完成）
        function sidebarHover(event){
            var curtag       = $(event.currentTarget);
            var cur_submenu  = curtag.find('.submenu');
            var subLi = curtag.find('li');
            var isSubLi      = curtag.closest('.submenu','.sidebar-menu').length;

            var sidebarWidth = sidebar.width();
            var submenuWidth = submenu.width();
            event.stopPropagation();//阻止冒泡

            // if(subLi.length) return;
            if(isSubLi){
                return;
            }
            else{
                submenu.css({'right':sidebarWidth,'opacity':0});
                cur_submenu.animate({'right':-submenuWidth-20,'opacity':1},200);
            }
            // console.log(sidebarWidth);
            return;
        }

        function sidebarDisplay(event){
            var curtag       = $(event.currentTarget);

            event.stopPropagation();//阻止冒泡

            
            submenuShow(curtag);
        }

        function submenuShow(ele){
            // console.log("asdf");
            var curtag       = ele;
            var cur_submenu  = curtag.find('.submenu');

            // 如果有二级栏目
            if(cur_submenu.length){
                if( isOpenall() ) return;
                submenu.stop().slideUp('fast');
                cur_submenu.stop().slideToggle(200,updateSubmenuStatus);
            }
            else{
                sidebarMenu.find('li').removeClass('active');
                curtag.addClass('active');
                updateSidebarMenu();
            }
        }

        // 展开所有菜单
        
        var isOpenall = function(){
            return btnOpenall.find('.glyphicon.glyphicon-check').length;
        }

        btnOpenall.on('click',function(event){
            var curtag = $(event.currentTarget);
            curtag.find('.glyphicon').toggleClass('glyphicon-check glyphicon-unchecked');
            sidebar.find('.sidebar-menu>li:not(".submenu-open")').find('.submenu').slideToggle(200);
            sidebar.find('.sidebar-menu>li:not(".submenu-open")').toggleClass('submenu-open');
        })


        /****** 目录管理 *****/
        

        editBtns.on('click','.btn-edit',function(event){
            var curtag = $(event.currentTarget);
            var block  = curtag.parents('.block-body');
            var toggleTxt = curtag.data( 'toggletxt' );
            block.toggleClass('catalog-editing');
            curtag.toggleClass('btn-default btn-primary');
            curtag.data( 'toggletxt', curtag.text() );
            curtag.text( toggleTxt );

            // btnCalabar.toggleClass('hide');
        })

        /****** 题库复制过来的 题目移动 *****/
        qList.on( 'click', '.qbtn-move', qLineMove );
        qList.on( 'click', '.qdata-insline', qdataInsert );
        function qdataInsert( event ){
            var curtag = $( event.currentTarget ),
                move   = $( '.qdata-line-moving, .qdata-line-moving+.qdata-insline-moving' ),
                to = curtag,
                prev = curtag.prev();

            if( !prev.hasClass( 'qdata-line-moving' ) ){
                if( move.filter( curtag ).length ){
                    move = move.not( curtag ).not( prev );
                    to = prev.prev();
                }
                to.after( move );
                qLineNumberInit();
                qLineMoveCancel();
            }
        }
        function qLineMove( event ){
            var curtag = $( event.currentTarget ),
                line   = curtag.parents( '.qdata-line' );
            if( line.hasClass( 'qdata-line-moving' ) ){
                line.removeClass( 'qdata-line-moving' );
            }else{
                line.addClass( 'qdata-line-moving' );
            }
            btnToggleHtml( curtag );
            insertLineUpdate();
        }

        function btnToggleHtml( btn ){
            var toggle = btn.data( 'togglehtml' );
            if( toggle !== undefined ){
                btn.data( 'togglehtml', btn.html() );
                btn.html( toggle );
            }
        }
        function insertLineUpdate(){
            if( qList.find( '.qdata-line-moving' ).length ){
                qList.find( '.qdata-insline' ).addClass( 'qdata-insline-moving' );
            }else{
                qList.find( '.qdata-insline' ).removeClass( 'qdata-insline-moving' );
            }
        }
        function qLineNumberInit(){
            var qlist = qList.find( '.qdata' );
            qlist.each( function( i ){
                var number = qlist.eq(i).find( '.qdata-number' );
                number.each( function( j ){
                    number.eq(j).text( j+1 );
                } );
            } );
        }
        function qLineMoveCancel(){
            var line = qList.find( '.qdata-line-moving' );
            line.removeClass( 'qdata-line-moving' );
            line.find( '.qbtn-move' ).each( function(){
                btnToggleHtml( $(this) );
            } );
            qList.find( '.qdata-insline-moving' ).removeClass( 'qdata-insline-moving');
        }

        /****** 题库复制过来的 选择题目 *****/

        $( '.qbtn-select' ).on( 'click', trSelected );
        function trSelected( event ){
            var curTag = $( event.currentTarget ),
                curTr = curTag.parents( 'tr' ),
                curPar = curTag.parents( '.qdata-line' ),
                toggleTxt = curTag.data( 'toggletxt' );
            curTag.toggleClass( 'qbtn-selected' );
            curTr.toggleClass( 'q-selected' );
            curPar.toggleClass( 'q-selected' );
            curTag.data( 'toggletxt', curTag.text() );
            curTag.text( toggleTxt );
        }

        // 共选几题
        $('.height-limit').on('mouseenter',function(){
            var h = $(this).find('.navbar-text').outerHeight(true);
            $(this).stop().animate({
                'height': h
            },300);
            $(this).find('.navbar-middle').stop().animate({
                'min-height': h
            },300);
        })
        $('.height-limit').on('mouseleave',function(){
            $(this).stop().animate({
                'height':'50px'
            },300);
            $(this).find('.navbar-middle').stop().animate({
                'min-height': '50px'
            },300);
        })

        // 筛选题目时
        qZonghe.on('click','button',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
        qXingshi.on('click','button',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
        qDiffStar.on('click','i',function(){
            var curtag = $(this);
            if(curtag.nextAll().hasClass('active')){
                curtag.nextAll().removeClass('active');
                return
            }
            curtag.toggleClass('active');
            if(curtag.hasClass('active')){
                curtag.prevAll().addClass('active');
            }
            else{
                curtag.prevAll().removeClass('active');   
            }
        })

    });
})();