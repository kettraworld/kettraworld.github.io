const socket = io("wss://socket.kettraworld.shop");
const audio = new Audio('../src/music/plin.mp3');
const send = document.querySelectorAll("#send");
const notify = document.querySelectorAll("#notify");
const input = $('input');

const piii = new Piii({
  filters: [
    ...Object.values(piiiFilters)
  ],
  censor: badWord => {
    return badWord.charAt(0) + "*".repeat(badWord.length - 1)
  }
});

send.forEach(button => {
 button.addEventListener('click', (click) => {
  if (input.val()) {
    socket.emit('send-chat', {
      name: nick,
      message: piii.filter(input.val()), 
      time: new Date()
   });
    input.val(" ");
    socket.emit('stop-typing');
    }
  });
});

socket.on('chat', (chat) => {

  if (chat.name == nick) {
    $("#chat").append(`<li id="${chat._id}" class="message right">
      <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
      <p>${chat.message}</p></li>`);
  } else {
    audio.play();
    $("#chat").append(`<li id="${chat._id}" class="message left">
      <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
      <p>${chat.message}</p></li>`);
  }

  Cookies.set('view', chat._id);
  $('.message-list').scrollTop($('.message-list')[0].scrollHeight);

});

socket.on('previous-chat', (message) => {
   message.forEach((chat) => {
    if (chat.name != nick) {
      $("#chat").append(`<li id="${chat._id}" class="message right">
        <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
        <p>${chat.message}</p>
      </li>`);
    } else {
   
  if (Cookies.get('view') && Cookies.get('view') == chat._id.toString()) return $('#notify').html('<div class="notify"><i class="fas fa-bell"></i> Novas mensagens disponíveis</div>');
    
  $("#chat").append(`<li id="${chat._id}" class="message left"><author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author><p>${chat.message}</p></li>`);
    }
  });
 
     $('.message-list').scrollTop($('.message-list')[0].scrollHeight);
});

input.on('input', () => {
  if (input.val()) {
    socket.emit('typing', nick);
  } else {
   socket.emit('stop-typing');
  }
});

socket.on('typing', (typing) => {
 if (typing.length === 1/* */) {
    $('#notify').html(`<div class="notify">💡 ${typing[0].nick} está digitando...</div>`);
 } else if (typing.length === 2/* */) {
   $('#notify').html(`<div class="notify">💡 ${typing[0].nick} e ${typing[1].nick} estão digitando...</div>`);
 } else if (typing.length > 2/* */) {
   $('#notify').html('<div class="notify">💡 Várias pessoas estão digitando...</div>');
 } else {
   $('#notify').html('');
 }
});

socket.on('stop-typing', () => {
  $('#notify').html('');
});


notify.forEach(button => {
 button.addEventListener('click', (click) => {
 
  $('.message-list').scrollTop($(`li#${Cookies.get('view')}`).position().top - $('.message-list').offset().top);
 });
 
});