const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


let db = [
  { '1': { Produto: 'produto 1', Valor: '20'}},
  { '2': { Produto: 'produto 2', Valor: '20'}},
  { '3': { Produto: 'produto 3', Valor: '20'}}
]

let db2 = [
  { '1': { Nome: 'Felipe', Senha: '120'}},
  { '2': { Nome: 'Maria', Senha: '220'}},
  { '3': { Nome: 'Karen', Senha: '1220'}}
]
app.get('/users', function(req,res){
 return res.json(db2)
})

app.get('/', function(req,res){
 return res.json(db)
})

app.post('/logar/:usuario/:senha', function(req,res){
  let usuario = req.params.usuario;
  let senha = req.params.senha;

  if (usuario == "Felipe" && senha =="1234"){
    res.end("Seja bem-vindo " + usuario );
  }else {
    res.end("Credenciais inválidas!");
  }
})

app.post('/add', function(req, res){
const body = req.body

  if(!body)
    return res.status(400).end()

  db2.push(body)
    return res.json(body)

})

app.get("/:id", function(req,res){
  const id = req.params.id

let newDB = db2.filter(item => {
  if(item[id])
    return item
})
return res.send(newDB)
})



app.listen(8081, function(){
  console.log("Servidor rodando na url http://localhost:8081");
});
