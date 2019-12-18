// CONFIGURANDO A API
const express = require('express');
const cors = require('cors');

// SETTANDO CORS E TIPO DE DADOS QUE A API VAI UTILIZAR
const app = express();
app.use(cors());
app.use(express.json());

// CONECTANDO A API AO BANCO MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_glfs74dt:89buu6coppna52ngcv9u22o5lq@ds143143.mlab.com:43143/heroku_glfs74dt', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => {
    console.log('Estou conectado!');
})

// GET -> REQUISITAR ALGUMA INFORMAÇÃO | PUT -> ALTERAR ALGUMA INFORMAÇÃO | POST -> CRIAR ALGUMA INFORMAÇÃO | DELETE -> DELETAR ALGUMA INFORMAÇÃO

// IMPORTANDO MODELO DE DADOS PARA TRABALHAR NO MONGODB
const Aluno = require('./models/alunos');

app.get('/', (req, res) => { 
    return res.send('Hello World');
})

app.get('/alunos', async (req, res) => {
    const alunos = await Aluno.find();
    return res.send(alunos);
})

app.get('/aluno/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const aluno = await Aluno.findById(id);
        return res.send(aluno);
    } catch (error) {
        return res.status(400).send('Coe, deu erro');
    }
})
app.post('/create', async (req, res) => {
    let { email } = req.body;
    try {
        if(await Aluno.findOne({ email }))
            return res.status(401).send('Esse e-mail ja foi cadastrado');

        const aluno = Aluno.create(req.body);
        return res.send('Teu aluno foi criado');
    } catch (error) {
        return res.status(400).send('Coe, deu erro');
    };
});
app.put('/update/:id', async (req, res) => {
    let { id } = req.params;
    try {
        await Aluno.findByIdAndUpdate(id, req.body, (err, _aluno) => {
            if(!err)
                return res.send('Atualizado com sucesso');
            else 
                return res.status(400).send(err);
        });
    } catch (error) {
        return res.status(400).send('Coe, deu erro');
    }
})
app.delete('/delete/:id', async (req, res) => {
    let { id } = req.params;
    try {
        await Aluno.findByIdAndDelete(id, (err, _aluno) => {
            if(!err) 
                return res.send('Deletado com sucesso');
            else
                return res.status(400).send(err);
        });
    } catch (error) {
        return res.status(400).send('Coe, deu erro');
    }
})

app.listen(8080, () => {
    console.log('Estou ouvindo!');
});
