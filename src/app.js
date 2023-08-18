import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
import { router as Auth } from "./routes/auth/Authentication.js"
dotenv.config()
const app = express();

// Middleware Configuration 
app.use(cors());
app.use(express.json());

// Routing
app.use('/api/auth',  Auth);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})