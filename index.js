var mysql = require('mysql'); //importamos mysql y se guarda en una variable 
const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler'); // Importar asyncHandler
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json());




// Configurar CORS
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type'],
  allowedMethods: ['GET', 'POST'],
}));

var conexion = mysql.createConnection({
  host: 'localhost',
  database: 'vivise',
  user: 'root',
  password: 'familia2012x'
});



// Otros middlewares y configuraciones que puedas necesitar

// Utiliza el router para las rutas relacionadas con practicasINF   // '/practicasINF' es la ruta donde accedemos a los datos... En Postman... http://localhost:3000/practicasINF/nombreFuncion (METODO GET)

app.get('/a', (req, res) => {
  conexion.query('SELECT * FROM productos', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/cupones', (req, res) => {
  conexion.query('SELECT * FROM cupones_descuentos', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/getCupon', asyncHandler(async (req, res) => {
  let param = {
    cupon: req.body.cupon
  }
  console.log(param)
  conexion.query('SELECT * FROM cupones_descuentos WHERE codigo_cupon = ? ', [param.cupon], (error, results, fields) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json({ message: 'El cupón existe',results: JSON.stringify(results) });
    } else {
      res.json({ message: 'El cupón no existe' });
    }
  })
}));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});