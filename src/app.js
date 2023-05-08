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

/* //conexion base de datos
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user:"root",
    password:"root",
    database:"crud"
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
  });
 */
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
    const password = req.body.password;
    let passwoprdHaash = await bcryptjs.hash(password,8)
   conexion.query("INSERT INTO users SET ?", 
    {user:user, name : name, password: passwoprdHaash},
    async (error, resulultado)=>{
        if(error){
            console.log(error);
        }
            res.render('login');
           
    })
})


// Ruta de login
app.get('/login', (req, res) => {
    res.render('login');
  });

  //acceso login
app.post("/auth", async(req, res)=>{
    const  user = req.body.user;
    const password = req.body.password;
    let passwoprdHaash = await bcryptjs.hash(password,8);
    if(user && password){
   conexion.query("SELECT * FROM users WHERE user,password ?", [user],
        async(error, resultado) =>{
            if(resultado == 0){
                res.send("usuario yo passwoprd incorrecta");
            }
            res.render("home")
        })
    }
})

//Ruta home
app.get('/home', (req, res) => {
    res.render('home');
  });

//ruta logout

//ruta logout corta la sesion
app.get("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})








app.listen(app.get("port"),()=>{
    console.log(`servidor en el puerto`)
})

