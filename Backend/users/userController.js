const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {db,mysql} = require("../db");
const bcrypt = require("bcrypt");

router.post("/createUser", async (req, res)=>{
    const user = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    
    const userdata = {
         username : user,
         email : email,
         nm : req.body.name,
         batch : req.body.batch,
         branch : req.body.branch,
         pwd : password
    };
    const search = "SELECT * FROM users WHERE username = ? OR email = ?";
    const insert = "INSERT INTO users SET ?";
    
    await db.query(search, [user, email], async (err, resu)=>{
        if(err) throw err;
        console.log(resu);
        if(resu.length != 0){
            console.log("User already exists");
            res.status(409).send("User already exists");
        }
        else{
            await db.query(insert, userdata, (erro, resu)=>{
                if(erro) throw erro;
                console.log(resu);
                res.status(201).send("User Created");
            });
        }
    });
});

router.post("/login", async (req, res)=>{
    const user = req.body.username;
    const password = req.body.password;
    if(!(user && password)){
        res.sendStatus(400);
    }
    const search = "SELECT * FROM users WHERE username = ?";
    await db.query(search, [user], async (err, resu)=>{
        if(err) throw err;
        if(resu.length == 0){
             res.status(403).send("No such user");
        }
        else{
            if(await bcrypt.compare(password, resu[0].pwd)){
                const token = jwt.sign({user_id : user},
                               "sshhh!",
                               {expiresIn : "1d"});
                resu[0].token = token;
                delete resu[0].pwd;
                res.json(resu[0]);
            }
            else{
                 res.status(400).send("Incorrect Password");
            }
        }

    });
});

 router.get("/posts", async (req, res)=>{
     await db.query("SELECT * FROM posts JOIN users ON posts.username = users.username", (err, resp) =>{
        if(err) throw err; 
        res.status(200).json(resp);
     });
 });

 router.get("/comments/:id", async(req,res) => {
     let post_id = req.params.id;
     await db.query("SELECT * FROM comments WHERE post_id = ?",[post_id], (err, resp) => {
         if(err) throw err; 
         res.status(200).json(resp);
     });
 });
module.exports = router;