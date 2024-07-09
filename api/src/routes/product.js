import $create from '#controllers/product/create';
import $edit from '#controllers/product/edit';
import $view from '#controllers/product/view';
import $delete from '#controllers/product/delete';
import express from 'express';
const product = express.Router();

product.get('/', $view);
product.post('/create', $create);
product.post('/edit', $edit);
product.post('/delete', $delete);

export default product;
