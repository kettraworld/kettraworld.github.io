
if (Cookies.get('access_token_user')) {
    $("#login").attr("href", "/pages/user/dashboard.html").removeClass("mdi-login").addClass("mdi-account-circle").text("Dashboard");
};

const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", (event) => {
	event.preventDefault();
	var ip = "play.kettraworld.com"; 
	navigator.clipboard.writeText(ip).then(() => {
		var popup = document.getElementById("play-copy-alert");
		
		setTimeout(function() {
			popup.classList.add("show");
		
		}, 50);

		setTimeout(function() {
			popup.classList.remove("show");
		}, 5000);
	});
});