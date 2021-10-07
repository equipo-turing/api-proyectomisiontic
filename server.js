import Express from 'express';


const app = Express();
app.use(Express.json());


app.listen(5000,()=>{
    console.log("Server iniciado papa")
});