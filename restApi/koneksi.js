var mysql = require('mysql');

// koneksi database 
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uaspilgub'
})

conn.connect((err)=>{
    if(err) throw err;
    console.log('your database is connected');
})

module.exports = conn;