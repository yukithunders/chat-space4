$(function(){
  function buildHTML(message){

    var MessageImage = (message.image) ? `<img class=lower-message__image src= ${message.image}>`: "";
      
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
      ${MessageImage}
      </div>
      </div>`

    return html;
  }
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
      var html = buildHTML(data);
      $('.contents__main__mid').append(html);
      $(".form__submit").removeAttr("disabled");
      $('#new_message')[0].reset();
    })
    .fail(function(data){
      $(".form__submit").removeAttr("disabled");
      alert('eroor');
    })
  });
});