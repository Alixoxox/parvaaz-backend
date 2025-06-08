import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const user_tb = pool;
const sql= ` CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    passport_no VARCHAR(9) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nationality VARCHAR(10) ,
    passportImg VARCHAR(255) ,
    DOB DATE ,
    phoneNo VARCHAR(13),
    cnicNo VARCHAR(13),
    cnicImg VARCHAR(255)
    );` ;
    
user_tb.query(sql,(error)=>{
    if(error){
        console.log("Failed to create User Table: ",error);
    }else{
        console.log("User table ready");
    }
})
export default user_tb;