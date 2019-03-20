var fs = require('fs')
var path = require('path');

var exec = require('child_process').exec;
var cmdStr = `rm -rf ${__dirname}/test.txt`;


function fsw(colors){
exec(cmdStr, function (err, stdout, srderr) {
  if (err) {
    console.log(1);
  } else {
    console.log(2); 
    var w_data = `${colors}`
    var w_data = new Buffer.from(w_data);


    fs.writeFile(__dirname + '/test.txt', w_data, {flag: 'a'}, function (err) {
    if(err) {
        console.error(err);
        } else {
        console.log('写入成功');
        }
    });
  }
});

}


module.exports = fsw