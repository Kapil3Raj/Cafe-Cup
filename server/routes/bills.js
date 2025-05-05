import express from "express";
import Bill from "../models/bill.js";

const router = express.Router();

// Generate bill no
const generateBillNumber = async () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let billNumber;
    let exists = true;
  
    try {
      while (exists) {
        billNumber = "";
        for (let i = 0; i < 6; i++) {
          billNumber += chars.charAt(Math.floor(Math.random() * chars.length));
        }
  
        const existingBill = await Bill.findOne({ billNumber });
        if (!existingBill) exists = false;
      }
    } catch (err) {
      console.error("Error generating bill number", err);
      billNumber = "DEFAULT1"; // fallback
    }
  
    return billNumber;
  };
  

// Post
router.post("/",async (req,res)=>{
    try {
        const billNumber = await generateBillNumber();
    
        const newBill = new Bill({
          ...req.body,
          billNumber,
        });
    
        await newBill.save();
        res.status(200).json(newBill);
  }
  catch(err){
    res.status(400).json({ error: err.message})
  }
});

// Get 

router.get("/",async (req,res)=>{
    try{
      const allBills = await Bill.find()
      res.status(200).json(allBills)
    }
    catch(err){
      res.status(500).json({ error: err.message})
    }
  });

 
  

export default router;
