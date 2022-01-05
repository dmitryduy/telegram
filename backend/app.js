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
app.use(express.static(__dirname + '/assets'));
let userFile = fs.readFileSync(__dirname + '/db/users.json', 'utf8');
const users = userFile ?
    new Map(JSON.parse(userFile))
    :
        new Map();
users.forEach(user => user.dialogs = user.dialogs ?
    new Map(user.dialogs)
    :
        new Map());
const usersMapToArray = () => {
    return Array.from(users)
        .map(([userPhone, user]) => ([userPhone, Object.assign(Object.assign({}, user), { dialogs: user.dialogs ? Array.from(user.dialogs) : null })]));
};
const addMessageToDialogByPhone = (user, dialogId, message, partner) => {
    if (!user.dialogs) {
        user.dialogs = new Map();
    }
    if (user.dialogs.has(dialogId)) {
        user.dialogs.get(dialogId).messages.push(message);
    }
    else {
        user.dialogs.set(dialogId, {
            partnerPhone: partner.phoneNumber,
            partnerAvatar: partner.avatar,
            partnerNickname: partner.nickname,
            messages: [message]
        });
    }
};
const writeUsersToFile = () => {
    fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(usersMapToArray()));
};
const createNewUser = (phoneNumber, nickname) => {
    return {
        phoneNumber: phoneNumber,
        dialogs: new Map(),
        isOnline: true,
        socketId: null,
        nickname: nickname,
        lastSeen: null,
        avatar: 'http://localhost:5000/images/user-logo.png'
    };
};
app.post('/login', (req, res) => {
    const { userPhone, nickname } = req.body;
    if (users.has(userPhone)) {
        const user = users.get(userPhone);
        if (users.get(userPhone).nickname === nickname) {
            console.log(Object.assign(Object.assign({}, user), { dialogs: user.dialogs ? Array.from(user.dialogs) : null }));
            res.json(Object.assign(Object.assign({}, user), { dialogs: user.dialogs ? Array.from(user.dialogs) : null }));
        }
        else {
            res.json({ error: true });
        }
    }
    else {
        const newUser = createNewUser(userPhone, nickname);
        users.set(userPhone, newUser);
        writeUsersToFile();
        res.json(Object.assign(Object.assign({}, newUser), { dialogs: newUser.dialogs ? Array.from(newUser.dialogs) : null }));
    }
});
app.get('/users/', (req, res) => {
    const { value, userPhone } = req.query;
    const result = {
        chatsOfUser: [],
        chatsOfGlobal: [],
    };
    const filteredUsers = Array.from(users.values())
        .filter(user => user.nickname.startsWith(value));
    filteredUsers.forEach((user) => {
        if (user.phoneNumber.slice(1) !== userPhone) {
            let dialogId = -1;
            if (user.dialogs) {
                console.log(user.dialogs.entries());
                for (let [id, partner] of user.dialogs.entries()) {
                    console.log(5)
                    if (partner.partnerPhone.slice(1) === userPhone) {
                        dialogId = id;
                        break;
                    }
                }
            }
            if (dialogId !== -1) {
                result.chatsOfUser.push(dialogId);
            }
            else {
                result.chatsOfGlobal.push({
                    partnerPhone: user.phoneNumber,
                    partnerAvatar: user.avatar,
                    partnerNickname: user.nickname,
                    messages: []
                });
            }
        }
    });
    res.json(result);
});
app.get('/users/phone/:phone', (req, res) => {
    const phone = req.params.phone;
    console.log(req.params);
    const user = users.get(phone);
    res.json({ isOnline: (user === null || user === void 0 ? void 0 : user.isOnline) || false, lastSeen: (user === null || user === void 0 ? void 0 : user.lastSeen) || 0 });
});
io.on('connection', (socket) => {
    console.log('user id: ', socket.id);
    let user = null;
    socket.on('joined', (userPhone) => {
        user = users.get(userPhone);
        user.isOnline = true;
        user.socketId = socket.id;
        user.lastSeen = null;
        socket.broadcast.emit('user online', { userPhone: user.phoneNumber });
    });
    socket.on('send message', ({ senderPhone, receiverPhone, messageText, dialogId }) => {
        const newMessageObj = {
            createDate: Date.now(),
            text: messageText,
            senderPhone
        };
        const sender = users.get(senderPhone);
        const receiver = users.get(receiverPhone);
        addMessageToDialogByPhone(sender, dialogId, newMessageObj, receiver);
        addMessageToDialogByPhone(receiver, dialogId, newMessageObj, sender);
        if (receiver.isOnline) {
            io.to(receiver.socketId).emit("new message", Object.assign(Object.assign({}, newMessageObj), { partnerPhone: sender.phoneNumber, partnerAvatar: sender.avatar, partnerNickname: sender.nickname, dialogId }));
        }
        writeUsersToFile();
    });
    socket.on('disconnect', () => {
        console.log('user disconnect');
        if (user) {
            user.isOnline = false;
            user.socketId = null;
            user.lastSeen = Date.now();
            socket.broadcast.emit('user offline', { userPhone: user.phoneNumber, userLastSeen: user.lastSeen });
        }
        writeUsersToFile();
    });
});
server.listen(5000, () => console.log('server start'));
