const express =require('express')
const cors=require('cors');
const db=require('./db')

const rootRouter=require('./routes/index')
const app=express();
app.use(cors());
app.use('/api/v1', rootRouter);

app.listen(3000, ()=>{
    console.log(`server is connect ${3000}`)
    
})