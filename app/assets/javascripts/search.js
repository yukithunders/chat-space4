$(function(){
  $(".chat-group-form__input").on("keyup",function(){
    var input = $(".chat-group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/products/search',
      data: {keyword: input},
      dataType: 'json'
    })
  });
});