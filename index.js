// Call express
const express = require('express')

// Instace of express
const server = express()

// Seting up express to read requisition body like JSON
server.use(express.json())

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Lauriel", "email": "laurielmesquita@me.com" }

// CRUD: Create/Read/Update/Delete
// Array/Vector of users
const users = ['Diego', 'Robson', 'Victor']

server.use((req, res, next) => {
  console.time('Request')
  console.log(`Método: ${req.method}, URL: ${req.url}`)

  next()

  console.timeEnd('Request')
})

// Local midleware
// CHECAR SE EXISTE NOME NO CORPO DA REQUISIÇÃO
function checkUserExists (req, res, next) {
  // Verifica se a negação é verdadeira
  // Verifica se no corpo da requisição existe a propriedade name
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' })
  }

  return next()
}

// Local midleware
// CHECAR SE EXISTE O INDEX INDICADO DENTRO DO ARRAY
function chekUserInArray (req, res, next) {
  const user = users[req.params.index]

  // Verifica se a negação é verdadeira
  // Verifica se o index existe dentro array
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' })
  }

  req.user = user

  return next()
}

// LISTING ALL USERS
server.get('/users', (req, res) => {
  return res.json(users)
})

// RETURN A USER BY INDEX
server.get('/users/:index', chekUserInArray, (req, res) => {
  // const id = req.params.id
  // const { index } = req.params // Destructuring

  return res.json(req.user)
})

// ADDING AN USER
<<<<<<< HEAD
server.post('/users', checkUserExists, (req, res) => {
=======
server.post('/users', chekUserInArray, checkUserExists, (req, res) => {
>>>>>>> 8657a23... Added midleware configs
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

// UPDATING AN USER
// '/users/:index' pega o usuário que será editado pelo seu index no arrey
server.put('/users/:index', chekUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params // Destructuring

  // Pagamos o nome que recebemos de dentro da requisição no body
  const { name } = req.body

  // Repõe a informação do nome existente com o novo nome que vem de dentro
  // do corpo da requisição acima
  users[index] = name

  // Retorna todos os usuários
  return res.json(users)
})

// DELETING AN USER
server.delete('/users/:index', chekUserInArray, (req, res) => {
  const { index } = req.params // Destructuring

  // Busca a posição do index indicado e apaga um a partir dali
  users.splice(index, 1)

  // Retorna todos os usuários
  return res.send()
})

server.listen(3000)
