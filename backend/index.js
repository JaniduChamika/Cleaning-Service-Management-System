import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './lib/db.js';
const app = express();

app.use(cors());
app.use(express.json());

//register user to database
app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      try {
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM user WHERE username=?', username);
            if (rows.length > 0) {
                  return res.json({ message: "user alrady exist" });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            await db.query("INSERT INTO user (username,password_hash) VALUES (?,?)", [username, hashPassword]);
            return res.status(201).json({ message: "user register successfully" });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }

});
//check login details from database & create toekn
app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      try {
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM user WHERE username=?', username);
            if (rows.length === 0) {
                  return res.status(404).json({ message: "User not exits" });
            }
            const isMatch = await bcrypt.compare(password, rows[0].password_hash);
            if (!isMatch) {
                  return res.status(401).json({ message: "wrong-info" });
            }
            const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });
            return res.status(201).json({ token: token });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }

});
// start login verification 
// verify is there token (check user is logined)
const verifyToken = async (req, res, next) => {
      try {
            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                  return res.status(403).json({ message: "access denide" });
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userId = decoded.id;
            next();
      } catch (error) {
            // console.log(err);
            return res.status(500).json({ message: "server error" });
      }
};
//get user according to token
app.get('/home', verifyToken, async (req, res) => {
      try {
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM user WHERE id=?', [req.userId]);
            if (rows.length === 0) {
                  return res.status(404).json({ message: "User not exits" });
            }

            return res.status(201).json({ userId: rows[0].id });
      } catch (err) {
            // console.log(err);
            return res.status(500).json(err);
      }
});
// end login verification

//retrive service type to load selector
app.get('/service', async (req, res) => {

      try {
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM service ');
            if (rows.length <= 0) {
                  return res.status(404).json({ message: "Service not found" });
            }


            return res.status(201).json({ service: rows });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }
});

//add new booking to the database
app.post('/bookings', async (req, res) => {
      const { user, customer, address, datetime, serviceType } = req.body;
      try {
            const db = await connectToDatabase();

            const sqlTimestamp = fomateDateTimeToDB(datetime);
            const bookingData = [customer, address, sqlTimestamp, serviceType, user];
            await db.query('INSERT INTO booking (customer_name,address,date_time,service_id,user_id) VALUES (?,?,?,?,?)', bookingData);
            return res.status(201).json({ message: "Booking added successfully" });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }

});
//convert YYYY-MM-DDTHH:MM to YYYY-MM-DD HH:MM:SS
function fomateDateTimeToDB(dateString) {
      console.log(dateString);
      const date = new Date(dateString);
      const pad = (n) => n.toString().padStart(2, '0');

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// retrive booking details relevant to user
app.get('/bookings', verifyToken, async (req, res) => {

      try {
            const db = await connectToDatabase();
            const query = 'SELECT booking.id,booking.customer_name AS `customer`,booking.address,booking.date_time,service.name AS `service` FROM booking LEFT JOIN service ON booking.service_id=service.id';
            const [rows] = await db.query(query + ' WHERE user_id=?', [req.userId]);
            // console.log(rows);
            if (rows.length <= 0) {
                  return res.status(403).json({ message: "Not found" });
            }


            return res.status(201).json({ booking: rows });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }
});

//delete booking from database
app.delete('/bookings/:id', verifyToken, async (req, res) => {
      try {
            const bookingId = parseInt(req.params.id);
            const db = await connectToDatabase();
            //check authorised user
            const [rows] = await db.query('SELECT * FROM booking WHERE id=? AND user_id=?', [bookingId, req.userId]);
            if (rows.length <= 0) {
                  return res.status(403).json({ message: 'Access Denied' });
            }
            await db.query('DELETE FROM booking WHERE id=?', bookingId);
            return res.status(200).json({ message: "Booking cancelled" });
      } catch (error) {
            console.error(err);
            return res.status(500).json(err);
      }

});

//retrive booking details corresponding to bookId
app.get('/booking/edit/:id', verifyToken, async (req, res) => {
      try {
            const bookingId = parseInt(req.params.id);
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM booking WHERE id=? AND user_id=?', [bookingId, req.userId]);
            // console.log(rows)
            if (rows.length <= 0) {
                  return res.status(403).json({ message: 'Access Denied' });
            }

            const booking = {
                  user: req.userId || '',
                  customer: rows[0].customer_name || '',
                  address: rows[0].address || '',
                  datetime: fomateDateTimeFront(rows[0].date_time),
                  serviceType: rows[0].service_id || ''
            };
            return res.status(201).json({ booking: booking });
      } catch (error) {
            console.error('Error fetching booking:', err);
            return res.status(500).json(err);
      }
});
//convert YYYY-MM-DD HH:MM:SS to YYYY-MM-DDTHH:MM 
function fomateDateTimeFront(dateString) {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset(); // in minutes
      const localDate = new Date(date.getTime() - offset * 60000);
      return localDate.toISOString().slice(0, 16);
}

//update booking details from database
app.put('/bookings/:id', verifyToken, async (req, res) => {

      try {
            const db = await connectToDatabase();
            const { user, customer, address, datetime, serviceType } = req.body;
            const bookingId = parseInt(req.params.id);
            //check authorised user
            const [rows] = await db.query('SELECT * FROM booking WHERE id=? AND user_id=?', [bookingId, req.userId]);
            if (rows.length <= 0) {
                  return res.status(403).json({ message: 'Access Denied' });
            }
            const sqlTimestamp = fomateDateTimeToDB(datetime);
            console.log(sqlTimestamp);
            const bookingData = [customer, address, sqlTimestamp, serviceType, bookingId];
            await db.query('UPDATE booking SET customer_name=?,address=?,date_time=?,service_id=? WHERE id=? ', bookingData);
            return res.status(201).json({ message: "Booking updated success" });
      } catch (error) {
            console.error('Error fetching booking:', err);
            return res.status(500).json(err);
      }
});

// retrive all booking for admin panel
app.get('/bookings-admin', async (req, res) => {

      try {
            const db = await connectToDatabase();
            const query = `SELECT booking.id,booking.customer_name AS customer,
            booking.address,booking.date_time,service.name AS service, user.username 
             FROM booking 
             LEFT JOIN service ON booking.service_id=service.id
             LEFT JOIN user ON user.id=booking.user_id`;
            const [rows] = await db.query(query);
            // console.log(rows);
            if (rows.length <= 0) {
                  return res.status(403).json({ message: "Not found" });
            }


            return res.status(201).json({ booking: rows });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }
});
app.listen(process.env.PORT, () => {
      console.log("Server is running..");
})