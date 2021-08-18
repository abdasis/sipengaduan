const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    secretKey: process.env.SECRET_KEY,
}