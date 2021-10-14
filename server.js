// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';//para compartir recursos entre dos servidores
import dotenv from 'dotenv';
//import { conectarBD } from './db/db.js';
import rutasVendedor from './views/vendedores/rutas.js';
import { MongoClient, ObjectId } from 'mongodb';

let baseDeDatos;

const stringConexion="mongodb+srv://walter:univalle123@proyectomisionticapi.y5f0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVendedor);

app.get('/producto',(req,res)=>{
  baseDeDatos.collection('producto').find({}).limit(50).toArray((err,result)=>{
    if(err){
      console.error(err);
      res.status(500).send('error consultando producto')
    }else{
      res.json(result);
    }

  })
 
});

app.post('/productonuevo',(req,res)=>{
  const nuevoproducto=req.body;//atrapa la informacion que viene del front
  
    if(
      Object.keys(nuevoproducto).includes('identificacion')&&
      Object.keys(nuevoproducto).includes('descripcion')&&
      Object.keys(nuevoproducto).includes('valorUnitario')&&
      Object.keys(nuevoproducto).includes('estado')
    ){
      baseDeDatos.collection('producto').insertOne(nuevoproducto,(err,result)=>{
        if(err){
          console.error(err);
          res.sendStatus(500);
        }else{
          console.log(result)
          res.sendStatus(200)
        }

      });
      
  
    }});

app.patch('/productoeditar',(req,res)=>{
  const edicion=req.body;
  const filtroEdicion={ _id:new ObjectId(edicion.id)};
  delete edicion.id;
  const operacion={
    $set:edicion,
  }
  baseDeDatos.collection('producto').findOneAndUpdate(filtroEdicion,operacion,{upsert:true, returnOriginal:true},(err,result)=>{
    if(err){
      console.error(err);
      res.status(500).send('error consultando producto')
    }else{
      console.log("actualizado con exito");
      res.sendStatus(200);
    }

  });

});

app.delete('/productoeliminar/',(req,res)=>{
  const eliminar=req.body;
  const filtroEliminar={ _id:new ObjectId(eliminar.id)};
  baseDeDatos.collection('producto').deleteOne(filtroEliminar,(err,result)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);

    }
    else{
      res.sendStatus(200);
      console.log("eliminado con exito")

    }

  });

});
 


const main = () => {
client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      
    }
    baseDeDatos = db.db('turingapi');
    console.log('baseDeDatos exitosa');
    return app.listen(process.env.PORT, () => {
      console.log(`escuchando puerto ${process.env.PORT}`);
    });
    
  });

  
};

//conectarBD(main);
main();
