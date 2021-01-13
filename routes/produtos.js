const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, comn) => {
        if (error) { return res.status(500).send({ error: error }) }
        comn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields) => {   
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: resultado})
            }
        )
    });
});

//insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, comn) => {
        if (error) { return res.status(500).send({ error: error }) }
        comn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                comn.release(); 
                if (error) { return res.status(500).send({ error: error }) }
                
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

//retorno os dados de um produto
router.get('/:id_produtos', (req, res, next) => {
    mysql.getConnection((error, comn) => {
        if (error) { return res.status(500).send({ error: error }) }
        comn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produtos],
            (error, resultado, fields) => {   
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: resultado})
            }
        )
    });
});

//altera um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, comn) => {
        if (error) { return res.status(500).send({ error: error }) }
        comn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produtos = ?',
            [req.body.nome, req.body.preco, req.body.id_produtos],
            (error, resultado, field) => {
                comn.release(); 
                if (error) { return res.status(500).send({ error: error }) }
                
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'
                });
            }
        )
    });
});

//exclui um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, comn) => {
        if (error) { return res.status(500).send({ error: error }) }
        comn.query(
            'DELETE FROM produtos WHERE id_produtos = ?', [req.body.id_produtos],
            (error, resultado, field) => {
                comn.release(); 
                if (error) { return res.status(500).send({ error: error }) }
                
                res.status(202).send({
                    mensagem: 'Produto removido com sucesso'
                });
            }
        )
    });
});

module.exports = router;