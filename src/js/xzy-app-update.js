$(document).ready(function(){
	
	//判断是否内网
	var local = true;
	
	if(local)
		var url = '';
	else
		var url = '';
	
	$('#datetimepicker').datetimepicker({
		language: 'zh-CN',//显示中文
		format: 'yyyy-mm-dd',//输入框显示格式
		minView: 2,//选择时,精确到 => 1表示显示时；2表示显示日；3表示显示到月
		initialDate: new Date(),//初始化当前日期
		autoclose: true,//选中自动关闭
		todayBtn: true//显示今日按钮
	});
	
	$('.dropdown-menu').on('click','li',function(){
		//点击选择历史版本事件
		$('.dropdown').find('button').html($(this).children('a').text()+' <span class="caret"></span>');
	});
	
	$(document).on('click','.upload_btn',function(){
		//应用上传按钮事件
		$('#upload').trigger('click');
		$('.uploadPic').change(function(){
			var file = $(this)[0].files[0];
			if( !/image\/\w+/.test(file.type) ){
		        alert('文件必须为图片！')
		        return
		    }else if( file.size > 2097152 ){
		        alert('上传图片请小于2M')
		        return
		    }else{
				var formData = new FormData();
				formData.append('fileName1', 'user.png');
				formData.append('content1', file);
				$.ajax({
					url: url+"/stat/advert/index.html?method=upload",
					type: "POST",
					data: formData,
					contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理
					processData: false, //必须false才会自动加上正确的Content-Type
					success: function (res){
						if(res.tMessage.success){
							
						}
					}
				});
		    }
		});
	});
	
	$('.update').on('click','.cancel',function(){
		//新增版本取消按钮事件
		$('.info').css('display','block');
		$('.update').css('display','none');
	});
	
	$('.update').on('click','.sure',function(){
		//新增版本确定按钮事件
		$('.info').css('display','block');
		$('.update').css('display','none');
	});
	
	$('.info').on('click','.public',function(){
		//应用信息模块发布按钮事件
	});
	
	$('.info').on('click','.add_version',function(){
		//新增版本按钮事件
		
		$('.info').css('display','none');
		$('.update').css('display','block');
		
	});
	
	$('#school').click(function(){
		//点击按学校推送升级按钮事件
		if($(this).prop('checked')){
			$('#sid').prop('disabled',false).focus();
		}else{
			$('#sid').val('').prop('disabled',true);
		}
	});
	
	$('#grade').click(function(){
		//点击按年级推送升级按钮事件
		if($(this).prop('checked')){
			$('#gid').prop('disabled',false).focus();
		}else{
			$('#gid').val('').prop('disabled',true);
		}
	});
})