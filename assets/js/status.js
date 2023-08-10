
$(document).ready(() => {

 $.ajax({
  url: 'https://api.minetools.eu/ping/play.kettraworld.shop',
  timeout: 10000,
  success: async (data) => {
 
  if (data.error) return $('#status').html('<i class="fas fa-cube"></i> Offline');
   
  $('#status').html(`<i class="fas fa-cubes"></i> ${data.players.online}/${data.players.max} Jogadores`);
  },
  error: (error) => $('#status').html('<i class="fas fa-cube"></i> Offline')
  });
  
 });