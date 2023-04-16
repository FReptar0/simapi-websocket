// server/models/Camilla.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioSchema = new Schema({
  matutino: [String],
  vespertino: [String],
  nocturno: [String],
});

const CamillaSchema = new Schema({
  idCamillas: String,
  nombre: String,
  numeroExpediente: String,
  idInstitucion: String,
  idEnfermera: [HorarioSchema],
  estado: Boolean,
  estadoAlarma: Boolean,
  idSala: Number,
  idIsla: Number,
  idBoton: Number
});

const Camilla = mongoose.model('Camilla', CamillaSchema);

module.exports = Camilla;
