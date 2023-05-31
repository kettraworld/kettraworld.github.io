const buttons = document.querySelectorAll('#cookie');
const exit = document.querySelectorAll('#exit');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		Cookies.set('POLICY', 'true', { expires: 7 });
		$('.cookie').remove();
	});
});

exit.forEach(button => {
	button.addEventListener('click', () => {
	  Cookies.remove('hash');
	});
});

if (!Cookies.get('POLICY')) {
	$('.cookie').css('display', 'block');
}
