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
        username : req.user.user_id,
        tags : JSON.stringify(req.body.tags)
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

 router.post('/delete',auth, async (req, res)=>{
     const post_id = req.body.id;
     const user_id = req.user.user_id;
     let sql = "DELETE tags FROM posts JOIN tags ON posts.post_id = tags.post_id WHERE username = ? AND tags.post_id = ?"
     console.log(user_id, post_id);
     await db.query(sql,[user_id,post_id], async (erro, resu)=>{
         if(erro) throw erro;
         console.log(resu);
             await db.query("DELETE from posts WHERE post_id = ? AND username = ?",[post_id, user_id],(erro, resu)=>{
                 if(erro) throw erro;
                 console.log(resu);
                 if(resu.affectedRows == 1)
                  res.status(200).send("Blog Deleted");
                 else res.status(200).send("This postid doesn't exist");
             });
    });
 });

 router.post('/edit', auth, async (req, res) => {
    let data = {
        title: req.body.title,
        content : req.body.content,
        username : req.user.user_id,
        tags : JSON.stringify(req.body.tags)
    };
    const post_id = req.body.id;
    const username = req.user.user_id;
    const sqlpost = "UPDATE posts SET ? WHERE username = ? AND post_id = ?";
    const deletetags = "DELETE FROM tags WHERE post_id = ?";
    const sqltags = "INSERT INTO tags (tagname,post_id) VALUES ?";
    await db.query(sqlpost, [data, username, post_id], async(erro, resu)=>{
        if(erro) throw erro;
        console.log(resu);
        let arr = req.body.tags; // array of array
        arr.forEach((e)=>{
            e.push(post_id);
        });
        if(resu.affectedRows == 1) {
        await db.query(deletetags, [post_id], (erro, resu)=>{
            if(erro ) throw erro;
            console.log(resu);
        });
        await db.query(sqltags, [arr], (erro, resu)=>{
            if(erro) throw erro;
            console.log(resu);
            res.status(201).send("Blog Updated");
        });
       }
       else{
           console.log("Forbidden")
           res.status(403).send("User Forbidden to Edit");
       } 
    });
 });

module.exports = router;