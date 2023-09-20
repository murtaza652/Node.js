const mysql= require('mysql2');

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'node',
    password:'Murtaza1!'
})

module.exports =pool.promise();