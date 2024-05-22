const express = require('express');
const ruta = express.Router();
const Hogar = require('../modelos/hogares');

ruta.get("/", async (req, res) => {
    try {
        const hogares = await Hogar.find();
        res.json(hogares);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

ruta.post("/", async (req, res) => {
    console.log(req.body)
    const hogar = new Hogar({
        representante: req.body.representante,
        nombre: req.body.nombre,
        habitantes: req.body.habitantes,
        direccion: {
            colonia: req.body.direccion.colonia,
            referencia: req.body.direccion.referencia,
            numero: req.body.direccion.numero,
        },

        salarioPromedio: req.body.salarioPromedio
    });
    try {
        const nuevoHogar = await hogar.save();
        console.log('saved hogar');
        res.status(201).json(nuevoHogar);
        
    } catch (err) {
        console.log('failed')
        res.status(400).json({ message: err.message });
    }
})

ruta.get('/:id', getHogar, (req, res) => {
    res.json(res.hogar);
})

async function getHogar(req, res, next) {
    let hogar;
    console.log('searching Hogar')
    try {
        hogar = await Hogar.findById(req.params.id);
        if (hogar == null) {
            return res.status(404).json({ message: 'Hogar no Encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.hogar = hogar;
    next();
}


ruta.put('/:id', getHogar, async(req, res) =>{
    if(req.body.representante != null){
        res.hogar.representante = req.body.representante;
    }if(req.body.apellido != null){
        res.hogar.apellido = req.body.apellido;
    }
    try{
        const hogarActualizado = await res.hogar.save();
        res.json(hogarActualizado);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = ruta;