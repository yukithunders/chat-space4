$(function(){
   var buildMessageHTML= function(message){

    var MessageImage = (message.image.url) ? `<img class=lower-message__image src= ${message.image.url}>`: "";
      
      var html = `<div class="message" data-message-id=${message.id}>
      <div class="upper-message">
        <ul class="list">
          <li class="user">
          ${message.user_name}
          </li>
          <li class="date">
          ${message.created_at}
          </li>
        </ul>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      ${message.content}
      </p>
      ${MessageImage}
      </div>
      </div>`
      return html;
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
      var $scrollAuto = $('.contents__main__mid');
      $scrollAuto.animate({scrollTop: $scrollAuto[0].scrollHeight}, 'slow');
    })
    .fail(function(data){
      $(".form__submit").removeAttr("disabled");
      alert('eroor');
    })
  });

  var reloadMessages = function(){
    if(document.URL.indexOf("messages") !== -1){
    last_message_id = $('.message:last').data('message-id');
    console.log(last_message_id);
    // var act = $('#new_message').attr('action');
    // var g_id = $('.gid').attr('value');
    // var g_url = "/groups/" + g_id + "/api/messages"
    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){ 
      console.log(messages);
      messages.forEach(function(message){
        var html = buildMessageHTML(message);
        $('.contents__main__mid').append(html);
        console.log("アペンド");
      });
      var $scrollAuto = $('.contents__main__mid');
        $scrollAuto.animate({scrollTop: $scrollAuto[0].scrollHeight}, 'slow');
        console.log("スクロール");
    })
    .fail(function(){
      alert("error");
    });
  };
 };
    setInterval(reloadMessages, 5000);
});