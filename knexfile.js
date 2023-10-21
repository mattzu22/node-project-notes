const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    useNullAsDefault: true, // Adicione a propriedade useNullAsDefault nesta seção
    migrations: {
      directory: path.resolve(__dirname,'src','database','migrations')
    }
  }
};
