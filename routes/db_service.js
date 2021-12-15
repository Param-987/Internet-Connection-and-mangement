const {Client} = require('pg')
const connection = new Client({
  host: "localhost",
  port:1337,
  user: 'postgres',
  password:'123456',
  database:"postgres",
})

 

connection.connect((err)=> {
  if (err) console.log("Problem in connection");
  else console.log("Connected!");
});

  module.exports = connection