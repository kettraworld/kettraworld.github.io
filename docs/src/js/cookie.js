const buttons = document.querySelectorAll('#cookie');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		Cookies.set('POLICY', 'true', { expires: 7 });
		$('.cookie').remove();
	});
});

if (!Cookies.get('POLICY')) {
	$('.cookie').css('display', 'block');
}
