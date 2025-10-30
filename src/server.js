require("dotenv").config();
require("express-async-errors");
// const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const cors = require("cors")

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

const routes = require("./routes");
const checkENV = require("./utils/checkENV");

//static = serve para servir arquivos estaticos DO back
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// migrationsRun();

app.use((error, request, response, next) =>{
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

const PORT = checkENV("PORT") || 5176;

app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));