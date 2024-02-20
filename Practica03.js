const express = require('express');
const app = express();
const PORT = 5000;

// Arreglo global para almacenar los datos del body de las peticiones POST
let data = [];

// Middleware para parsear el body de las peticiones POST
app.use(express.json());

// Ruta GET sin parámetros
app.get('/hola', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Ruta GET con parámetros
app.get('/hola/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.send(`¡Hola, ${nombre} desde Express!`);
});

// Ruta GET con query
app.get('/saludo', (req, res) => {
  const nombre = req.query.nombre;
  res.send(`¡Hola, ${nombre || 'mundo'} desde Express!`);
});

// Ruta POST para guardar datos en el arreglo global
app.post('/guardar', (req, res) => {
  const bodyData = req.body;
  data.push(bodyData);
  res.send('Datos guardados correctamente');
});

// Ruta para obtener los datos guardados en el arreglo global
app.get('/datos', (req, res) => {
  res.json(data);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


// Ruta DELETE para eliminar datos
app.delete('/eliminar/:indice', (req, res) => {
    const indice = req.params.indice;
    if (indice < 0 || indice >= data.length) {
      res.status(400).send('Índice inválido');
    } else {
      data.splice(indice, 1);
      res.send('Datos eliminados correctamente');
    }
  });

