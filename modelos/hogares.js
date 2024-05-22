const mongoose = require("mongoose");
const hogaresSchema = new mongoose.Schema({
    representante: String,
    nombre: String,
    habitantes: Number,
    direccion: {
        colonia: String,
        referencia: String,
        numero: Number,
    },
    salarioPromedio: Number
});
const hogaresModel = mongoose.model("hogares", hogaresSchema);

module.exports = hogaresModel;
