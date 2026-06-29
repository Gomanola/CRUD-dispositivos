const express = require('express');
const router = express.Router();
const Asignacion = require('./esquema');  // Apunta a esquema.js

// CREATE - POST
router.post('/', async (req, res) => {
  try {
    console.log('Creando asignación...');
    const nuevaAsignacion = new Asignacion(req.body);
    const asignacionGuardada = await nuevaAsignacion.save();
    
    res.status(201).json({
      mensaje: 'Asignación creada exitosamente',
      asignacion: asignacionGuardada
    });
  } catch (error) {
    console.error('Error al crear:', error);
    res.status(400).json({ error: error.message });
  }
});

// READ - GET TODAS
router.get('/', async (req, res) => {
  try {
    const asignaciones = await Asignacion.find();
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET UNA
router.get('/:id', async (req, res) => {
  try {
    const asignacion = await Asignacion.findById(req.params.id);
    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json(asignacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const asignacion = await Asignacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json({
      mensaje: 'Asignación actualizada',
      asignacion: asignacion
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const asignacion = await Asignacion.findByIdAndDelete(req.params.id);
    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json({ mensaje: 'Asignación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;