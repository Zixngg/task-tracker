require('dotenv').config(); //read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.DB_HOST, //get host from environment variable
    user     : process.env.DB_USER, //get user from environment variable
    password : process.env.DB_PASSWORD, //get password from environment variable
    database : process.env.DB_DATABASE, //get database from environment variable
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true //return date as string instead of Date object
}

// Validate environment variables
if (!setting.host || !setting.user || !setting.password || !setting.database) {
    console.error('ERROR: Missing database environment variables!');
    console.error('Required: DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE');
    console.error('Current values:', {
        host: setting.host ? 'SET' : 'MISSING',
        user: setting.user ? 'SET' : 'MISSING',
        password: setting.password ? 'SET' : 'MISSING',
        database: setting.database ? 'SET' : 'MISSING'
    });
}

const pool = mysql.createPool(setting);

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:', err.message);
        console.error('Error code:', err.code);
    } else {
        console.log('Database connected successfully');
        connection.release();
    }
});

module.exports = pool;