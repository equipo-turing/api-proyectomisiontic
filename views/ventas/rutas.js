import Express from 'express';

import {
    crearVenta,
    obtenerVentas,
    eliminarVenta,
    editarVenta
 } from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando las Ventas');
    } else {
      res.json(result);
    }
};

rutasVenta.route('/ventanueva').post((req, res) => {
    crearVenta(req.body, genercCallback(res));
});

rutasVenta.route('/venta').get((req, res) => {
    console.log('alguien hizo get en la ruta /venta');
    obtenerVentas(genercCallback(res));
});

rutasVenta.route('/ventaeliminar').delete((req, res) => {
  eliminarVenta(req.body.id, genercCallback(res));
});

rutasVenta.route('/ventaeditar').patch((req, res) => {
  editarVenta(req.body, genercCallback(res));
});

export default rutasVenta;