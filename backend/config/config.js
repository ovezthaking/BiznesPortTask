import dotenv from 'dotenv'
dotenv.config()

export default {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'messages_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: 3306
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'messages_db_test',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: 3306
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306
    }
}