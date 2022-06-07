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

router.post('/update/profile', auth, async (req, res)=>{
   let data = { 
        nm : req.body.name,
        batch : req.body.batch,
        branch : req.body.branch,
        bio : req.body.bio
   } 
   let username = req.user.user_id;

   await db.query("UPDATE users SET ? WHERE username = ?", [data,username], async (err, resp) => {
       if(err) throw err;
       await db.query("SELECT * FROM users WHERE username = ?", [username], (err, resp) => {
           if(err) throw err;
           console.log(resp);
           delete resp[0].pwd;
           res.status(200).json(resp[0]);
       });
   });
});

router.get('/people', auth, async (req, res) => {
       await db.query("SELECT * FROM users",(err, resp) =>{
           if(err) throw err;
           resp.forEach(r => {
               delete r.pwd;
           });
           res.status(200).json(resp);
       });
});
router.get('/profile/:username', auth, async(req, res) => {
    let username = req.params.username;
    let sql  = "SELECT * FROM users WHERE username = ?";
    await db.query(sql , [username], (err, resp) => {
        if(err) throw err;
        return res.status(200).json(resp);
    });
});
router.post('/comment', auth, async(req, res) => {
    let datetime = moment().format().slice(0, 19).replace('T', ' ');;
    let data = {
        post_id : req.body.post_id,
        username : req.user.user_id,
        _date : datetime,
        content : req.body.content
    }
    let sql = "INSERT INTO comments SET ?";
    await db.query(sql, [data], (err, resp) => {
        if(err) throw err;
        res.status(201).send("Comment Created");
    });
});

router.post('/likestate', auth, async (req,res)=>{
    let username = req.user.user_id;
    let post_id = req.body.post_id;
    let likestate = {
        liked : 0,
        count: 0
    }
    // console.log(username, post_id);
    await db.query("SELECT * from likes WHERE username = ? and post_id = ?", [username, post_id],
        async (erro, resu)=>{
            if(erro) throw erro;
            console.log("A", post_id, resu);

            if(resu.length){
                likestate.liked = 1;
            }
            
            await db.query("SELECT COUNT(*) FROM likes WHERE post_id = ?", [post_id],
                (erro, resu) => {
                    if(erro) throw erro;
                    if(resu.length){
                        likestate.count = resu[0]['COUNT(*)']; 
                    }
                    res.send(likestate);
                } 
            )
        }
    )
});
router.post("/like", auth, async (req, res)=>{
    data = {
        username : req.user.user_id,
        post_id : req.body.post_id
    };
    let tosend = {
        toggle : 0,
        count : 0
    };
    await db.query("INSERT IGNORE INTO likes SET ?",[data],
     async (erro, resu)=>{
         if(erro) throw erro;
        //  console.log(resu);
         if(resu.affectedRows == 1)
           tosend.toggle = 1
         else tosend.toggle = 0;  

         await db.query("SELECT COUNT(*) from likes WHERE post_id = ?",[req.body.post_id], (erro, resu)=>{
            if(erro) throw erro;
            // console.log(resu);
            if(resu.length)
             tosend.count = resu[0]['COUNT(*)'];
            res.json(tosend); 
        });
    })
});
router.post("/unlike", auth, async(req, res)=>{
    
     let tosend = {
        toggle : 0,
        count : 0
    };
    await db.query("DELETE from likes WHERE username = ? and post_id = ?",[req.user.user_id, req.body.post_id],
     async (erro, resu)=>{
         if(erro) throw erro;
         if(resu.affectedRows == 1)
           tosend.toggle = 1;
         else tosend.toggle = 0;  
         await db.query("SELECT COUNT(*) from likes WHERE post_id = ?", [req.body.post_id], (erro, resu)=>{
            if(erro) throw erro;
            // console.log(resu);
            if(resu.length)
            tosend.count = resu[0]['COUNT(*)'];
            res.send(tosend);
        });
    })
    
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
     let sql = "UPDATE posts SET deleted = 1 WHERE username = ? post_id = ?";
     console.log(user_id, post_id);
     await db.query(sql,[user_id,post_id], async (erro, resu)=>{
         if(erro) throw erro;
         console.log(resu);
         res.status(200).send("Blog Deleted");
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