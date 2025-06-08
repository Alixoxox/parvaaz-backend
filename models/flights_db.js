import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const flights_tb = pool;
const sql=`CREATE TABLE IF NOT EXISTS flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    airline_id INT NOT NULL,
    flight_code VARCHAR(10) NOT NULL UNIQUE,
    total_seats INT NOT NULL DEFAULT 200,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE CASCADE
);`

flights_tb.query(sql,(error)=>{
    if(error){
        console.log("Error Occured while creating Flights table",error);
    }else{
        console.log("Flights table ready");
    }
})
export default flights_tb;