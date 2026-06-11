require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true, 
        trustServerCertificate: false 
    },
    pool: {
        max: 10, 
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Membuat pool koneksi berbasis Promise
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('DBHelper: Berhasil terhubung ke Azure SQL Database!');
        return pool;
    })
    .catch(err => {
        console.error('DBHelper: Koneksi Database Gagal:', err);
    });

module.exports = {
    sql,
    poolPromise
};