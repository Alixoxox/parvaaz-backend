import mysql from "mysql"
import pool from '../config/pool_db.js'

// Use the shared pool instead of creating new connection
const inquiries_tb = pool;
// Create the inquiries table
const sql= ` CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,                       -- if the sender is a logged-in user
    name VARCHAR(100) NOT NULL,             -- if it's a guest, capture their name
    email VARCHAR(100) NOT NULL,            -- their reply-to address
    subject VARCHAR(150) DEFAULT NULL,      -- optional short summary
    message TEXT NOT NULL,                  -- the body of their inquiry
    status ENUM('open','closed')      -- track handling progress
    NOT NULL DEFAULT 'open',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  );`
    
inquiries_tb.query(sql,(error)=>{
    if(error){
        console.log("Failed to create inquiries Table: ",error);
    }else{
        console.log("Inquiries table ready");
    }
})
export default inquiries_tb;
