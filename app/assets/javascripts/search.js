$(function(){
  $(".chat-group-form__input").on("keyup",function(){
    var input = $(".chat-group-form__input").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/products/search',
      data: {keyword: input},
      dataType: 'json'
    })
  });
});