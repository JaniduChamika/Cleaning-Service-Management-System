import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './lib/db.js';
const app = express();

app.use(cors());
app.use(express.json());


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
      console.log(username);
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

app.post('/add-booking', async (req, res) => {
      const { user, customer, address, datetime, serviceType } = req.body;
      try {
            const db = await connectToDatabase();
            //start convert YYYY-MM-DDTHH:MM to YYYY-MM-DD HH:MM:SS
            const inputValue = datetime;
            const date = new Date(inputValue);
            const sqlTimestamp = date.toISOString().slice(0, 19).replace('T', ' ');
            //end convert YYYY-MM-DDTHH:MM to YYYY-MM-DD HH:MM:SS
            const bookingData = [customer, address, sqlTimestamp, serviceType, user];
            await db.query("INSERT INTO booking (customer_name,address,date_time,service_id,user_id) VALUES (?,?,?,?,?)", bookingData);
            return res.status(201).json({ message: "Booking added successfully" });
      } catch (err) {
            console.error(err);
            return res.status(500).json(err);
      }

});


app.get('/booking', verifyToken, async (req, res) => {

      try {
            const db = await connectToDatabase();
            const query = 'SELECT booking.id,booking.customer_name AS `customer`,booking.address,booking.date_time,service.name AS `service` FROM booking LEFT JOIN service ON booking.service_id=service.id';
            const [rows] = await db.query(query + ' WHERE user_id=?', [req.userId]);
            console.log(rows);
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