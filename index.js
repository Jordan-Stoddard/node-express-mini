// import axios from 'axios': ES2015 Modules
const express = require('express') //CommonJS 

const greeter = require('./greeter.js')
const db = require('./data/db.js')


const server = express();

server.get('/', (req, res) => {
    res.json('alive')
})

server.get('/greet', (req, res) => {
    res.json({hello: 'stranger'})
})

server.get('/greet/:person', greeter)

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({message: 'we failed you, cant get the users'})
    })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(user => { 
        if(user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({message: 'Sorry, that user doesn\'t exist.'})
    }
    }).catch(err => {
        res
        .status(500)
        .json({message: 'we failed you, cant get that user'})
    })
})

server.listen(9000, () => console.log('the server is alive!'))

// http://localhost:9000/greet/carlos > {hello: carlos}
// http://localhost:9000/greet/kevin > {hello: kevin}
// http://localhost:9000/greet/chance > {hello: chance}