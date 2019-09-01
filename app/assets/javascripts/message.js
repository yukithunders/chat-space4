$(function(){
  function buildHTML(message){
    var html = `<p class="lower-message__content">
    ${message.content}
    ${message.name}
    </p>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    //console.log(formData.get(content));
    //console.log(formData.get(image));
    console.log(formData);

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
      $('.lower-message').append(html);
      $('.textbox').val('');
    })
    .fail(function(data){
      console.log("きていない")
      console.log(data);
      alert('eroor');
    })
  });
});