
const mysql = require ("mysql");
 
 //conexion base de datos
const conexion = mysql.createConnection({

    host: "sql7.freesqldatabase.com",
    port:  3306,
    user:"sql7615239",
    password:"MXWQR7ftSI",
    database:"sql7615239"
    /* host: "localhost",
    port: 8889,
    user:"root",
    password:"root",
    database:"crud" */
  });
  
  conexion.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
  });

  module.exports = conexion; 