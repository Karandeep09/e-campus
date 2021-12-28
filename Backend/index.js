const express = require("express")
const app = express()
const Port = 3000 || process.env.PORT

app.get("/status",(req,res)=>{
    res.send("Healthy");
})

app.listen(Port,()=>{
    console.log(`Running on Port ${Port}`);
})