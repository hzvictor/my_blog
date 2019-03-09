var mysql = require("mysql")

function creatConnection() {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: "root",
        password: "root",
        database: "my_blog"
    })
    return connection

}

module.exports.creatConnection = creatConnection

creatConnection()