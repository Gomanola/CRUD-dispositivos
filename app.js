require('dotenv').config();
const express = require('express');
const connectionDB = require('./src/database/connection.js');
const asignacionRutas = require('./src/database/funciones.js');

const app = express();

app.use(express.json());

app.use(express.static('public'));

connectionDB();

app.use('/api/asignaciones', asignacionRutas);

app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Servidor activo'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});