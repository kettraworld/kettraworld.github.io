const socket = io("http://129.148.43.196:8080");
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
  }
});

socket.on('chat', (chat) => {

  if (chat.name == nick) {
    $("#chat").append(`<li class="message right">
      <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
      <p>${chat.message}</p></li>`);
  } else {
    audio.play();
    $("#chat").append(`<li class="message left">
      <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
      <p>${chat.message}</p></li>`);
  }

  $('.message-list').scrollTop($('.message-list')[0].scrollHeight);

});

socket.on('previous-chat', (message) => {
  message.forEach((chat) => {
    if (chat.name == nick) {
      $("#chat").append(`<li class="message right">
        <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
        <p>${chat.message}</p></li>`);
    } else {
      $("#chat").append(`<li class="message left">
        <author><b>${chat.name}</b> - ${moment(chat.time).locale('pt-br').calendar()}</author>
        <p>${chat.message}</p></li>`);
    }
  });

  $('.message-list').scrollTop($('.message-list')[0].scrollHeight);
});
