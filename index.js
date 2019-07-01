// Call express
const express = require('express')

// Instace of express
const server = express()

// Seting up express to read requisition body like JSON
server.use(express.json())

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Lauriel", "email": "laurielmesquita@me.com" }

// CRUD: {Create, Read, Update, Delete}

// Array/Vector of users
const users = ['Diego', 'Robson', 'Victor']

// LISTING ALL USERS
server.get('/users', (req, res) => {
  return res.json(users)
})

// RETURN A USER BY INDEX
server.get('/users/:index', (req, res) => {
  // const id = req.params.id
  const { index } = req.params // Destructuring

  return res.json([users[index]])
})

// ADDING AN USER
server.post('/users', (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

// UPDATING AN USER
// '/users/:index' pega o usuário que será editado pelo seu index no arrey
server.put('/users/:index', (req, res) => {
  const { index } = req.params // Destructuring

  // Pagamos o nome que recebemos de dentro da requisição no body
  const { name } = req.body

  // Repõe a informação do nome existente com o novo nome que vem de dentro
  // do corpo da requisição acima
  users[index] = name

  // Retorna todos os usuários
  return res.json(users)
})

// DELETING A USER
server.delete('/users/:index', (req, res) => {
  const { index } = req.params // Destructuring

  // Busca a posição do index indicado e apaga um a partir dali
  users.splice(index, 1)

  // Retorna todos os usuários
  return res.send()
})

server.listen(3000)
