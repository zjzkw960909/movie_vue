var config = require('./.config');
var mysql = require('mysql');
var poolModule = require('generic-pool');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

module.exports = pool;

