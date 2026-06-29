const mongoose = require('mongoose');

const SchemaAsignacion = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  nombre: {
    type: String,
    required: true,
  },
  hardware: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha_fabricación: {
    type: Date,
    default: Date.now,
  },
});

SchemaAsignacion.pre('save', async function() {
  if (this.isNew) {
    const ultimoDoc = await mongoose.model('Asignacion').findOne().sort({ id: -1 }).exec();
    this.id = ultimoDoc ? ultimoDoc.id + 1 : 1;
  }
});

module.exports = mongoose.model('Asignacion', SchemaAsignacion);