const mysql = require('mysql')
const express = require('express')
const app = express()
const bp = require('body-parser')
const people = require('./routes/people')
const sqlconnection = require('./connection')   // sql database connection route 

app.use('/people',people)
app.use(express.json())


app.listen(3300,()=> console.log('Server listen at 3300'))