const dotenv = require("dotenv");
dotenv.config();

const databaseSettings = {
  dev: {
    connectionString: process.env.DB_URL,
    dbDialect: "postgres",
  },
  prod: {
    connectionString: process.env.DB_URL,
    dbDialect: "postgres",
  },
};

module.exports = databaseSettings;
