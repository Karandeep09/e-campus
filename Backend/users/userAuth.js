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
    let data = {
        title: req.body.title,
        content : req.body.content,
        _date : datetime,
        username : req.user.user_id
    };
    const insert = "INSERT INTO posts SET ?";
    await db.query(insert, [data, req.user.user_id], (erro, resu)=>{
        if(erro) throw erro;
        console.log(resu);
        res.sendStatus(201);
    });
});
module.exports = router;