$(function(){
  function buildPost(message){
      var content = message.content ? `${message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html =  `<div class="chat-main__messages__message" data-id="${message.id}">
        <div class="chat-main__messages__message__upper-info">
          <div class="chat-main__messages__message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="chat-main__messages__message__upper-info__date">
            ${message.date}
          </div>
        </div>
        <div class="chat-main__messages__message__text">
          <p class="lower-message__content">
            <div>
            ${content}
            </div>
            ${img}
          </p>
        </div>
      </div>`
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.chat-main__messages').append(html)
      $("#new_message")[0].reset();
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
    .always(function(){
      $('.chat-main__form__new_message__submit-btn').prop('disabled', false);
    })
  })
})