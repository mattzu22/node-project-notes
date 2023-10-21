class AppError{
 message;
 statusCode;
//o método constructor é carregado automaticamente quando a class e instanciada/
//entao toda vez que essa class for instanciada eu vou querer saber sobre o message e o status code
//como nem sempre vc vai querer enviar um status code vc deixa ele com um valor padrão, nesse caso o 400 que quer dizer que foi um erro do lado do cliente  
 constructor(message, statusCode = 400){
    this.message = message
    this.statusCode = statusCode
 }
}   

module.exports = AppError;