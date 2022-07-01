const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10
})
pool.on("connection", (connection) =>{
    console.log("Connection " + connection.threadId);
})
pool.on("error", (error) =>{
    console.log(error);
    console.log("Connected DB failed.");
    pool.end();
})
process.on('SIGINT', async() =>{
    console.log('Killed server successfully.');
    process.exit(0);
})

module.exports = pool;