const mysql = require('mysql')
let instance = null;
var connection = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password:'',
  database:"project",
  // insecureAuth : true
});


connection.connect((err)=> {
  if (err) console.log('problem in connection');
  else console.log("Connected!");
});

  module.exports = connection