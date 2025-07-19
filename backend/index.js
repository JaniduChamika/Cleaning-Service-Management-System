import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './lib/db.js';
const app = express();

app.use(cors());
app.use(express.json());


app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      try {
            const db = await connectToDatabase();
            const [rows] = await db.query('SELECT * FROM user WHERE username=?',username);
            if (rows.length > 0) {
                  return res.json({ message: "user alrady exist" });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            await db.query("INSERT INTO user (username,password_hash) VALUES (?,?)", [username, hashPassword]);
            res.status(201).json({ message: "user register successfully" });
      } catch (err) {
            console.error(err);
            res.status(500).json(err);
      }
      console.log(username);
});


app.listen(process.env.PORT, () => {
      console.log("Server is running..");
})