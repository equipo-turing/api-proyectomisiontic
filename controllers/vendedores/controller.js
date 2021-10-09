import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryTodosVendedores = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('vendedor').find({}).limit(50).toArray(callback);
};

const crearVendedor = async (datosVendedor, callback) => {
    if (
        Object.keys(datosVendedor).includes('identificacion') &&
        Object.keys(datosVendedor).includes('nombre') &&
        Object.keys(datosVendedor).includes('especialidad') &&
        Object.keys(datosVendedor).includes('telefono') &&
        Object.keys(datosVendedor).includes('fecha_ingreso') 
      ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('vendedor').insertOne(datosVendedor, callback);
      } else {
        return 'error';
    }
};

const consultarVendedor = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vendedor').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVendedor = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('vendedor')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVendedor = async (id, callback) => {
  const filtroVendedor = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vendedor').deleteOne(filtroVendedor, callback);
};

export { queryTodosVendedores, crearVendedor, consultarVendedor, editarVendedor, eliminarVendedor };
