module.exports = {
    jwt:{
        //gerar o token 
        secret: process.env.AUTH_SECRET || "default",
        expiresIn: "1m",
    }
}