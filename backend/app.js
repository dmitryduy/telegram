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

const addMessageToDialogById = (user, dialogId, messageObj, messageTo) => {
    const dialog = user.dialogs.find(dialog => dialog.id === dialogId);
    if (dialog) {
        dialog.messages.push(messageObj);
    } else {
        const receiver = findUserByNickname(messageTo);
        user.dialogs.unshift({
            id: dialogId,
            with: messageTo,
            withOnline: receiver.online,
            withPhoneNumber: receiver.phoneNumber,
            withLastSeen: receiver.lastSeen,
            messages: [messageObj]
        })
    }
}

app.post('/login', (req, res) => {
    const {userPhone, nickname} = req.body;
    const user = users.find(user => user.phoneNumber === userPhone);
    if (user) {
        if (user.nickname === nickname) {
            res.json(user);
        } else {
            res.status(400);
            res.send();
        }
    } else {
        const newUser = {
            id: +new Date(),
            phoneNumber: userPhone,
            dialogs: [],
            online: true,
            socketId: null,
            nickname: nickname,
            lastSeen: null
        };
        users.push(newUser);
        fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(users));
        res.json(newUser);
    }
})

app.get('/users/:substring', (req, res) => {
    const substring = req.params.substring;
    const filteredUsers = users.filter(user => user.nickname.startsWith(substring));
    res.json(filteredUsers);
});

io.on('connection', (socket) => {
    console.log('user id: ', socket.id);
    let user = null;
    socket.on('joined', (userId) => {
        user = findUserById(userId);
        user.online = true;
        user.socketId = socket.id;
        user.lastSeen = null;
        socket.broadcast.emit('user online', {userNickname: user.nickname})
    })

    socket.on('send message', ({messageTo, messageText, dialogId}) => {
        const newMessageObj = {
            timestamp: +new Date(),
            messageText: messageText,
            sender: user.id
        }
        const receiver = findUserByNickname(messageTo);
        addMessageToDialogById(user, dialogId, newMessageObj, messageTo);
        addMessageToDialogById(receiver, dialogId, newMessageObj, user.nickname);
        if (receiver.online) {
            io.to(receiver.socketId).emit("new message", {
                ...newMessageObj,
                dialogId,
                senderNickname: user.nickname,
                senderOnline: user.online,
                senderPhoneNumber: user.phoneNumber,
                senderLastSeen: user.lastSeen
            })
        }
        fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(users));
    })

    socket.on('disconnect', () => {
        console.log('user disconnect');
        if (user) {
            user.online = false;
            user.socketId = null;
            user.lastSeen = +new Date();
            console.log(socket, user)
            socket.broadcast.emit('user offline', {userNickname: user.nickname, lastSeen: user.lastSeen})
        }
        fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(users));
    })
})


server.listen(5000, () => console.log('server start'));