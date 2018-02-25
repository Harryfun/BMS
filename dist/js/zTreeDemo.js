$( function(){

    /*--------------------------------数学树形结构-------------------------------------*/
        // 知识点管理树形结构

        // 设置目录1：一般内容目录
        var SetCatalog1 = {
            view:{
                showLine: true, //是否显示线，true为显示，false为不显示
                showIcon : true,//是否有图标，true为有，false为没有，默认为true
                dblClickExpand:false,
                addDiyDom: addDiyDom
            },
            check:{
                enable:false,
                chkStyle:"checkbox",
                chkboxType:{"Y":"s","N":"s"}  //此处有bug
            },
            callback:{ 
                onRename : zTreeOnRename,
                beforeRemove:zTreeBeforeRemove,
                onRemove:zTreeOnRemove,
                onDblClick: onDblClick

            },
            edit:{
                // 编辑名字时是否全选中文字
                editNameSelectAll: true
            }
        };

        var catalog1  = 'catalog1',
            _catalog1 = '#' + catalog1,
            $catalog1 = $( _catalog1 );


        //练习册目录管理树的数据对象，json数据格式 
        var list_catalog1 = [
            { name:"第一单元 数据收集整理（2课时）", topNode:true, 
                children: [
                    { name:"数据收集整理（2课时）"}
            ]},

            { name:"第二单元 表内除法（一）（10课时）", topNode:true,
                children: [
                    { name:"平均分（2课时）"},
                    { name:"除法（3课时）"},
                    { name:"用2～6的除法口诀求商（2课时）"},
                    { name:"解决问题（3课时）"}
            ]},

            { name:"第三单元 图形的运动（一）（4课时）", topNode:true,
                children: [
                    { name:"对称（2课时）"},
                    { name:"平移和旋转（2课时）"}
            ]},
            { name:"第四单元 表内除法（二）（5课时）", topNode:true,
                children: [
                    { name:"用7、8、9的乘法口诀求商（2课时）"},
                    { name:"解决问题（3课时）"}
            ]},
            { name:"第五单元 混合运算（7课时）", topNode:true,
                children: [
                    { name:"没有带小括号的混合运算（2课时）"},
                    { name:"带小括号的混合运算（2课时）"},
                    { name:"解决问题（3课时）"}
            ]}
        ];

        //初始化
        $.fn.zTree.init($catalog1,SetCatalog1,list_catalog1);
        
        // catalog1: bind events
        $( '.catalog-normal' ).on( 'click', '.btn-reName', {curTree:catalog1}, reName );
        $( '.catalog-normal' ).on( 'click', '.btn-addNode', {curTree:catalog1}, addNode );
        $( '.catalog-normal' ).on( 'click', '.btn-delNode', {curTree:catalog1}, delNode );

        $( document ).on( 'click', cancelSelected );

        function addSelect(){
            var level0 = $( ".level0" );
            var unitSelect = $( ".tree-knowledge-unit" );
            var treeChooseUn = "<span class='tree-knowledge-unit'>"
                                 + "<select>"
                                    + "<option>-选择单元-</option>"
                                    + "<option>1</option>"
                                    + "<option>2</option>"
                                    + "<option>3</option>"
                                    + "<option>4</option>"
                                    + "<option>5</option>"
                                 + "</select>"
                             + "</span>";
            if( !$( ".tree-knowledge-unit" ).length>0 ){
                // return;
                $( 'li.level0 a.level0' ).after( treeChooseUn );
            }
            else{
            }
        }
        

        function addDiyDom(treeId, treeNode) {
            var treeChooseUn = "<span class='label label-default label-catalog-unit'>1</span>"
                                +"<span class='tree-knowledge-unit'>"
                                 + "<select>"
                                    + "<option>-选择单元-</option>"
                                    + "<option>1</option>"
                                    + "<option>2</option>"
                                    + "<option>3</option>"
                                    + "<option>4</option>"
                                    + "<option>5</option>"
                                    + "<option>...</option>"
                                    + "<option>12</option>"
                                 + "</select>"
                             + "</span>";


            var sObj = $("#" + treeNode.tId + "_a.level0");
            sObj.after( treeChooseUn );
            
        };


        // 取消选中状态
        function cancelSelected(event){
            var $target = $(event.target);
            if(!$target.is('.ztree a, .ztree span, .btn-delNode, .btn-addNode, .tree-knowledge-unit select')){
                
                // 取消练习册目录管理树的选中状态
                if( $( 'body' ).find( _catalog1 ).length ){
                    var treeObj = $.fn.zTree.getZTreeObj( catalog1 );
                    treeObj.cancelSelectedNode();
                }
            }
        }

    /*--- start ---重命名事件------*/

        // 重命名
        function reName(event){
            var treeObj = $.fn.zTree.getZTreeObj(event.data.curTree);//获得树
            var nodes = treeObj.getSelectedNodes();//得到选中节点
            for(var nodes_i = 0,nodes_len = nodes.length; nodes_i < nodes_len;nodes_i++){
                treeObj.editName(nodes[nodes_i]); //指明重命名节点
            } 
        }

        // 双击触发重命名
        function onDblClick(event){
            var curtag = event.currentTarget;
            
            // if( curtag.id == basetTree ){
            //     event.data.curTree = basetTree;
            // }
            if( curtag.id == catalog1 ){
                event.data.curTree = catalog1;
            }

            if($(curtag).parents('.catalog-editing').length){
                reName(event);
            }
        }

        // 重命名的回调函数
        function zTreeOnRename(event,treeId,treeNode,isCancel){
            //可以自定义属性，然后根据这些属性来完成操作
            // alert(treeNode.id + ",重命名过后的回调函数" + treeNode.name);
            
            //1.修改 数据库中存在的重命名 看是否为isNew来决定
            // 2.数据库中不存在的重命名,就是新建 id就是null 新是新建，然后要去得到父节点的id ajax传过去，就ok了。 同样要结合js的ajax来执行
            if (treeNode.isNew&&treeNode.isNew!='undefined') {
                 //调用新建的ajax
            } else { 
                 //调用重命名的ajax
            }
        }
    /*---- end ----重命名事件------*/

            
    /*--- start ---删除事件------*/

        //删除点击事件
        function delNode(event){
            var treeObj = $.fn.zTree.getZTreeObj(event.data.curTree);   // 获得树
            var nodes = treeObj.getSelectedNodes(); 
            //var nodes = treeObj.getSelectedNodes();  //获得被选中的节点
            for(x in nodes){  //遍历节点
                delNow(event.data.curTree,nodes[x]);  //跳到delNow执行删除
            }
        }
        function delNow(delObj,node){
            // if(confirm("确定要删除吗？")){
                var treeObj = $.fn.zTree.getZTreeObj(delObj); 
                treeObj.removeNode(node,true); //必须设置为true，否则没法调用事件
            //}
        }
        
        //删除前的回调
        function zTreeBeforeRemove(){
            return confirm("你确定要删除吗？");
        }
        
        //执行删除
        function zTreeOnRemove(event,treeId,treeNode){
            // alert(treeNode.name + "已删除" );
            //ajax执行删除
        }
    /*---- end ----删除事件------*/


    /*--- start --- 创建节点事件------*/
        function addNode(event){
            var treeObj = $.fn.zTree.getZTreeObj(event.data.curTree); //获得树
            var node = treeObj.getSelectedNodes()[0]; //默认为第一个选中文件夹新建子文件夹
            
            var newNode = {
                name:"新建节点",
                isParent:false,
                isNew:true,
                id:"",
                open:false
            };
            
            newNode = treeObj.addNodes(node, newNode, false)[0];
            // addSelect()
            //注意：光标的定位，在回调函数中自动展开时可能回去获取子节点，在展开之前会执行异步
            
            //重新命名新建文件夹，改变数据库
            // treeObj.editName(newNode);
            
            //刷新一下树，加入父节点，异步的时候使用
            //treeObj.reAsyncChildNodes(newNode,getParentNode(),"refresh");
        }
    /*---- end ---- 创建节点事件------*/
    //删除按钮模态框 
      $(".del").click(function(){
        $(".modal-del").modal();
      });
    // 新增按钮模态框
      $(".add").click(function(){
        $(".modal-add").modal();
      });
    // 产品名称模态框
      $(".choose").click(function(){
        if($(this).is(":checked")){
            $(".modal-cg").modal();
        }else{
            $(".modal-sb").modal();
        }
      });

}); 

