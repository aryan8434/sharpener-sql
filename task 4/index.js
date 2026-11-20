const express = require("express")
const app = express();
const db = require("./utils/db-connection");
app.use(express.json());

app.get('/users',(req,res)=>{
const query = "select * from users";
db.query(query, (err,results)=>{
    if(err){
        return res.status(500).json({error:"Failed to fetch users"});
    }
    res.json(results)
})
})
app.post('/users',(req,res)=>{
    const {name,email} = req.body;
    const query = `insert into users (name,email) values (?,?)`;
    db.execute(query,[name,email],(err)=>{
        if(err){
            console.log(err.message);
            return res.status(500).send("failed");
        }
        console.log("updte successful");
        res.status(200).send(`username ${name}, ${email} updatd `)
    })
})

app.get('/buses/available/:seats',(req,res)=>{
    const seats = req.params.seats;
    const query = "select * from bus where seat > ?";
    db.query(query, [seats], (err, result) => {
        if(err){
            return res.status(500).json({error:"Failed"});
        }
        res.json(result);
    })
})

app.post('/bus',(req,res)=>{
    const {bus_no,seat}=req.body;
    const query = `insert into bus (bus_no,seat) values (?,?)`;
    db.execute(query,[bus_no,seat],(err)=>{
        if(err){
           return res.status(500).send("failed");
        }
        res.status(200).send("success");
    })
})

app.listen(3000);