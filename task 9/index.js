const express= require('express');
const cors=require('cors');
const app=express();
const db=require('./db/db');
app.use(cors());
app.use(express.json());

app.get('/users',(req,res)=>{
    const query = `select * from users`;
    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result)
    })
})

app.post('/users',(req,res)=>{
    const {name,email}=req.body;
    const query = ` insert into users (name,email) values(?,?)`;
    db.query(query,[name,email],(err,result)=>{
        if(err){
            console.log(err);
        }
        return res.status(200).send(result);
    })
})

app.listen(3000);