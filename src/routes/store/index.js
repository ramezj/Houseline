import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';
import { authenticated } from "../../middleware/auth.js";

router.post('/create', authenticated, async(req, res) => {
    const { name, imageLink } = req.body;
    if(!name || !imageLink ) {
        return res.status(400).json({
            ok:false,
            response:'Store Name or Image missing'
        })
    }
    const userId = await jwt.decode(req.cookies.auth, 'test');
    const user = await prisma.user.findFirst({
        where: {
            id: userId.id
        }
    });
    // check if user is buyer or seller. if user.role == 1, then user is buyer
    if(user.role == 1) {
        return res.status(400).json({
            ok:false,
            response:'Please upgrade account to seller to create a store'
        })
    };
    try {
        // Create Store
        const newStore = await prisma.store.create({
            data: {
                name: name,
                imageLink: imageLink,
                userId: userId.id
            }
        });
        if(!newStore) {
            return res.status(400).json({
                ok:false,
                response:'something went wrong'
            })
        };
        return res.status(200).json({
            ok:true,
            response:newStore
        })
    } catch (error) {
        console.error(error);
    }
})

router.get('/:id', async(req, res) => {
    try {
        const store = await prisma.store.findFirst({
            where: {
                id: req.params.id
            },
            include: {
                products: true
            }
        });
        if(!store) {
            return res.status(400).json({
                ok:false,
                response: 'Store Not Found'
            })
        };
        return res.status(200).json({
            ok:true,
            store
        })
    } catch (error) {
        console.error(error);
    }
})

export { router };