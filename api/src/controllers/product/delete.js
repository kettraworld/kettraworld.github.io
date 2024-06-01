import product from '#model/product';

const $delete = async (req, res) => {
  
  const id = await product.findByPk(req.body.id);
  
  if (!id) return res.status(404).json({ error: 'Product id does not exist!' });
        
  await product.destroy({ where:{ id: req.body.id }});
  
  return res.status(200).json({ message: 'deleted product' });
  
};

export default $delete;