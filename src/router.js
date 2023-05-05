const express = require("express");
const router = express.Router();
const conexion = require("./database/db");




//ruta para mostrar todos los registros
router.get("/listas",(req,res)=>{
  
 conexion.query("SELECT * FROM lista",(error, results)=>{
      if(error){
        throw error;
      }
      res.render("listas",{results:results});
    })
  })
  


//Ruta para añadir registros

router.get("/create",(req, res)=>{
  res.render("create");
})

//Ruta para editar 

router.get("/edit/:id",(req,res)=>{
  const id  = req.params.id;
  
  conexion.query("SELECT * FROM lista WHERE id=?", [id],(error, results)=>{
    if(error){
      throw error;
    }
    res.render("edit",{nota:results[0]});
  })
  })


//ruta para eliminar item

router.get("/delete/:id", (req,res)=>{
  const id = req.params.id;
  conexion.query("DELETE FROM lista WHERE id = ?", [id], (error, results)=>{
    if(error){
      throw error;
    }
    res.redirect("/listas");
  })
});



const crud = require("./controllers/crud");
router.post("/save", crud.save);
router.post("/update", crud.save);





module.exports = router; 



