const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "host": process.env.DB_HOST || "localhost",
        "username": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "@Abcd1234",
        "database": process.env.DB_NAME || "bookeasy",
        "port": process.env.DB_PORT || 3306,
        "dialect": "mysql",
        "dialectOptions": {
            "ssl": {
               "require": true
            },
            "multipleStatements": true
        },
        "logging": false
    },
    "production": {
        "host": process.env.DB_HOST || "localhost",
        "username": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "root",
        "database": process.env.DB_NAME || "bookeasy",
        "port": process.env.DB_PORT || 3306,
        "dialect": "mysql",
        "dialectOptions": {
            "ssl": {
               "require": true
            },
            "multipleStatements": true
        },
        "logging": false
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "dialectOptions": {
            "ssl": {
               "require": true
            },
            "multipleStatements": true
        },
        "logging": false
    }
}
