import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const crearVenta = async (nuevaVenta, callback) => {
    if (
        Object.keys(nuevaVenta).includes('identificador')&&
        Object.keys(nuevaVenta).includes('valorTotalVenta')&&
        Object.keys(nuevaVenta).includes('cantidad')&&
        Object.keys(nuevaVenta).includes('precioUnitario')&&
        Object.keys(nuevaVenta).includes('fechaVenta')&&
        Object.keys(nuevaVenta).includes('identificacionCliente')&&
        Object.keys(nuevaVenta).includes('nombreCliente')&&
        Object.keys(nuevaVenta).includes('nombreVendedor')&&
        Object.keys(nuevaVenta).includes('estado')
      ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('venta').insertOne(nuevaVenta, callback);
      } else {
        return 'error';
    }
};

const obtenerVentas = async (callback) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('venta').find({}).limit(50).toArray(callback);
};


const eliminarVenta = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').deleteOne(filtroProducto, callback);
};

export {crearVenta,obtenerVentas,eliminarVenta};