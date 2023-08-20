import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router as Auth } from "./routes/auth/Authentication.js"
import { router as Product } from './routes/products/index.js'
import { router as Store } from './routes/store/index.js'
dotenv.config()
const app = express();

// Middleware Configuration 
app.use(cors({
    credentials:true,
    methods:'GET,POST,DELETE,PUT'
}));
app.use(express.json());
app.use(bodyParser());
app.use(cookieParser());


// Routing
app.use('/api/auth',  Auth);
app.use('/api/v1/product', Product);
app.use('/api/v1/store', Store);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})