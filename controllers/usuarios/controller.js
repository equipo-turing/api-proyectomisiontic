import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryTodosUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
    if (
        Object.keys(datosUsuario).includes('identificacion') &&
        Object.keys(datosUsuario).includes('nombre') &&
        Object.keys(datosUsuario).includes('rol') 
      ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
      } else {
        return 'error';
    }
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

export { queryTodosUsuarios, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario };
