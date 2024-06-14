
$("#modal-shop").on('show.bs.modal', (e) => {
  $('#payment #id').val(e.relatedTarget.getAttribute('product'));
});

$("#payment-coupon").on('click', async (e) => {
 if (!$("#payment #coupon").val()) {
   
    await message('Você não adicionou nenhum código promocional!');
    
 } else {
  
 api.post('/payment/coupon', {
   id: $("#payment #id").val(),
   key: $("#payment #coupon").val()
 }).then(async(response) => {
   if (response.status == 200) {
      $("#payment-coupon").prop("disabled", true);

     $("#payment #coupon").prop("readonly", true);

      await message(`Parabens, você recebeu <b style="color: green;">${response.data.discount}%</b> de desconto na sua compra!`);
   } else if (response.status == 201) {
     await message('O codigo promocional ja expirou ou não esta disponível para este produto!');
   } else {
      await message('Por favor tente novamente mais tarde, se o problema continuar entre em contato pelo <a href="https://discord.gg/d3YgZTfZq5">discord</a>');
   };
    
 });
 
}
});