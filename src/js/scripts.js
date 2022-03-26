
var ip = document.querySelector('#ip');
var ipSpan = ip.querySelector('span');
var ipTextarea = ip.querySelector('textarea');
ip.addEventListener('click', function () {
  ip.classList.add('is-active');
  setTimeout(() => {
    ip.classList.remove('is-active');
  }, 1500);

  ipTextarea.classList.add('is-active');
  ipTextarea.value = ipSpan.innerHTML;
  ipTextarea.select();
  ipTextarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  ipTextarea.classList.remove('is-active');
});

$.getJSON('https://api.minetools.eu/ping/br-arm-7.enxadahost.com/10972' , function(data) {
  if (data.error) {
    $('#status').html('<i class="fas fa-times"></i> Servidor offline');
    $('#motd').html('-');
    $('#online').html('-');
  } else {
    $('#status').html('<i class="fas fa-check"></i> Servidor online');
    $('#motd').html(data.description.replace(/§(.+?)/gi, ''));
    $('#online').html(data.players.online);
  }
});

$('.navbar-burger').on('click', function() {
  document.querySelector('.navbar-menu').classList.toggle('is-active');
});