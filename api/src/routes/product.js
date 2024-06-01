import $create from '#controllers/product/create';
import $edit from '#controllers/product/edit';
import $view from '#controllers/product/view';
import $delete from '#controllers/product/delete';
import auth from '#middleware/auth/api';
import express from 'express';
const product = express.Router();

product.get('/', $view);
product.post('/create', auth, $create);
product.post('/edit', auth, $edit);
product.post('/delete', auth, $delete);

export default product;
