const express = require("express")
const app = express()
const Port = 3000 || process.env.PORT

var UserController = require('./users/UserController');
var AuthUserController = require('./users/userAuth');
app.use('/users', UserController);
app.use('/auth', AuthUserController);

app.get("/status",(req,res)=>{
    res.send("Healthy");
})

app.listen(Port,()=>{
    console.log(`Running on Port ${Port}`);
})

module.exports = app;