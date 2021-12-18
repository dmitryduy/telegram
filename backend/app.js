const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});
app.use(express.json());
app.use(cors());

const users = JSON.parse(fs.readFileSync(__dirname + '/db/users.json', 'utf8'));


app.post('/login', (req, res) => {
    const {userPhone} = req.body;
    const user = users.find(user => user.phoneNumber === userPhone);
    if (user) {
        res.json(user);
    }
    else {
        const newUser = {
            id: +new Date(),
            phoneNumber: userPhone,
            dialogs: []
        };
        users.push(newUser);
        fs.writeFileSync(__dirname+ '/db/users.json', JSON.stringify(users));
        res.json(newUser);
    }
    console.log(req.body);
})

server.listen(5000, () => console.log('server start'));