//importando o express para o projeto 
const express = require("express");

//Inicializar o express
const app = express();
app.use(express.json());

//get método pra buscar alguma informação, no primeiro parâmetro vc recebe a rota e no segundo uma função que recebe dois parâmetros, 1- requisição que foi feita 2- resposta que vai ser enviada 
app.get("/", (request, response)=>{
    //send enviar uma resposta pra essa requisição 
    response.send("Primeira Rotda")
})

//rota com parâmetros obrigatórios
app.get("/envio/:id/:name", (request, response)=>{
    const { id, name } = request.params
    response.send(`Rota com parâmetro ${id} e usuário ${name}`)
})

//rotas com parâmetros opicionais, além de poder passara vários parâmetros por uma mesma rota, perceba que eu posso abstrair esses params da rota 
app.get("/users", (request, response) =>{
    const { page, limit } = request.query
    response.send(`página : ${page} e limit: ${limit}`)
})

app.post("/users", (request, response) =>{
    const { name, user, password } = request.body
    //DA PRA ENVIAR COM O SEND, E ELE VAI RETORNA PARECIDO UM ARQUIVO HTML
    // response.send(`O nome é ${name}, nome do usuário${user}, senha é ${password}`)

    //ou como formato json
    response.json({ name, user, password })
})

//PORTA aonde vai receber e enviar respostas
const PORT = 3333;

//listen pra ficar escutando em qual porta ele vai abrir 
app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));