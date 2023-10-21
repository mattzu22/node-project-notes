//driver sqlite3 vai estabelecer uma comunicação com a base de dados
const sqlite3 = require("sqlite3");
//driver sqlite é responsavel por conectar 
const sqlite = require("sqlite");

//path é uma dependencia propria do node que resolve o endereços de acordo com o ambiente, pq cada ambiente possue uma forma de navegação 
const path = require("path");

async function sqliteConnection(){
    //opne recebe um objeto com configurações da minha conexão
    //1- filename: aonde eu quero salvar o arquivo do meu banco de dados 
    //dirname- pega de forma automática aonde eu estou 
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });

    return database;
}
module.exports = sqliteConnection;