









const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file){
        //RENAME : renomar ou mover arquivos 
        await fs.promises.rename(path.resolve(uploadConfig.TMP_FOLDER, file),path.resolve(uploadConfig.UPLOADS_FOLDER, file));
        
        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            //o stat retorna o status do arquivo 
            await fs.promises.stat(filePath)
        } catch  {
            return;
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports = DiskStorage;