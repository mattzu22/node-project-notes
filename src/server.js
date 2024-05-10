require("dotenv/config");
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const cors = require("cors")

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

const routes = require("./routes")

//static = serve para servir arquivos estaticos DO back
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

migrationsRun();

app.use((error, request, response, next) =>{
    //istanceof que dizer que o  error vem de uma instancia do Apperror
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));