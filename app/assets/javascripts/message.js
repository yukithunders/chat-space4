$(function(){
  function buildHTML(message){
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.name}
    </div>
    <div class="upper-message__date">
    ${message.date}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    <p class="lower-message__image">
    ${message.image}
    </p>
    </div></div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    //console.log(formData.get(content));
    console.log(formData.get(image));
    //console.log(formData);

    var act = $('#new_message').attr('action');

    $.ajax({
      type: 'POST',
      url: act,
      data: formData, 
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data);
      console.log("きてる")
      var html = buildHTML(data);
      $('.contents__main__mid').append(html);
      $(".form__submit").removeAttr("disabled");
      $('.form__message').val('');
    })
    .fail(function(data){
      console.log("きていない");
      $(".form__submit").removeAttr("disabled");
      console.log(data);
      alert('eroor');
    })
  });
});