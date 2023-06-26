const socket = io("wss://socket.kettraworld.shop", {
  withCredentials: true
});
const input = document.getElementById('input');
const send = document.getElementById('send');
const audio = new Audio("https://cdn.discordapp.com/attachments/1077666564880486503/1121196909302915083/notify.mp3");

const piii = new Piii({
  filters: [
    ...Object.values(piiiFilters)
  ],
  censor: badWord => {
    return badWord.charAt(0) + "*".repeat(badWord.length - 1)
  }
});

send.addEventListener('click', () => {
  if (input.value) {
    socket.emit('send-chat', {
      name: nick, message: piii.filter(input.value), time: new Date()
    });
    input.value = '';
    socket.emit('stop-typing');
  }
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

  $('.message-list').scrollTop($('.message-list')[0].scrollHeight);

});

socket.on('previous-chat', (message) => {
   message.forEach((chat) => {
    if (chat.name == nick) {
      $("#chat").append(`<li id="${chat._id}" class="message right">
        <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
        <p>${chat.message}</p>
      </li>`);
    } else {
      $("#chat").append(`<li id="${chat._id}" class="message left">
        <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
        <p>${chat.message}</p></li>`);
    }
  });

  $('.message-list').scrollTop($('.message-list')[0].scrollHeight);
});

input.addEventListener('input', () => {
  if (input.value) {
    socket.emit('typing', nick);
  } else {
    socket.emit('stop-typing');
  }
});

socket.on('typing', (typing) => {
  if (typing.length === 1 && typing[0].nick != nick) {
    $('#typing').html(`💡 ${typing[0].nick} está digitando...`);
  } else if (typing.length === 2 && typing[0].nick != nick) {
    $('#typing').html(`💡 ${typing[0].nick} e ${typing[1].nick} estão digitando...`);
  } else if (typing.length > 2 && typing[0].nick != nick) {
    $('#typing').html('💡 Várias pessoas estão digitando...');
  } else {
    $('#typing').html(' ');
  }
});

socket.on('stop-typing', () => {
  $('#typing').html('');
});
