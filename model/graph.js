var pool = require('../config/createPool')
var _ = require('underscore')
var deal= require('../util/dealSql')
module.exports = (app, table) => {
    pool.getConnection ((err, connection) => {
        connection.query(`desc ${table}`, (err, results, fields) => {
            fields = _.map(results, (v) => {
                return v.Field;
            })
            var sql = new deal(table, fields)
            connection.release()
            if(err) throw err
            //graph主题的增删改查
            app.post(`/api/${table}`, (req, res) => {
                sql.post(connection, sql, req, res)
            })
            app.put(`/api/${table}`, (req, res) => {
                sql.put(connection, sql, req, res)
            })
            app.get(`/api/${table}`, (req, res) => {
                sql.get(connection, sql, req, res)
            })
            app.delete(`/api/${table}`, (req, res) => {
                sql.del(connection, sql, req, res)
            })
        })
    })
}
