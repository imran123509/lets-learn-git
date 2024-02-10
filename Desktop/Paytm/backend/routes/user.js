const express=require('express');
const zod=require('zod');
const jwt=require('jsonwebtoken');
const {User, Account}=require('../db');
//const {authMiddleware}=require('../middeware')
const {JWT_SECRET}= require('../config')


const router=express.Router()


const signupBody=zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
})

router.post('/signup', async(req, res)=>{
    const {email}=signupBody.safeParse(req.body);
    //console.log('Request body:', req.body);

    if(email){
          return res.status(411).json({
            msg:"this email is already used"
          })   
    }
      
    // const existingUser=await User.findOne({
    //     username: req.body.username
    // })

    // if(existingUser){
    //     return res.status(411).json({
    //         msg: "this username is already exist"
    //     })
    // }

    // const existingUser = await User.findOne({
    //     username: req.body.username
    // })

    // if (existingUser) {
    //     return res.status(411).json({
    //         message: "Email already taken/Incorrect inputs"
    //     })
    // }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId=user._id;

    await Account.create({
        userId,
        Balance: 1+Math.random()*10000
    })
    const token=jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        msg:"user created successfully",
        token: token
    })

})

const signinbody=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.get('/signin', async(req, res)=>{
       const {username}=signinbody.safeParse(req.body);

       if(!username){
            return res.status(411).json({
                  msg: "this username is does not exist"
            })



       }


       const user=await User.findOne({
            username: req.body.username,
            password: req.body.password
       })

       if(user){
           const token=jwt.sign({
                 userId: user._id
           }, JWT_SECRET)

           res.json({
               token:token
           })
           return;
       }


})

const updateBody=zod.object({
     password:zod.string(),
     firstName: zod.string(),
     lastName: zod.string()
})

router.put("/", async(req, res)=>{
     const {email}=updateBody.safeParse(req.body);
     if(!email){
        res.status(411).json({
            msg:"Error while updating the email"
        })
     }

    await User.updateOne({
        _id: req.userId
    })

    res.json({
        msg: "Updated successfully"
    })

})

router.get("/bulk", async(req, res)=>{
      const filter=req.query.filter|| " "

      const users=await User.findOne({
          $or: [{
            firstName: {
                "$regexp": filter
            },
            lastname: {
                "$regexp": filter
            }
          }] 
      })

      res.json({
           user: users.map(user=>({
               username: user.username,
               firstName: user.firstName,
               lastName: user.lastName,
               id: user._id

           })
                 
           )
      })

})
module.exports=router


//8 steps remain