const express = require('express')
const route = express.Router()
const con = require('../connection')

route.get('/',(req,res)=>{
  con.query('Create table customer(name VARCHAR(255) , address VARCHAR(255)) ',(err,res)=>{
    if(err) throw err;
    console.log('database created');
  })
})

module.exports = route

