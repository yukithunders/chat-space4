$(function(){
  var name_list = $(".user-search-add-list");
  var member_list = $(".user-search-result");

  function appendUser(user){

      var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
      ${user.name}
      </p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    </div>`

    name_list.append(html);
  }

  function append_add_Member(user_id,user_name){

    var add_list_html = `<div class="chat-group-user clearfix">
    <input name='group[user_ids][]' type='hidden' value=${user_id}>
  <p class='chat-group-user__name'>${user_name}</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${user_id} data-user-name=${user_name}>削除</div>`
    member_list.append(add_list_html);

    
  }

  function append_del_Member(user_id,user_name){

    var html = `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">
      ${user_name}
      </p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user_id} data-user-name=${user_name}>追加</div>
    </div>`

    name_list.append(html);
  }
  $(document).on('click','.user-search-add',function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    append_add_Member(user_id,user_name);
  })

  $(document).on('click','.user-search-remove',function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    append_del_Member(user_id,user_name);
  })

  $(".user-search-field").on("keyup", function() {
    var input = $(".user-search-field").val();
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: {keyword: input},
      dataType: 'json',
    })

    .done(function(users){
      $('.user-search-add-list').empty();
      if(users.length !== 0){
        users.forEach(function(user){
            appendUser(user);
        });
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    });
  });

  $('#new_group').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type: 'POST',
      url: '/groups',
      data: formData, 
      dataType: "json",
      processData: false,
      contentType: false
    })
  });
});