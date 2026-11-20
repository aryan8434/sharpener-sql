const express = require("express");
const app=express();
const db = require('./db/db');
app.use(express.json());

app.get("/students",(req,res)=>{
    db.query('select * from students',(err,results)=>{
        if(err){
            console.log(err);
        }
        res.json(results);
    })
})
app.post("/students",(req,res)=>{
    const {name,email,age}=req.body;
    const query =  `INSERT INTO students (name,email,age) values (?,?,?)`
    db.query(query,[name,email,age],(err,result)=>{
        if(err){
            console.log("Error adding studnets",err);
            return res.status(500).send(err);
        }
       return res.status(200).send(result);
    })
})
app.get("/students/:id",(req,res)=>{
    const id=req.params.id;
    const query = `select * from students where id=?`;
    db.query(query,[id],(err,result)=>{
        if(err){
            console.log("Error fetching id",err);
        }
        res.json(result);
    })
})
app.delete("/students/:id",(req,res)=>{
    const id=req.params.id;
    const quey = `delete from students where id=?`;
    db.query(quey,[id],(err,result)=>{
        if(err)
        {
           return res.status(500).send(err);
        }
        if(result.affectedRows===0){
            return res.status(404).send("not found");
        }
        console.log("Deleted successful")
        return res.status(200).send(result);
    })
})

app.put("/students/:id",(req,res)=>{
    const id=req.params.id;
    const {name,email,age}=req.body;
    const query = `update students set name=?,email=?,age=? where id=?`
    db.query(query,[name,email,age,id],(err,result)=>{
        if(err){
           return res.status(500).send(err);
        }
        if(result.affectedRows===0){
            return res.status(404).send("not found")
        }
       return res.status(200).send(result);
    })
})


app.listen(3000);