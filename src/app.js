import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

// Middleware Configuration 
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
})