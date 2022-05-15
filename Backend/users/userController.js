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
            res.sendStatus(409);
        }
        else{
            await db.query(insert, userdata, (erro, resu)=>{
                if(erro) throw erro;
                console.log(resu);
                res.sendStatus(201);
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
            res.sendStatus(403);
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
                res.sendStatus(400);
            }
        }

    });
});

module.exports = router;