import { dialogId, IDialog, IMessage, IUser, IUsers, phone } from "./types";

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
let userFile = fs.readFileSync(__dirname + '/db/users.json', 'utf8');

const users: IUsers = userFile ?
    new Map<phone, IUser>(JSON.parse(userFile))
    :
    new Map<phone, IUser>();
users.forEach(user => user.dialogs = user.dialogs ?
    new Map<dialogId, IDialog>(user.dialogs)
    :
    new Map<dialogId, IDialog>())

const usersMapToArray = () => {
    return Array.from(users)
        .map(([userPhone, user]) => ([userPhone, {
            ...user,
            dialogs: Array.from(user.dialogs).length ? Array.from(user.dialogs).length : null
        }]))
}

const addMessageToDialogByPhone = (user: IUser, dialogId: dialogId, message: IMessage) => {
    if (user.dialogs.has(dialogId)) {
        user.dialogs.get(dialogId).messages.push(message);
    } else {
        user.dialogs.set(dialogId, {
            partnerPhone: message.senderPhone,
            messages: [message]
        })
    }
}

const writeUsersToFile = () => {
    fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(usersMapToArray()));
}

const createNewUser = (phoneNumber: phone, nickname: string): IUser => {
    return {
        phoneNumber: phoneNumber,
        dialogs: new Map<dialogId, IDialog>(),
        isOnline: true,
        socketId: null,
        nickname: nickname,
        lastSeen: null,
        avatar: 'https://lh3.googleusercontent.com/proxy/dEoAsY560gMSYM5q9Ov9RaWxNf5a4-KaA5JuqRoKhBADemznTdpNrLP5nXpwgoHlibNBwssbCQ4Lq_CUbuKVhRwkAts9chQzZzjZv2j6UpoWUBUR1kZx1FL6o3qrDa2kEg'
    };
}

app.post('/login', (req, res) => {
    const {userPhone, nickname}: { userPhone: phone, nickname: string } = req.body;
    if (users.has(userPhone)) {
        const user: IUser = users.get(userPhone);
        if (users.get(userPhone).nickname === nickname) {
            res.json(user);
        } else {
            res.status(400);
            res.send();
        }
    } else {
        const newUser = createNewUser(userPhone, nickname);
        users.set(userPhone, newUser);
        writeUsersToFile();
        res.json(newUser);
    }
})

app.get('/users/:substring', (req, res) => {
    const substring = req.params.substring;
    const filteredUsers = Array.from(users.values())
        .filter(user => user.nickname.startsWith(substring))
        .map(user => ({
            phone: user.phoneNumber,
            avatar: user.avatar,
            nickname: user.nickname
        }));
    res.json(filteredUsers);
});

io.on('connection', (socket) => {
    console.log('user id: ', socket.id);
    let user: IUser = null;
    socket.on('joined', (userPhone: phone) => {
        user = users.get(userPhone);
        user.isOnline = true;
        user.socketId = socket.id;
        user.lastSeen = null;
        socket.broadcast.emit('user online', {userNickname: user.nickname})
    })

    socket.on('send message', ({senderPhone, receiverPhone, messageText, dialogId}) => {
        const newMessageObj: IMessage = {
            createDate: Date.now(),
            text: messageText,
            senderPhone
        }
        const sender = users.get(senderPhone);
        const receiver = users.get(receiverPhone);
        addMessageToDialogByPhone(sender, dialogId, newMessageObj);
        addMessageToDialogByPhone(receiver, dialogId, newMessageObj);
        if (receiver.isOnline) {
            io.to(receiver.socketId).emit("new message", {
                ...newMessageObj,
                dialogId,
            })
        }
        writeUsersToFile();
    })

    socket.on('disconnect', () => {
        console.log('user disconnect');
        if (user) {
            user.isOnline = false;
            user.socketId = null;
            user.lastSeen = Date.now();
            socket.broadcast.emit('user offline', {userPhone: user.phoneNumber, userLastSeen: user.lastSeen})
        }
        writeUsersToFile();
    })
})


server.listen(5000, () => console.log('server start'));