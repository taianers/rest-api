const express = require('express');
const router = express.Router();

//retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Todos os pedidos'
    });
});

//insere um pedido
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O pedido foi criado'
    });
});

//retorno os dados de um pedido
router.get('/:id_pedidos', (req, res, next) => {
    const id = req.params.id_pedidos;
    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id_pedidos: id
    });
});

//exclui um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluído'
    });
});

module.exports = router;