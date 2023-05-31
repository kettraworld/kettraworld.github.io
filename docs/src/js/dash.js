
if(!Cookies.get('hash')) {
  window.location = '/dashboard/auth2.html';
}

const hash = Base64.decode(Cookies.get('hash'));

const [nick, password] = hash.split("/");

$(document).ready(() => {
  
$.getJSON(`https://api.kettraworld.shop/player/skin/${nick}`, (data) => {
 $('#player_skin').html(`<img class="card-img" src="https://mc-heads.net/head/${data.skin}">`);
});

$('#player_name').html(`<div class="player-name"><h1>${nick}</h1></div>`);

});
