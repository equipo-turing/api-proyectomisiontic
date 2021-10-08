// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVendedor from './views/vendedores/rutas.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVendedor);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
