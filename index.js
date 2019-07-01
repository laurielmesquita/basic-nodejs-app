const express = require('express')

const server = express()

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Lauriel", "email": "laurielmesquita@me.com" }

const users = ['Diego', 'Robson', 'Victor']

server.get('/users/:index', (req, res) => {
  // const id = req.params.id
  const { index } = req.params // Destructuring

  return res.json([users[index]])
})

server.listen(3000)
