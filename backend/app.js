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

const findUserById = (userId) => {
    return users.find(user => user.id === userId);
}

const findUserByNickname = (nickname) => {
    return users.find(user => user.nickname === nickname);
}

const addMessageToDialogById = (user, dialogId, messageObj) => {
    return user.dialogs.find(dialog => dialog.id === dialogId).messages.push(messageObj);
}

app.post('/login', (req, res) => {
    const {userPhone, nickname} = req.body;
    const user = users.find(user => user.phoneNumber === userPhone);
    if (user) {
        if (user.nickname === nickname) {
            res.json(user);
        }
        else {
            res.status(400);
            res.send();
        }
    }
    else {
        const newUser = {
            id: +new Date(),
            phoneNumber: userPhone,
            dialogs: [],
            online: true,
            socketId: null,
            nickname: nickname
        };
        users.push(newUser);
        fs.writeFileSync(__dirname+ '/db/users.json', JSON.stringify(users));
        res.json(newUser);
    }
})

app.get('users/:substring', (req, res) => {
    const substring = 5;
    console.log(substring)
});

io.on('connection', (socket) => {
    console.log('user id: ', socket.id);
    let user = null;
    socket.on('joined', (userId) => {
        user = findUserById(userId);
        user.online = true;
        user.socketId = socket.id;
    })

    socket.on('send message', ({messageTo, messageText, dialogId}) => {
        const newMessageObj = {
            timestamp: +new Date(),
            messageText: messageText,
            sender: user.id
        }
        const receiver = findUserByNickname(messageTo);
        addMessageToDialogById(user, dialogId, newMessageObj);
        addMessageToDialogById(receiver, dialogId, newMessageObj);
        if (receiver.online) {
            io.to(receiver.socketId).emit("new message", {...newMessageObj, dialogId})
        }
        fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(users));
    })

    socket.on('disconnect', () => {
        console.log('user disconnect');
        if (user) {
            user.online = false;
            user.socketId = null;
        }
    })
})


server.listen(5000, () => console.log('server start'));