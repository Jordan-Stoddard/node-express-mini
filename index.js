// import axios from 'axios': ES2015 Modules
const express = require('express') //CommonJS 

const greeter = require('./greeter.js')
const db = require('./data/db.js')


const server = express();

// middleware
server.use(express.json()) // Teaches express how to parse the JSON request body

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

server.post('/api/users', async (req, res) => {
    try {
        const userData = req.body
        const userId = await db.insert(userData)
        const user = await db.findById(userId.id)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: 'error creating user', error})
    }
})

// error !== exception

// server.post('/api/users', (req, res) => {
//     const userData = req.body
//         db.insert(req.body)
//         .then(userId => {
//             res.status(201).json(userId)
//         }).catch(error => {
//         res.status(500).json({message: 'error creating user', error})


server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
        res.status(200).json(count)
    }).catch(err => {
        res.status(500).json({message: 'error deleting user'})
    })
})

server.put('api/users/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    db.update(id, changes)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({messsage: 'error updating the user'})
    })
})
    
server.get('/users', (req, res) => {
 const {id} = req.query;

 if(id) {
    db.findById(id).then(users => res.send(users))
 } else {
     db.find().then(users => res.send(users))
 }

})




server.listen(9000, () => console.log('/n ==the server is alive!== /n'))

// http://localhost:9000/greet/carlos > {hello: carlos}
// http://localhost:9000/greet/kevin > {hello: kevin}
// http://localhost:9000/greet/chance > {hello: chance}