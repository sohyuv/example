var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();


// 미들웨어 body 데이터 접근 위해 use()함수 추가 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


var users = [
    {
        id : 1,
        name : 'alice'
    },
    {
        id : 2,
        name : 'bek'
    },
    {
        id : 3,
        name : 'chris'
    }
]

// GET

app.get('/users/:id',(req, res) => {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({error : 'Incorrect id'});
    }

     var user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(400).json({error:'Unkown user'});
    }

    return res.json(user);
})


// DELETE
app.delete('/users/:id',(req, res) => {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    var userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
        return res.status(404).json({error: 'Unkown user'});
    }

    users.splice(userIdx, 1);
    res.status(204).send();
});


// POST
app.post('/users', (req, res) => {    
    var name = req.body.name || '';

    if (!name.length) {
        return res.status(400).json({error: 'Incorrect name'});
    }

    var id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId
    }, 0) + 1;

    var newUser = {
        id: id,
        name: name
    };
    users.push(newUser);

    return res.status(201).json(newUser);
});




app.listen(3000, () => {
    console.log('Example and app listening on port 3000!');
});

function User(_name) {
    this.name = _name;
}

User.prototype.greeting = function() {
    console.log('Hello!');
    return this;
};

User.prototype.introduce = function() {
    console.log(`I am ${this.name}`);
    return this;
};

var chris = new User('chris');
chris.greeting().introduce();



