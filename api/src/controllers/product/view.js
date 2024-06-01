import product from '#model/product';

const $view = async (req, res) => {
  await product.findAll().then(itens => {
    
    if (!itens[0]) return res.status(404).json({ error: 'No products were registered.'})
    
    res.status(200).json(itens);
    
  });
};

export default $view;