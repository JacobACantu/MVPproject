require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db/database')

const PORT = process.env.PORT || 8000

app.use(express.json())

app.use(express.static('public'));

//POST
app.post('/api/clients', async(req, res, next) => {
    try{
        const {client_name} = req.body
        if (typeof client_name !== 'string') {
            res.status(404).send('Bad Request')
        } else {
            let {rows} = await db.query('INSERT INTO clients (client_name) VALUES ($1) RETURNING *', [client_name])
            res.status(201).json(rows)
        }
    } catch (error) {
        console.log('Server Side Error')
        res.status(500).json(error)
    }
})

//GET ALL
app.get('/api/clients', async(req, res, next) => {
    try {
        let {rows} = await db.query('SELECT * FROM clients')
        res.status(200).json(rows)
    } catch (error) {
        console.log('Server Side Error')
        res.status(500).json(error)
    }
})

//GET ONE
app.get('/api/clients/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        let {rows} = await db.query('SELECT * FROM clients WHERE clients_id = $1', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

//UPDATE(PATCH)
app.patch('api/clients/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const {clients_name} = req.body;
        if (typeof clients_name !== 'string') {
            res.status(400).send('Bad Request')
        } else {
            let {rows} = await db.query('UPDATE clients SET clients_name = $1 WHERE clients_id =$2 RETURNING *', [clients_name, id])
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Server Side Error')
        res.status(500),json(error)
    }
})

//DELETE
app.patch('api/clients/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        let {rows} = await db.query('DELETE FROM clients WHERE clients_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Server Side Error')
        res.status(500).json(error)
    }
})

//listen to PORT
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
