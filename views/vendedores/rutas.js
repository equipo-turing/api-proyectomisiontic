import Express from 'express';

import {
    queryTodosVendedores,
    crearVendedor,
    consultarVendedor, 
    editarVendedor,
    eliminarVendedor 
} from '../../controllers/vendedores/controller.js';

const rutasVendedor = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los vendedores');
  } else {
    res.json(result);
  }
};

rutasVendedor.route('/vendedores').get((req, res) => {
  console.log('alguien hizo get en la ruta /vendedores');
  queryTodosVendedores(genercCallback(res));
});

rutasVendedor.route('/vendedores').post((req, res) => {
    crearVendedor(req.body, genercCallback(res));
});

rutasVendedor.route('/vendedores/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /vendedores');
  consultarVenta(req.params.id, genercCallback(res));
});

rutasVendedor.route('/vendedores/:id').patch((req, res) => {
    editarVendedor(req.params.id, req.body, genercCallback(res));
});

rutasVendedor.route('/vendedores/:id').delete((req, res) => {
  eliminarVenta(req.params.id, genercCallback(res));
});

export default rutasVendedor;
