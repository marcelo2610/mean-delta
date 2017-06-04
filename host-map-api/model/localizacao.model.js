/**
 * Created by Marcelo on 27/05/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Localizacao = Schema({
    lat: Number,
    lon: Number,
    org: String,
    query: String,
    country: String,
    dominio: { type: String, max: 50 },
    dataHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Localizacao', Localizacao);
