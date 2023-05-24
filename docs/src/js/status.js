$(document).ready(() => {

 $.ajax({
  url: 'https://api.minetools.eu/ping/ca02.heavyhost.com.br/25005',
  timeout: 10000,
  success: (result) => {
    if (result.error) {
      $('#status').html('<i class="fas fa-cube"></i> Offline');
    } else {
      $('#status').html(`<i class="fas fa-cubes"></i> ${result.players.online}/${result.players.max} Jogadores`);
    }
  },
  error: (error) => {
    $('#status').html('<i class="fas fa-cube"></i> Offline');
  }
 });
});