import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


router.post('/register', async(req, res) => {
    const { email, password } = req.body;
    if(!email|| !password ) {
        res.status(400).json({
            ok:false,
            response:'Email or Password Missing'
        })
    }
})

router.post('/login', async(req, res) => {
    
})

export { router };