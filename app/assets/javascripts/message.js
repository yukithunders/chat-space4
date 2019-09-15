$(function(){
   var buildMessageHTML= function(message){

    var MessageImage = (message.image.url) ? `<img class=lower-message__image src= ${message.image.url}>`: "";
      
    if (message.content && message.image.url){
      var html = `<div class="message" data-message-id=${message.id}>
      <div class="upper-message">
      <div class="upper-message__user-name">
      ${message.user_name}
      </div>
      <div class="upper-message__date">
      ${message.created_at}
      </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      ${message.content}
      </p>
      ${MessageImage}
      </div>
      </div>`
      return html;
    }else if (message.content){
        var html = `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
        <div class="upper-message__user-name">
        ${message.user_name}
        </div>
        <div class="upper-message__date">
        ${message.created_at}
        </div>
        </div>
        <div class="lower-message">
        <p class="lower-message__content">
        ${message.content}
        </p>
        ${MessageImage}
        </div>
        </div>`
        return html;
    }else if(message.image.url){
      var html = `<div class="message" data-message-id=${message.id}>
      <div class="upper-message">
      <div class="upper-message__user-name">
      ${message.user_name}
      </div>
      <div class="upper-message__date">
      ${message.created_at}
      </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      </p>
      ${MessageImage}
      </div>
      </div>`
      return html;
    };
    
  };
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
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
      var html = buildMessageHTML(data);
      $('.contents__main__mid').append(html);
      $(".form__submit").removeAttr("disabled");
      $('#new_message')[0].reset();
    })
    .fail(function(data){
      $(".form__submit").removeAttr("disabled");
      alert('eroor');
    })
  });

  var reloadMessages = function(){
    if(document.URL.indexOf("messages") !== -1){
    last_message_id = $('.message:last').data('message-id');
    var act = $('#new_message').attr('action');
    var g_id = $('.gid').attr('value');
    var g_url = "/groups/" + g_id + "/api/messages"
    $.ajax({
      url: g_url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){ 
      messages.forEach(function(message){
        var html = buildMessageHTML(message);
        $('.contents__main__mid').append(html);
      });
    })
    .fail(function(){
      console.log('error');
    });
  };
 };
    setInterval(reloadMessages, 5000);
});