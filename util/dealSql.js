var _ = require('underscore');

/*
 * 与mysql交互的增删改查数据库语句，节省开发成本
 * */
function post (connection, sql, req, res) {
    connection.query(sql.editSql(req).post, sql.editSql(req).data, (err, results, fields) => {
        if (err) {
            res.json({status: err})
        } else {
            res.json({status: 0})
        }
    })
}

function put (connection, sql, req, res) {
    connection.query(sql.editSql(req).put, sql.editSql(req).data, (err, results, fields) => {
        if (err) {
            res.json({status: err})
        } else {
            res.json({status: 0})
        }
    })
}
function getList (connection, sql, req, res, offset = 10) {
    var query = req.query
    connection.query(sql.editSql(req).getCount, (err0, counts, fields0) => {
        connection.query(sql.editSql(req, query.page, offset).getList, (err, results, fields) => {
            if (err) {
                res.json({status: err})
            } else {
                res.json({status: 0, data: results, page: Number(query.page), pages: Math.ceil(counts[0].count / (query.size || offset))})
            }
        })
    
    })
}
function del (connection, sql, req, res) {
    connection.query(sql.editSql(req).delData, (err, results, fields) => {
        if (err) {
            res.json({status: err})
        } else {
            res.json({status: 0})
        }
    })
}
/**
 * dealJson参数说明
 * req: 前端请求过来的json内容
 * 函数作用
 * 处理json。转换成['tilte', 'name'] ['titleData', 'nameData']和get响应的条件sql语句(如：where `title` = `某题目`)
 * */
var exportData = function (table, fields) {
    var fields = fields;
    this.table = table;
    //获取私有变量
    this.getPri = function () {
        return fields
    },
    this.dealJson = function (req) {
        var fields = _.clone(this.getPri()),
            params,
            temp = [], sqlFields = [], items = [];
        if (Object.keys(req.body).length) {
            params = req.body;
        } else {
            params = req.query;
        }
        fields.shift();
        for(var i = 0; i < fields.length; i++) {
            if (params[fields[i]]) {
                sqlFields.push(fields[i]);
                temp.push(params[fields[i]]);
                items.push(`${fields[i]} = ${params[fields[i]]}`);
            }
        }
        return {
            fields: sqlFields,
            data: temp,
            items: items.join(' and ')
        }
    }
}
/*
 * 与mysql交互的增删改查数据库语句，节省开发成本
 * 将函数继承到exportData上
 * model上只需要写 sql.post(connection, sql, req, res)
 * 1.sql是实例化后的instance
 * 2.connection是mysql连接的变量
 * 3.req,res是http请求的req和res
 * */
exportData.prototype.post = post
exportData.prototype.put = put
exportData.prototype.get = getList
exportData.prototype.del = del
/**
 * 参数说明
 * req: 前端传入数据，处理json
 * 作用说明，产生4个sql语句(具体由前端输入的条件构成sql语句)
 * 1.post 产生新增的sql语句
 * 2.put 产生更新的sql语言
 * 3.getCount 产生符合条件的get的数量的sql语句
 * 4.getList 产生符合条件的数据，且具有分类功能。
 * */
exportData.prototype.editSql = function (req, page = 1, offset) {
    let temp = {}, arr = [], afterDeal, fields, id,
        start = (page - 1) * offset;
    afterDeal = this.dealJson(req);
    id = req.query.id || req.body.id;
    fields = afterDeal.fields;
    fields = fields.map((v) => {
        return '`' + v + '`';
    });
    let updateValue = fields.join('=?,') + '=?'
    for(var i = 0;i < fields.length; i++) {
        arr.push('?');
    }
    let insert = fields.join();
    let insertValue = arr.join();
    let conditions;
    if (afterDeal.items.length) {
        conditions = ` where ${afterDeal.items}`;
    } else {
        conditions = '';
    }
    temp.getCount = `select count(*) as count from ${this.table + conditions}`;
    temp.getList = `select * from ${this.table} ${conditions} order by id desc limit ${start}, ${offset}`;
    temp.getData = `select * from ${this.table} where id = ${id}`;
    temp.delData = `delete from ${this.table} where id = ${id}`;
    temp.post = `insert into ${this.table} (${insert}) values(${insertValue})`;
    temp.put = `update ${this.table} set ${updateValue} where id = ${id}`;
    temp.data = afterDeal.data;
    temp.page = page;
    return temp;
}
/**
 * 参数说明
 * table:表名
 * fields:当前表的结构
 * */
module.exports =  exportData
