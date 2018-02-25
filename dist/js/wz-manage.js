$(document).ready(function(){
	// 点击“新增”按钮
	$(document).on('click','#linkToAdd',function(){
		initPage()
		$('#index-page').addClass('dn')
		$('#add-page').removeClass('dn')
	})
	// 点击“修改”按钮
	$(document).on('click','#linkToAdd',function(){
		$('#index-page').addClass('dn')
		$('#add-page').removeClass('dn')
	})
	// 点击“预览”按钮
	$(document).on('click','.preview',function(){
		var url = 'http://yondor.oss-cn-shanghai.aliyuncs.com/';
		var src = url + $(this).parents('.upload-div').find('img').attr('url')
		$('.modal-body img').attr('src',src)
		//显示弹窗
		$('#myModal').modal('show')
	})
	// 点击图片查看大图
	$(document).on('click','.showPic',function(){
		var url = 'http://yondor.oss-cn-shanghai.aliyuncs.com/';
		var src = url + $(this).attr('url')
		$('.modal-body img').attr('src',src)
		$('#myModal').modal('show')
	})
	// 点击“返回”按钮回到首页
	$(document).on('click','#linkToIndex',function(){
		$('#add-page').addClass('dn')
		$('#index-page').removeClass('dn')
	})
	// 点击“修改”按钮
	$(document).on('click','.editData',function(){
		var dom = $(this).parents('.content')
		editPage(dom)
	})
	// 点击“保存”按钮
	$(document).on('click','#saveData',function(){
		if( saveLimit() === true ){

		}else{

		}
	})


	// 点击“修改”按钮，显示当前数据
	function editPage(dom){
		$('.operate-page .title').text('编辑文章')
		// 获取序号
		//var order = $(dom).find('.order').text()
		// 获取平台
		var platform = $(dom).find('.platform').attr('value')
		$('.operate-page .platform').val( platform )
		// 获取栏目
		var column = $(dom).find('.column').attr('value')
		$('.operate-page .column').val( column )
		// 获取标题
		var head = $(dom).find('.head').text()
		$('.operate-page .head').val( head )
		// 获取类型
		var type = $(dom).find('.type').attr('value')
		$('.operate-page .type').val( type )
		// 获取顺序
		var nowOrder = $(dom).find('.changeOrder .nowOrder').text()
		$('.operate-page .nowOrder').val( nowOrder )
		// 获取描述
		var describe = $(dom).find('.describe').text()
		$('.operate-page .describe').val( describe )
		// 获取链接地址
		var urlAddress = $(dom).find('.urlAddress a').attr('href')
		$('.operate-page .urlAddress').val( urlAddress )
		// 获取第一张图片小图和大图地址
		var oneSrc = $(dom).find('.img-div .pic-one').attr('src')
		var oneUrl = $(dom).find('.img-div .pic-one').attr('url')
		$('.operate-page .one-pic').attr( 'src',oneSrc )
		$('.operate-page .one-pic').attr( 'url',oneUrl )
		// 获取第二张图片地址
		var twoSrc = $(dom).find('.img-div .pic-two').attr('src')
		var twoUrl = $(dom).find('.img-div .pic-two').attr('url')
		$('.operate-page .two-pic').attr( 'src',twoSrc )
		$('.operate-page .two-pic').attr( 'url',twoUrl )
		// 是否热门
		// var isHot = $(dom).find('.isHot input').is(':checked')
		// 是否隐藏
		// var isHide = $(dom).find('.isHide input').is(':checked')
		// 切换页面
		$('#index-page').addClass('dn')
		$('#add-page').removeClass('dn')
	}
	// “新增”文章，初始化数据
	function initPage(){
		var dom = $('.operate-page .title').text('新增文章')
		// 清空平台
		$('.operate-page .platform').val('0')
		// 清空栏目
		$('.operate-page .column').val('0')
		// 清空标题
		$('.operate-page .head').val('')
		// 清空类型
		$('.operate-page .type').val('0')
		// 清空文章顺序
		$('.operate-page .nowOrder').val('')
		// 清空文章描述
		$('.operate-page .describe').val('')
		// 清空链接地址
		$('.operate-page .urlAddress').val('')
		// 清空第一张图片
		$('.operate-page .one-pic').attr( 'src','' )
		$('.operate-page .one-pic').attr( 'url','' )
		// 清空第二张图片
		$('.operate-page .two-pic').attr( 'src','' )
		$('.operate-page .two-pic').attr( 'url','' )
	}
	// 点击“保存”按钮条件限制
	function saveLimit(){
		var judge = true;
		// 文章顺序
		var order = $('.operate-page .nowOrder').val()
		if( $('.operate-page .platform').val() === '0' ){
			judge = false;
			alert('请选择平台')
		}else if( $('.operate-page .column').val() === '0' ){
			judge = false;
			alert('请选择栏目')
		}else if( $('.operate-page .head').val() === '' ){
			judge = false;
			alert('请输入标题')
		}else if( $('.operate-page .type').val() === '0' ){
			judge = false;
			alert('请选择类型')
		}else if( order === '' ){
			judge = false;
			alert('请输入文章顺序')
		}else if( !(/(^[1-9]\d*$)/.test(order)) ){
			judge = false;
			alert('文章顺序只能输入正整数')
		}else if( $('.operate-page .describe').val() === '' ){
			judge = false;
			alert('请输入文章描述')
		}else if( $('.operate-page .urlAddress').val() === '' ){
			judge = false;
			alert('请输入链接地址')
		}else if( $('.operate-page .one-pic').attr( 'src') === '' ){
			judge = false;
			alert('请上传图片1')
		}else if( $('.operate-page .two-pic').attr( 'src') === '' ){
			judge = false;
			alert('请上传图片2')
		}
		return judge
	}





	//初始化分页插件
	function initPager(num,dom,fn){
		Page({
			num:num,				//页码数
			startnum:1,				//指定页码
			elem:$(dom),		//指定的元素
			callback:function(n){	//回调函数
				fn(n)
			}
		})		
	}
	initPager( 10, '#page1' )

	//点击上传练习册错例图片
	$(document).on('change', '.uploadPic' ,function(event){
	    //获取其父元素下类名为img-span的dom节点
	    var dom = $(this).parents('.upload-div').find('img');
	    console.log($(this)[0].files);
	    var file = $(this)[0].files[0];
	    if( !/image\/\w+/.test(file.type) ){
	        alert('文件必须为图片！')
	        return
	    }else if( file.size > 2097152 ){
	        alert('上传图片请小于2M')
	        return
	    }
	    var reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = function(e) {
	        // 防止两次上传同一文件无法触发change事件
	        // event.target.value=''
	        result = this.result.split(',')[1];
	        // 上传文件使用表单的形式
	        var formDate = new FormData();
	        formDate.append('fileName1', 'user.png');
	        formDate.append('content1', result);
	        //调用接口,图片上传到服务器
	        getPicUrl(formDate,dom)
	    }
	}) 
	//拿到base64编码后，显示图片
	function createCanvas(src,url,minUrl,dom) {
	    console.log( src.length )
	    $(dom).attr('src',src)
	    $(dom).attr( 'url',url )
	    $(dom).attr( 'minUrl',minUrl )
	}
	//图片上传到服务器，传回服务器的图片地址
	function getPicUrl(formDate,dom){
	    $.ajax({  
	        url: 'http://192.168.6.31/jzimage/teaimageupload',  
	        type: 'POST',  
	        data: formDate,  
	        dataType: 'JSON',  
	        cache: false,  
	        processData: false,  
	        contentType: false  
	    }).done(function(res){  
	        console.log(res)
	        var base = res.fs_domain;
	        if (res.isSuccess && res.urlList.length>0) {
	            var list = JSON.parse(res.urlList[0]);
	            //拼接图片地址
	            imgWebLine = base + list.min_url;
	            console.log( imgWebLine )
	            createCanvas(imgWebLine,list.url,list.min_url,dom)
	        }else{
	            alert('图片上传到服务器失败')
	        }
	    })
	} 

})