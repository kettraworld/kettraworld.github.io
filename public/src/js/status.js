
$(document).ready(() => {
	axios
		.get('https://api.minetools.eu/ping/ca02.heavyhost.com.br/25005', {
			timeout: 10000,
		})
		.then(result => {
			if (result.data.error) return $('#status').html(`<i class="fas fa-cube"></i> Offline`);

			$('#status').html(
				`<i class="fas fa-cubes"></i> ${result.data.players.online}/${result.data.players.max} Jogadores`,
			);
		});

	axios
		.get(
			'https://minecraft-mp.com/api/?object=servers&element=voters&key=qGf28ODBQJWj5fivrvDYDH7GdoFS5BxSMSd&month=current&format=json&limit=3',
			{ timeout: 10000 },
		)
		.then(result => {
			const voters = result.data.voters;
			let html = '';
			for (let i = 0; i < voters.length; i++) {
				const name = voters[i].nickname;
				const votes = voters[i].votes;

				html += `
          <div class="rank-card">
            <img src="https://cravatar.eu/head/${name}/128.png" alt="${name}" height="auto" width="auto">
            <h2 class="rank-card__title">${name}</h2>
            <p>Contendo <b>${votes}</b> votos!</p>
          </div>
        `;
			}
			$('#rank').html(html);
		})
		.catch(error => {
			console.error(error);
			$('#rank').html('<div style="width: 100%;" class="rank-card"><p>Ops! Não foi possível verificar a lista dos jogadores que votaram no servidor.</p></div>');
		});
});
