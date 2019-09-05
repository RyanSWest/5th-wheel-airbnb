const express = require('express');
const knex = require('knex');
const db = require('../database/dbConfig')
const server =express();

server.use(express.json())

const router =express.Router();

router.get('/', async (req,res) => {
    try{
        const props = await db('properties')
        res.json(props);
    }catch(err){
        res.status(500).json({message: 'Failed to retrieve properties'})
    }
})





module.exports =router;