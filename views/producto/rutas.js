import Express from 'express';

import {
    queryTodosProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
    /*,crearVendedor,
    consultarVendedor, 
    editarVendedor,
    eliminarVendedor*/ 
} from '../../controllers/productos/controller.js';

const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los vendedores');
    } else {
      res.json(result);
    }
};

rutasProducto.route('/producto').get((req, res) => {
    console.log('alguien hizo get en la ruta /vendedores');
    queryTodosProducto(genercCallback(res));
});

rutasProducto.route('/productonuevo').post((req, res) => {
    crearProducto(req.body, genercCallback(res));
});


rutasProducto.route('/productoeditar').patch((req, res) => {
    editarProducto(req.body, genercCallback(res));
});

rutasProducto.route('/productoeliminar').delete((req, res) => {
    eliminarProducto(req.body.id, genercCallback(res));
});
export default rutasProducto;
