var mysql = require("mysql")

function creatConnection(){
    var connection = mysql.createConnection({
        host: '10.13.18.6',
        user: "root",
        password: "root",
        database: "my_blog"
    })
    return connection

}

module.exports.creatConnection = creatConnection

creatConnection()