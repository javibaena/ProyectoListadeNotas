const express = require("express");
const app = express();
const session = require("express-session");
const bcryptjs = require('bcryptjs');
const path = require("path");
/* const mysql = require ("mysql"); */
const conexion = require("./database/db")
const bodyParser = require("body-parser");//modulo body-parser


//settings

app.set("port", process.env.PORT || 3001);
/* para convertir json a objeto que llegen desde las conexiones */
app.use(bodyParser.json());
/* para capturar datos del formulario */
app.use(bodyParser.urlencoded({extended: true}));


// Configuración de la plantilla EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views") );

//importacion Routes
app.use("/", require("./router"))

// Configuración de la sesión
    app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
  })); 

// Configuración de la carpeta 'public' como carpeta de archivos estáticos
app.use(express.static('public'));
/* directorio public */
app.use("/resources", express.static("public"));
app.use(express.static("public")); 
app.use("/resources", express.static(__dirname + "/public"))


// Ruta de inicio
app.get('/', (req, res) => {
    res.render('index');
  });
// Ruta de registro
app.get('/registro', (req, res) => {
    res.render('registro');
  });
  // Ruta de registro (POST)
  app.post("/register", async (req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass,8)
   conexion.query("INSERT INTO users SET ?", 
    {user:user, name : name, pass: passwordHaash},
    async (error, resulultado)=>{
        if(error){
            console.log(error);
        }
            console.log("el alta fue exitosa")
            res.render('login');

           
    })
    
})
// Ruta de login
app.get('/login', (req, res) => {
  
    res.render('login');
  });
  //Ruta Error
  app.get("/error",(req, res)=>{
    res.render("error")
  })


  //acceso login
 app.post("/auth", async(req, res)=>{
    const  user = req.body.user;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass,8);
    if(user && pass){
   conexion.query("SELECT * FROM users WHERE user = ?", [user],
        async(error, resultado) =>{
            if(resultado.length== 0 || !(await bcryptjs.compare(pass, resultado[0].pass))){
                res.render("error");
            }
            res.render("home");
        
        })
    }
})  

//Ruta home
app.get('/home', (req, res) => {
    res.render('home');
  });
//ruta logout corta la sesion
app.get("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})





app.listen(app.get("port"),()=>{
    console.log(`servidor en el puerto`)
})

