import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';
import { authenticated } from "../../middleware/auth.js";

router.post('/:id/create', authenticated, async(req, res) => {
    console.log(req.params.id)
    const { name, description, stock, price, material, color, imageLink, } = req.body;
    if(!name || !description || !stock || !price || !material || !color || !imageLink) {
        return res.status(400).json({
            ok:false,
            response: 'please fill out all fields'
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
            response:'Please upgrade account to seller to create a product'
        })
    };
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                description:description,
                stock: stock,
                price: price,
                material: material,
                color: color,
                imageLink : imageLink,
                storeId:req.params.id
            }
        });
        if(!newProduct) {
            return res.status(400).json({
                ok:false,
                response:'Something went wrong'
            })
        };
        return res.status(200).json({
            ok:true,
            response:'Product Created Successfully'
        })
    } catch (error) {
        console.error(error);
    }
})

export { router };