import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryTodosProducto = async (callback) => {
    const baseDeDatos = getDB();
    console.log('query');
    await baseDeDatos.collection('producto').find({}).limit(50).toArray(callback);
};

const crearProducto = async (nuevoproducto, callback) => {
    if (
        Object.keys(nuevoproducto).includes('identificacion')&&
        Object.keys(nuevoproducto).includes('descripcion')&&
        Object.keys(nuevoproducto).includes('valorUnitario')&&
        Object.keys(nuevoproducto).includes('estado')
      ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('producto').insertOne(nuevoproducto, callback);
      } else {
        return 'error';
    }
};

const editarProducto = async (otronombre,callback) => {
    const edicion = otronombre;
    const filtroEdicion={ _id:new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion={
        $set:edicion,
    }
    const baseDeDatos = getDB();
    await baseDeDatos
      .collection('producto')
      .findOneAndUpdate(filtroEdicion, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
};

export { queryTodosProducto,crearProducto,editarProducto,eliminarProducto};
