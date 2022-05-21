const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const {db} = require("../db");
const moment = require('moment');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/welcome', auth, (req, res)=>{
    res.send(`Welcome ${req.user.user_id}`);
});

router.post('/post', auth, async (req,res)=>{
    let datetime = moment().format().slice(0, 19).replace('T', ' ');;
    console.log(req.body);
    let data = {
        title: req.body.title,
        content : req.body.content,
        _date : datetime,
        username : req.user.user_id
    };
    
    const insert = "INSERT INTO posts SET ?";
    await db.query(insert, [data], async (erro, resu)=>{
        if(erro) throw erro;
        console.log(resu);
        await db.query("SELECT LAST_INSERT_ID()", async(erro, resu)=>{
            if(erro) throw erro; 
            
            let arr = req.body.tags; // array of array
            let pid = resu[0]["LAST_INSERT_ID()"];
            arr.forEach((e)=>{
                e.push(pid);
            });

            await db.query("INSERT INTO tags (tagname,post_id) VALUES ?", [arr], (erro, resu)=>{
                if(erro) throw erro;
                console.log(resu);
                res.status(201).send("Blog Published !!");
            });
        });
    });
});
module.exports = router;