const express=require('express');
const authMiddleware=require('../middeware')
const {Account}=require("../db")

const router=express.Router();


router.get("/accountCheck", authMiddleware, async (req, res)=>{
      const account=await Account.findOne({
            userId:req.userId
      })

      res.json({
           balance: account.balance
      })
})


module.exports=router

// 13 remain