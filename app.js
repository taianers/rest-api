const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')

app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json());// apenas dados json no body

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

//não encontrou rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;