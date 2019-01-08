var mysql = require("mysql")

function creatConnection(){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: "root",
        database: "my_blog"
    })
    return connection

}

module.exports.creatConnection = creatConnection

creatConnection()