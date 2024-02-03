const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");










function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    //"Bare xxxx" =  forma como o token é azmazenado
    //split separa as palavras dentro de um vetor 
    const [, token ] = authHeader.split(" ");
    
    try {
        //sub é o conteúdo que ta armazenado dentro do jwt
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            id: Number(user_id),
        }

        return next();
    } catch{
        throw new AppError("JWT Token invãlido", 401);
    }
}

module.exports = ensureAuthenticated;