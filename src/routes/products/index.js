import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';
import { authenticated } from "../../middleware/auth.js";


export { router };