const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Todos os produtos'
    });
});

//insere um produto
router.post('/', (req, res, next) => {
    
    /*const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };*/

    mysql.getConnection((error, comn) => {
        comn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                comn.release();
                
                if (error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

//retorno os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    if (id === '45') {
        res.status(200).send({
            mensagem: 'Você passou o ID especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
});

//altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});

//exclui um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto excluído'
    });
});

module.exports = router;