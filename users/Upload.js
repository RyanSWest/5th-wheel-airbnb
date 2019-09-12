// const server = express();
const express = require('express');
const server = express();

const multer = require('multer');
const knex = require('knex');
const db = require('../database/dbConfig')
server.use(express.json())
 
const router = express.Router();

const storage = multer.diskStorage({
    destination: '../img',
    filename: function(req, file, cb){
        cb(null, 'img' + Date.now()+ '.jpg'
      )
    }
});

const upload = multer({
    storage: storage,

}).single('myImage')


router.post('/', function (req, res){
    upload(req, res, function (err){
        if (err){
            res.status(500).json({
                errmessage: err,
                message: 'cannot upload'})

        }
        res.status(201).json({
            message: 'Upload Successful'
        });
    })
});
 




module.exports = router;