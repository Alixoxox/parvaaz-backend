import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const airlines_tb = pool;

const sql = `CREATE TABLE IF NOT EXISTS airlines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    airline_code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(50) NOT NULL,
    contact VARCHAR(100),
    info VARCHAR(255)
);`;

airlines_tb.query(sql, (error) => {
    if (error) {
        console.log("Error Occured while creating airlines table", error);
    } else {
        console.log("Airlines table ready");
    }
});

export default airlines_tb;