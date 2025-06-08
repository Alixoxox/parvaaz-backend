import mysql from "mysql"
import pool, { queryAsync } from '../config/pool_db.js'

const booking_tb = pool;

const sql = `CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    seat_no INT NOT NULL,
    flight_schedule INT NOT NULL,
    cabin_class ENUM('economy', 'business', 'first', 'premium_economy') NOT NULL DEFAULT 'economy',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_schedule) REFERENCES flight_schedules(id) ON DELETE CASCADE, 
    UNIQUE (seat_no, flight_schedule)
);`

booking_tb.query(sql, (error) => {
    if (error) {
        console.log("Error creating bookings table:", error);
    } else {
        console.log("Bookings table ready");
    }
});

// Export the existing queryAsync function
export { queryAsync };
export default booking_tb;