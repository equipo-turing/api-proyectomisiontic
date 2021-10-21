import Express from 'express';

import {
    crearVenta,
    queryTodasVentas
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
    queryTodasVentas(genercCallback(res));
});

export default rutasVenta;