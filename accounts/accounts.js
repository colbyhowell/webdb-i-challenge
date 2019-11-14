const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()

router.get('/', (req, res) => {
    db('accounts')
        .then(buds => {
            res.status(200).json(buds)
        }).catch(err => {
            res.status(500).json({ message: 'The API could not be reached' })
        })
})

router.post('/', (req, res) => {
    const newData = req.body
    db('accounts')
        .insert(newData)
        .then(post => {
            if (!post[0]) {
                res.status(400).json({ message: "ID was not found" })
            } else {
                db('accounts').then(newDB => {
                    res.status(201).json(newDB)
                })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "This API could not be reached" })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    db('accounts')
        .where({ id })
        .update(updatedData)
        .then(up => {
            res.status(200).json(up)
        }).catch(err => {
            res.status(500).json({ message: "This ID could not be found" })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
        .where({ id })
        .del()
        .then(del => {
            res.status(200).json({ message: "The item was deleted", del })
        }).catch(err => {
            res.status(500).json({ message: "That item could not be deleted" })
        })
})

module.exports = router