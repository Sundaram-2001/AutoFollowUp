
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
import { addData } from '../db/db.js'
const router = express.Router();

router.post('/data', async (req, res) => {
  try {
    const { name, yourEmail, recipientEmail, date } = req.body;
console.log(name, yourEmail, recipientEmail, date);
    
    if (!name || !yourEmail || !recipientEmail || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailExists = await prisma.details.findUnique({
      where: { yourEmail },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!!!!!" });
    }

    const result = await addData({ name, yourEmail, recipientEmail, date });

    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(500).json({ message: "Unable to save data!!!!", error: result.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!!" });
  }
});


export default router; 
