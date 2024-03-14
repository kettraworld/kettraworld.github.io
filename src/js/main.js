const $query = new URLSearchParams(window.location.search);
[...document.querySelectorAll('.toast')].map(x => new bootstrap.Toast(x));

if (Cookies.get('access_token_user')) {
  $("#login").attr("href", "/")
    .removeClass("mdi-login")
    .addClass("mdi-account-circle")
    .text("Dashboard");
};

if (Cookies.get('user_cookie') != 'authorized' && $query.get('cookie')) {
   $("#cookie").css('display', 'block');
};

$("#ip").on('click', () => {
 
	navigator.clipboard.writeText("play.kettraworld.com").then(() => {
	  
		setTimeout(() => {
			$("#play-copy-alert").addClass("show");
		}, 50);

		setTimeout(() => {
			$("#play-copy-alert").removeClass("show");
		}, 5000);
		
	});
	
});