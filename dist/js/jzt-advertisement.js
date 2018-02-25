$(document).ready(function(){
	
	var addData = {
		imgUrl: null,
	};//[增加]广告数据对象
	
	//判断是否本地
	if(!($('#openUrl').val().indexOf('http://') > -1)){
		var url = "http://192.168.20.19:8080";
	}else{
		var url = $('#openUrl').val();
	}
	
	var goPage = function(max,cur,cb){
		$('#paging1').css('display','block');
		//分页跳转
		Page({
			num :max,		//页码数
			startnum: cur,				//指定页码
			elem: $('#page1'),			//指定的元素
			callback: function(n){
				cb && cb(n)
			}
		});
	}
	
	function init(n){
		//初始化请求数据
		$.ajax({
			type: "post",
			url: url+"/stat/advert/index.html?method=advertDataPage",
			async: true,
			data:{
				pageNum: n,
			},
			success: function(res){
				if(res.page.success){
					$('.notFound').css('display','none');
					if(res.page.maxPage == 1){
						$('#paging1').css('display','none');
						overwriteData(res)
					}else if(res.page.maxPage != 1){
						overwriteData(res)
						goPage(res.page.maxPage,n,init)
					}
				}else{
					$('#paging1').css('display','none');
					$('.notFound').css('display','block');
				}
			}
		})
	}
	
	init(1)
	
	function overwriteData(rres){
		//覆盖数据
		$('.row').find('.content').each(function(i,v){
			$(v).remove();
		});
		for(var i=0;i<rres.page.pageSize;i++){
			/*数据拼接*/
			if(rres.page.advertDataList[i] && rres.page.advertDataList[i].isOpen == 'F'){
				$('.all').find('.row').append(
					'<div class="content" data-id="'+rres.page.advertDataList[i].id+'">'+
						'<div class="one-part swBox">'+
							'<div class="search_checkbox">'+
								'<input type="checkbox" id="switch'+(rres.page.advertDataList[i].id)+'">'+
								'<label class="swBtns" for="switch'+(rres.page.advertDataList[i].id)+'"></label>'+
							'</div>'+
						'</div>'+
						'<div class="two-part nameBox">'+rres.page.advertDataList[i].name+'</div>'+
						'<div class="two-part imgBox"><img src="'+rres.page.advertDataList[i].picUrl+'"/></div>'+
						'<div class="three-part urlBox">'+rres.page.advertDataList[i].webUrl+'</div>'+
						'<div class="two-part dateBox">'+rres.page.advertDataList[i].createdate+'</div>'+
						'<div class="one-part editBox">'+
							'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
						'</div>'+
					'</div>'
				);
			}else if(rres.page.advertDataList[i] && rres.page.advertDataList[i].isOpen == 'T'){
				$('.all').find('.row').append(
					'<div class="content" data-id="'+rres.page.advertDataList[i].id+'">'+
						'<div class="one-part swBox">'+
							'<div class="search_checkbox">'+
								'<input type="checkbox" id="switch'+(rres.page.advertDataList[i].id)+'" checked>'+
								'<label class="swBtns" for="switch'+(rres.page.advertDataList[i].id)+'"></label>'+
							'</div>'+
						'</div>'+
						'<div class="two-part nameBox">'+rres.page.advertDataList[i].name+'</div>'+
						'<div class="two-part imgBox"><img src="'+rres.page.advertDataList[i].picUrl+'"/></div>'+
						'<div class="three-part urlBox">'+rres.page.advertDataList[i].webUrl+'</div>'+
						'<div class="two-part dateBox">'+rres.page.advertDataList[i].createdate+'</div>'+
						'<div class="one-part editBox">'+
							'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
						'</div>'+
					'</div>'
				);
			}
		}
	}
	
	//设置当前为增加广告状态
	var addState = null;
	var dom = null;//当前行dom
	var id = null;//当前dom对应id
	
	$('.add_advertisement').click(function(){
		//点击添加广告按钮事件
		$('.all').css('display','none');
		$('.add').css('display','block');
		addState = true;
		//清空缓存
		$('.view').prop('src','');
		$('#add_switch').prop('checked',false);
		$('#adName').val('');
		$('#webUrl').val('');
	});
	
	$('.uploadBtn').click(function(){
		//上传图片按钮事件
		$('.uploadPic').trigger('click');
		$('.uploadPic').change(function(){
			var view = $('.view').eq(0);
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
							view.prop('src',res.tMessage.ext1);
							addData['imgUrl'] = res.tMessage.ext1;
						}
					}
				});
		    }
		});
	});
	
	$('.add').on('click','.back',function(){
		//增加广告模块返回按钮事件
		$('.view').prop('src','');
		$('#add_switch').prop('checked',false);
		$('#adName').val('');
		$('#webUrl').val('');
		
		$('.add').css('display','none');
		$('.all').css('display','block');
	});
	
	$('.add').on('click','.sure',function(){
		//增加广告模块确定按钮事件
		console.log(addData['imgUrl']);
		if(addState == true){
			//当前为增加广告状态
			$.ajax({
				type: "post",
				url: url+"/stat/advert/index.html?method=editAdvert",
				async: true,
				data: {
					name: $('#adName').val(),
					picUrl: addData['imgUrl'],
					picMinurl: addData['imgUrl'],
					webUrl: $('#webUrl').val(),
					isOpen: $('#add_switch').prop('checked') ? 'T' : 'F'
				},
				success: function(res){
					if(res.tMessage.success){
						$('.notFound').css('display','none');
						var obj = JSON.parse(res.tMessage.ext1);
						if(obj && obj.isOpen == 'T'){
							//拼接字符串
							$('.all').find('.notFound').after(
								'<div class="content" data-id="'+obj.ID+'">'+
									'<div class="one-part swBox">'+
										'<div class="search_checkbox">'+
											'<input type="checkbox" id="switch'+(obj.ID)+'" checked>'+
											'<label class="swBtns" for="switch'+(obj.ID)+'"></label>'+
										'</div>'+
									'</div>'+
									'<div class="two-part nameBox">'+obj.name+'</div>'+
									'<div class="two-part imgBox"><img src="'+obj.picUrl+'"/></div>'+
									'<div class="three-part urlBox">'+obj.webUrl+'</div>'+
									'<div class="two-part dateBox">'+obj.createdate+'</div>'+
									'<div class="one-part editBox">'+
										'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
									'</div>'+
								'</div>'
							);
						}else if(obj && obj.isOpen == 'F'){
							//拼接字符串
							$('.all').find('.notFound').after(
								'<div class="content" data-id="'+obj.ID+'">'+
									'<div class="one-part swBox">'+
										'<div class="search_checkbox">'+
											'<input type="checkbox" id="switch'+(obj.ID)+'">'+
											'<label class="swBtns" for="switch'+(obj.ID)+'"></label>'+
										'</div>'+
									'</div>'+
									'<div class="two-part nameBox">'+obj.name+'</div>'+
									'<div class="two-part imgBox"><img src="'+obj.picUrl+'"/></div>'+
									'<div class="three-part urlBox">'+obj.webUrl+'</div>'+
									'<div class="two-part dateBox">'+obj.createdate+'</div>'+
									'<div class="one-part editBox">'+
										'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
									'</div>'+
								'</div>'
							);
						}
						$('.add').css('display','none');
						$('.all').css('display','block');
					}
				}
			});
		}else if(addState == false){
			//当前为广告修改状态
			$.ajax({
				type: "post",
				url: url+"/stat/advert/index.html?method=editAdvert",
				async: true,
				data: {
					id: id,
					name: $('#adName').val(),
					picUrl: addData['imgUrl'],
					picMinurl: addData['imgUrl'],
					webUrl: $('#webUrl').val(),
					isOpen: $('#add_switch').prop('checked') ? 'T' : 'F'
				},
				success: function(res){
//					console.log(res);
					if(res.tMessage.success){
						console.log(id);
						var obj = JSON.parse(res.tMessage.ext1);
						if(obj && obj.isOpen == 'T'){
							//拼接字符串
							$('.row').find('.content[data-id='+obj.ID+']').html(
								'<div class="one-part swBox">'+
									'<div class="search_checkbox">'+
										'<input type="checkbox" id="switch'+(obj.ID)+'" checked>'+
										'<label class="swBtns" for="switch'+(obj.ID)+'"></label>'+
									'</div>'+
								'</div>'+
								'<div class="two-part nameBox">'+obj.name+'</div>'+
								'<div class="two-part imgBox"><img src="'+obj.picUrl+'"/></div>'+
								'<div class="three-part urlBox">'+obj.webUrl+'</div>'+
								'<div class="two-part dateBox">'+obj.createdate+'</div>'+
								'<div class="one-part editBox">'+
									'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
								'</div>'
							);
						}else if(obj && obj.isOpen == 'F'){
							//拼接字符串
							$('.row').find('.content[data-id='+obj.ID+']').html(
								'<div class="one-part swBox">'+
									'<div class="search_checkbox">'+
										'<input type="checkbox" id="switch'+(obj.ID)+'">'+
										'<label class="swBtns" for="switch'+(obj.ID)+'"></label>'+
									'</div>'+
								'</div>'+
								'<div class="two-part nameBox">'+obj.name+'</div>'+
								'<div class="two-part imgBox"><img src="'+obj.picUrl+'"/></div>'+
								'<div class="three-part urlBox">'+obj.webUrl+'</div>'+
								'<div class="two-part dateBox">'+obj.createdate+'</div>'+
								'<div class="one-part editBox">'+
									'<a class="btn btn-primary edit" href="javascript:;" role="button">编辑</a>'+
								'</div>'
							);
						}
						$('.add').css('display','none');
						$('.all').css('display','block');
					}
				}
			});
		}
	});
	
	$('.all').on('click','.edit',function(){
		//所有广告模块里面的编辑按钮事件
		
		//设置当前为编辑状态
		addState = false;
		dom = $(this).parents('.content');
		id = dom.attr('data-id');
		
		//获取当前行所有属性
		var this_row = $(this).parents('.content');
		var swVal = this_row.find('.swBox input').prop('checked');
		var nameVal = this_row.find('.nameBox').text();
		var imgVal = this_row.find('.imgBox img').prop('src');
		var urlVal = this_row.find('.urlBox').text();
		$('.add').css('display','block');
		$('.all').css('display','none');
		
		//将当前行所有属性进行赋值
		$('.view').prop('src',imgVal);
		$('#add_switch').prop('checked',swVal);
		$('#adName').val(nameVal);
		$('#webUrl').val(urlVal);
	});
	
	$('.all').on('click','.del',function(){
		//点击删除按钮事件
		dom = $(this).parents('.content');
		id = dom.attr('data-id');
		console.log(id,dom);
		$.ajax({
			type: "post",
			url: url+"/stat/advert/index.html?method=delAdvert",
			async: true,
			data: {
				id: id,
			},
			success: function(res){
				if(res.tMessage.success){
					console.log('true');
					dom.remove();
					dom = null;
					id = null;
					if($('.content').size() == 0){
						$('.notFound').css('display','block');
					}
				}
			}
		});
	});
	
	$('.search').click(function(){
		//点击搜索按钮事件
		$.ajax({
			type: "post",
			url: url+"/stat/advert/index.html?method=advertDataPage",
			async: true,
			data:{
				name: $('#searchName').val(),
				isOpen: $('#searchState').val(),
			},
			success: function(res){
				$('.row').find('.content').each(function(i,v){
					$(v).remove();
				});
				if(res.page.success){
					$('.notFound').css('display','none');
					if(res.page.maxPage == 1){
						$('#paging1').css('display','none');
						overwriteData(res)
					}else if(res.page.maxPage != 1){
						overwriteData(res)
						goPage(res.page.maxPage,1,init)
					}
				}else{
					$('#paging1').css('display','none');
					$('.notFound').css('display','block');
				}
			}
		})
	});
	
	$('#searchName').focus(function(){
		//广告名搜索框获取焦点事件
		$(document).keyup(function(e){
			//监听回车
			if(e.keyCode == 13){
				$('.search').click();
			}
		});
	})
	
	$('.row').on('click','.swBtns',function(){
		var pid = $(this).parents('.content').attr('data-id');
		var sw = !$(this).prev('input[type=checkbox]').prop('checked') ? 'T' : 'F';
		$.ajax({
			type: "post",
			url: url+"/stat/advert/index.html?method=changeOpen",
			async: true,
			data: {
				id: pid,
				isOpen: sw,
			},
			success: function(res){
				if(!res.tMessage.success){
					$(this).prev('input[type=checkbox]').prop('checked',!sw);
				}
			}
		});
	});
})