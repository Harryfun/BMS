 
$(document).ready(function(){
  /**
   * 可编辑
   */
  $('.ex_leibie').on('click', function(event){
    var content = $(this).text();
    $(this).html('<input class="leibie_input" type="text" value="'+content+'" style="width: 60px;">');
    $(this).find('input').focus().select();
    event.stopPropagation();
  });

  $(document).on('blur', '.leibie_input', function(event){
    var value = $(this).val();
    $(this).parent('.ex_leibie').html(value);
    event.stopPropagation();
  });
  $(document).on('keydown','.leibie_input', function(event){
  // $("body").keydown(function(event) {
    if (event.keyCode == "13") {//keyCode=13是回车键
        alert('on');
        $(".leibie_input").trigger('blur');
    }
  });
  /**
   * 缩进
   * @param  {左缩进}      tr_td_in    
   * @return {右缩进}     [tr_td_out]
   */
  $('.indent').prevAll().filter(':not(:first-child)').hide();
  $('.indent').find('i').attr('class','glyphicon glyphicon-chevron-right');
  tr_td_in($('.indent').index());
  $('#table_exchange').on('click','.indent',function(){
    var index = $(this).index();
    var icon = $(this).find('i');
    $(this).prevAll().filter(':not(:first-child)').hide();
    if (icon.hasClass('glyphicon-chevron-left')) {
      icon.attr('class','glyphicon glyphicon-chevron-right');
      tr_td_in(index);
    }else {
      icon.attr('class','glyphicon glyphicon-chevron-left');
      tr_td_out();
    }
  });
  console.log('此处影响全局缩进');
  function tr_td_in(num){
    $.each($('#dataChange tr'), function(){
      $(this).find('td').eq(num).prevAll().filter(':not(:first-child)').hide();
    });
  }
  function tr_td_out(){
    $('#table_exchange').find("th:hidden").show();
    $('#table_exchange').find("td:hidden").show();
  }
  /**
   * 发送信息类型
   */
  $('.send').on('click','input',function(){
    console.info('in th input that','#f00');
    if($(this).prop('checked')){        
    // 选中的
      if ($(this).hasClass('sell')) {   // 销售短信
        // 关闭学习报告
        $('input.report').prop('checked',false);
        // 选中销售短信列表
        $('.type_con .Isell').prop('checked',true);
        // 关闭学习报告列表
        $('.type_con .Ireport').prop('checked',false);
        // 薄弱内容关闭
        $('.br_con').find('input').prop('disabled',true).prop('checked',false);
      }else {                           // 学习报告短信
        // 关闭销售短信
        $('input.sell').prop('checked',false);
        // 选中学习列表
        $('.type_con .Ireport').prop('checked',true);
        // 关掉销售列表
        $('.type_con .Isell').prop('checked',false);
        // 薄弱内容勾选
        $('.br_con').find('input').prop('disabled',false).prop('checked',true);
      }
    }
    // 取消选中的
    else {                             
      if ($(this).hasClass('sell')) {
        $('.type_con .Isell').prop('checked',false);
        // 薄弱内容开启
         $('.br_con').find('input').prop('disabled',false);
      } else {
        $('.type_con .Ireport').prop('checked',false);
        $('.br_con').find('input').prop('checked',false);
      }
    }
  });
  /**
   * 分类短信
   */
  $(document).on('click','.type_con input',function(e){
    var parent = $(this).parents('.ex_tr');
    if($(this).prop('checked')){
      if ($(this).hasClass('Isell')) {    // 销售
        console.info('in----------sell');
        parent.find('.br_con').find('input').prop('disabled',true).prop('checked',false);
        parent.find('.Ireport').prop('checked',false);
      }else if ($(this).hasClass('Ireport')) {  // 学习报告
        console.info('in----------report');
        parent.find('.Isell').prop('checked',false);
        parent.find('.br_con').find('input').prop('disabled',false).prop('checked',true);
      }
    } else {  // 关掉
      if ($(this).hasClass('Isell')) {
        parent.find('.br_con').find('input').prop('disabled',false).prop('checked',false);
        parent.find('.Isell').prop('checked',false);
      }else if ($(this).hasClass('Ireport')) {
        parent.find('.br_con').find('input').prop('disabled',false).prop('checked',false);
        parent.find('.Ireport').prop('checked',false);
      }
    }
  });
  /**
   * 薄弱内容点击触发事件
   */
  $(document).on('click','.br_con input',function(){
    var current = $(this).parents('.ex_tr').find('.Ireport');
    if ($(this).prop('checked')) {
      current.prop('checked',true);
    }else {
      current.prop('checked',false);
    }
  });

  $(document).on('click','.lookName',function(){
    console.dirxml(this);
    $(this).parent('.parentName').html('谢柱华');
  });

  // 提示框
  $("[data-toggle='tooltip']").tooltip();
});