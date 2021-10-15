import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryTodosUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  console.log("Entre a crearUsuario")
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);

};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};


const consultarOCrearUsuario = async (req, callback) => {
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log("entre a consultarOCrearUsuario")
  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ email: user.email }, async (err, response) => {
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'sin rol';
      user.estado = 'pendiente';
      await crearUsuario(user, (err, respuesta) => callback(err, user));
    }
  });
};

export { queryTodosUsuarios, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario ,consultarOCrearUsuario};
