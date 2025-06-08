import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const baggage_tb = pool;
const sql=`CREATE TABLE IF NOT EXISTS baggage(
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    weight FLOAT NOT NULL,             -- In kgs
    size_tag VARCHAR(10),              -- like 'S', 'L', 'XL',"XXL"
    extra_charge FLOAT DEFAULT 0.0,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);`
baggage_tb.query(sql,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Baggage table ready");
    }
});

export default baggage_tb;