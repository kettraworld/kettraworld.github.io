
if(!Cookies.get('hash')) {
  window.location = '/dashboard/auth2.html';
}

const hash = Base64.decode(Cookies.get('hash'));

const [nick, password] = hash.split("/");

$(document).ready(() => {
$('#card-2').html(`
  <img class="card-img" src="https://api.kettraworld.shop/player/skin/${nick}">
    <div class="player-name">
      <h1>${nick}</h1>
     </div>
     <div class="card-buttons">
   <button class="card-button"><i class="fas fa-undo-alt"></i></button>
   <button class="card-button"><i class="fas fa-info"></i></button>
    <button class="card-button"><i class="fas fa-sign-in-alt"></i></button>
   </div>
`);
});