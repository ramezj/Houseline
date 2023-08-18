import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { authenticated } from '../../middleware/auth.js'

router.get('/user', authenticated, async(req, res) => {
    console.log(authenticated)
})

router.post('/register', async(req, res) => {
    const { email, password, name, type } = req.body;
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.type ) {
        return res.status(400).json({
            ok:false,
            response:'please fill out all fields'
        })
    }
    try {
        const exist = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if(exist) {
            return res.status(400).json({
                ok:false,
                response: 'User already exists, sign in instead'
            })
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name,
                email:email,
                password: hashed,
                type:type
            }
        })
        if(!user) {
            return res.status(400).json({
                ok:false,
                response:'Something went wrong, try again later'
            })
        }
        const token = await jwt.sign({id: user.id}, 'test');
        return res.cookie('auth', token).status(200).json({
            ok:true,

        })
    } catch (error) {
        console.error(error);
    }
})
router.post('/login', async(req, res) => {
    const { email, password, name, type } = req.body;
    if(!email|| !password || !name || !type ) {
        return res.status(400).json({
            ok:false,
            response:'please fill out all fields'
        })
    }
    try {
        const exist = await prisma.user.findFirst({
            where: {
                email:email
            }
        });
        if(!exist) {
            return res.status(400).json({
                ok:false,
                response:'User doesnt exist, sign up instead'
            })
        };
        const compare = await bcrypt.compare(req.body.password, exist.password);
        if(!compare) {
            return res.status(400).json({
                ok:false,
                response:'Password Incorrect'
            })
        };
        const token = await jwt.sign({id: exist.id}, 'test');
        return res.cookie('auth', token).status(200).json({
            ok:true
        })
    } catch (error) {
        console.error(error);
    }
})

export { router };