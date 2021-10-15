// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import rutasVendedor from './views/vendedores/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasProducto from './views/producto/rutas.js';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://turing-misiontic.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-turing-mintic',
issuer: 'https://turing-misiontic.us.auth0.com/',
algorithms: ['RS256']
});
app.use(jwtCheck);
app.use(autorizacionEstadoUsuario);

app.use(rutasVendedor);
app.use(rutasUsuario);
app.use(rutasProducto);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
