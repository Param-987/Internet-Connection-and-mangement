const {Client} = require('pg')
require('dotenv').config();
const connection = new Client({
  host: `${process.env.HOST}`,
  port: `${process.env.DB_PORT}`,
  user: `${process.env.USER}`,
  password: `${process.env.password}`,
  database: `${process.env.DATABASE}`,
});  

 

connection.connect((err)=> {
  if (err) console.log("Problem in connection");
  else console.log("Connected!");
});

  module.exports = connection