// const server = express();
const express = require('express');
const server = express();
const path = require("path");


const multer = require('multer');
const knex = require('knex');
const db = require('../database/dbConfig')
server.use(express.json())
 
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname
      )
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},

})


// .single('test')


 

router.post('/', function (req, res){
    upload(req, res, function (err){
        if (err){
            // console.log(res)
            console.error(err)
            res.status(500).json({
                errmessage: err.message,
                message: 'cannot upload'})

        }
        else{
        res.status(201).json({
            message: 'Upload Successful'
        });}
    })
});
 

// var upload = multer({dest:'./uploads'})
 
router.post('/', upload.single('test'),  (req,res )=>{
     try{
         res.send(req.file);
     }catch(err){
        res.send(400).statusMessage({ message: 'Error uploading photo' });
    }
})

module.exports = router;