import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';

router.get('/create', async(req, res) => {
    const token = await jwt.decode(req.cookies.auth, 'test');
    console.log(token);
    const newProduct = await prisma.product.create({
        data: {
            name: 'Product ',
            description: "Product's description",
            stock : 10,
            price: 300,
            userId: token.id
        }
    })
    if(newProduct) {
        return res.status(newProduct);
    }
})
router.get('/:id', async(req, res) => {
    const products = await prisma.product.findMany({
        where: {
            userId:req.params.id
        }
    });
    console.log(products);
})

export { router };