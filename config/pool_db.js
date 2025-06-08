import mysql from "mysql"
import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './dotenv.js'

// Create a shared connection pool
const pool = mysql.createPool({
    connectionLimit: 5,     // Stay under 5 connection limit
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
});

// Pool event handlers
pool.on('connection', function (connection) {
    console.log('DB connection established as id ' + connection.threadId);
});

pool.on('error', function(err) {
    console.error('Database pool error:', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting to database...');
    }
});

// Promise wrapper for queries
export function queryAsync(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

export default pool;