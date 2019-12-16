const { Schema, model } = require('mongoose');

const AlunoModel = new Schema({
    nome: {
        type: String,
        required: true,
    },
    idade: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = model('Aluno', AlunoModel);