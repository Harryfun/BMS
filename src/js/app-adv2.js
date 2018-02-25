$(function(){
	
	$(".btn-add").on('click',function(){
		$('.adv-button').hide();
		$('.tab-adv').hide();
		$('.add-info').show();
	});
	
	
	$('.selItem1 .cir').on('click',function(){
		$(this).addClass('active');
		$('.selItem2').children('.url').val('');
		$('.selItem2').children('.cir').removeClass('active');
		$('.selItem1').children('.chooseImg').removeClass('dn');
	});
	$('.selItem2 .cir').on('click',function(){
		$(this).addClass('active');
		$('.selItem1').children('.chooseImg').empty();
		$('.selItem1').children('.chooseImg').addClass('dn');
		$('.selItem1').children('.cir').removeClass('active');
		$('.selItem1 .file').val('');
		$('.selItem2 :input[type="url"]').val('http://www.k12china.com');
	});
	function inputUrl(){
		
		$(':input[type="url"]').on('focus',function(){
			$(this).val('');
		});
		$(':input[type="url"]').on('blur',function(){
			var val = $(this).val();
			if(val==''){
				$(this).val('http://www.k12china.com');
			}
		});
	}
//	inputUrl();
	
	$('.select-time li a').on('click',function(){
		var textTime = $(this).text();
		$('.save-time').text(textTime);
	});
	
	
	//缩略图
	$('.btn-img img').on('click',function(event){
		event.stopPropagation();
		$(this).toggleClass('active');
	});
	$(document).on('click',function(e){
		$('.btn-img img').removeClass('active');
		$('.Ul').hide();
	});
	$('.adv-btn').on('click',function(){
		$('.adv-button').show();
		$('.tab-adv').show();
		$('.add-info').hide();
		
	});
	
	//单选按钮
	$("#optionsRadios1").on('click',function(){
		$(".sel-file").removeClass('hide');
		$('.sel-url').addClass('hide');

	});
	$("#optionsRadios2").on('click',function(){
		$(".sel-url").removeClass('hide');
		$('.sel-file').addClass('hide');

	});

});
