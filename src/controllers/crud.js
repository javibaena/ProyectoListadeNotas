
const conexion = require("../database/db");

exports.save = (req, res )=>{
    const titulo = req.body.titulo;
    const nota = req.body.nota;
   conexion.query("INSERT INTO lista SET ?", {titulo:titulo, nota:nota}, (error, results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect("listas");
    }
   })
}
exports.update = (req,res)=>{
    const id = req.body.id;
    const titulo = req.body.titulo;
    const nota = req.body.nota;
    conexion.query("UPDATE lista SET ?",[{titulo:titulo, nota:nota}, id] , (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect("listas");
        }
    })
}