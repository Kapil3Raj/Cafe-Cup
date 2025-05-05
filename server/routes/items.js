import express from 'express';
import Item from "../models/item.js";

const router = express.Router()

// Get
router.get("/",async (req,res)=>{
    try{
        const itemData = await Item.find();
        res.status(200).json(itemData);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }

});

// Get one item

router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Post
router.post("/",async (req,res) =>{
    try{  const addItem = new Item(req.body);
      await addItem.save();
      res.status(200).json(addItem)
    }
    catch(err){
       res.status(400).json({error : err.message})
    }
});

// Update
router.put("/:id",async (req,res)=>{
    try{
        const updateItem =await Item.findByIdAndUpdate(req.params.id,req.body ,{new: true});
        res.status(200).json(updateItem)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

// Delete
router.delete("/:id",async(req,res)=>{
    try{
        const deleteItem =await Item.findByIdAndDelete(req.params.id,{new: true})
        res.status(200).json(deleteItem)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

export default router;


