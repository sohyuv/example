var mysql = require('mysql');
var express = require('express');

var connection = mysql.createConnection ({
    host : 'localhost',
    user : 'root',
    password : 'a',
    database : 'Yoon'
});

var app = express();

connection.connect();

app.get('/', (req, res) => {    // DB자체에서 데이터를 insert 한 뒤 데이터를 select
connection.query('SELECT * from LineChange', function(err, rows, fields) {
    if (err) throw err;

    res.send(rows);

    for(var i = 0; i < 2; i++) {
    console.log(rows);
    console.log('The solution is :', rows[0].winker);
    }
});
});

app.get('/insert', (req ,res,fields) => {    // node를 통하여 연동된 DB에 insert
    connection.query("insert into LineChange(winker,handle,time) values('R','L','2017-10-06 15:32:46');", function(err, rows, fields) {
    if (err) throw err;
    res.send('Success');    

});
});

app.listen(3000, () => {
    console.log('Connect');
});
