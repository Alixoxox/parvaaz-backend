import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const flight_schedule_tb = pool;

const sql=`CREATE TABLE IF NOT EXISTS flight_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_id INT NOT NULL,
    flight_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    cost_eco INT DEFAULT 500,
    cost_pre_eco INT DEFAULT 1000,
    cost_buis INT DEFAULT 1500,
    cost_first_class INT DEFAULT 2000,
    stops INT DEFAULT 0,
    economy_seats INT DEFAULT 120,
    business_seats INT DEFAULT 40,
    first_class_seats INT DEFAULT 20,
    premium_economy_seats INT DEFAULT 20,

    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    UNIQUE (flight_id, flight_date)    -- no same flight rescheduled twice a day
);
`
flight_schedule_tb.query(sql,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Flight Schedules table ready");
    }
})
export default flight_schedule_tb;