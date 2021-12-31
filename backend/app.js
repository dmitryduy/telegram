"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require('express');
var app = express();
var http = require('http');
var cors = require('cors');
var fs = require('fs');
var server = http.createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});
app.use(express.json());
app.use(cors());
var userFile = fs.readFileSync(__dirname + '/db/users.json', 'utf8');
var users = userFile ?
    new Map(JSON.parse(userFile))
    :
        new Map();
users.forEach(function (user) { return user.dialogs = user.dialogs ?
    new Map(user.dialogs)
    :
        new Map(); });
var usersMapToArray = function () {
    return Array.from(users)
        .map(function (_a) {
        var userPhone = _a[0], user = _a[1];
        return ([userPhone, __assign(__assign({}, user), { dialogs: Array.from(user.dialogs).length ? Array.from(user.dialogs).length : null })]);
    });
};
var addMessageToDialogByPhone = function (user, dialogId, message) {
    if (user.dialogs.has(dialogId)) {
        user.dialogs.get(dialogId).messages.push(message);
    }
    else {
        user.dialogs.set(dialogId, {
            partnerPhone: message.senderPhone,
            messages: [message]
        });
    }
};
var writeUsersToFile = function () {
    fs.writeFileSync(__dirname + '/db/users.json', JSON.stringify(usersMapToArray()));
};
var createNewUser = function (phoneNumber, nickname) {
    return {
        phoneNumber: phoneNumber,
        dialogs: new Map(),
        isOnline: true,
        socketId: null,
        nickname: nickname,
        lastSeen: null,
        avatar: 'https://lh3.googleusercontent.com/proxy/dEoAsY560gMSYM5q9Ov9RaWxNf5a4-KaA5JuqRoKhBADemznTdpNrLP5nXpwgoHlibNBwssbCQ4Lq_CUbuKVhRwkAts9chQzZzjZv2j6UpoWUBUR1kZx1FL6o3qrDa2kEg'
    };
};
app.post('/login', function (req, res) {
    var _a = req.body, userPhone = _a.userPhone, nickname = _a.nickname;
    if (users.has(userPhone)) {
        var user = users.get(userPhone);
        if (users.get(userPhone).nickname === nickname) {
            res.json(user);
        }
        else {
            res.status(400);
            res.send();
        }
    }
    else {
        var newUser = createNewUser(userPhone, nickname);
        users.set(userPhone, newUser);
        writeUsersToFile();
        res.json(newUser);
    }
});
app.get('/users/:substring', function (req, res) {
    var substring = req.params.substring;
    var filteredUsers = Array.from(users.values())
        .filter(function (user) { return user.nickname.startsWith(substring); })
        .map(function (user) { return ({
        phone: user.phoneNumber,
        avatar: user.avatar,
        nickname: user.nickname
    }); });
    res.json(filteredUsers);
});
io.on('connection', function (socket) {
    console.log('user id: ', socket.id);
    var user = null;
    socket.on('joined', function (userPhone) {
        user = users.get(userPhone);
        user.isOnline = true;
        user.socketId = socket.id;
        user.lastSeen = null;
        socket.broadcast.emit('user online', { userNickname: user.nickname });
    });
    socket.on('send message', function (_a) {
        var senderPhone = _a.senderPhone, receiverPhone = _a.receiverPhone, messageText = _a.messageText, dialogId = _a.dialogId;
        var newMessageObj = {
            createDate: Date.now(),
            text: messageText,
            senderPhone: senderPhone
        };
        var sender = users.get(senderPhone);
        var receiver = users.get(receiverPhone);
        addMessageToDialogByPhone(sender, dialogId, newMessageObj);
        addMessageToDialogByPhone(receiver, dialogId, newMessageObj);
        if (receiver.isOnline) {
            io.to(receiver.socketId).emit("new message", __assign(__assign({}, newMessageObj), { dialogId: dialogId }));
        }
        writeUsersToFile();
    });
    socket.on('disconnect', function () {
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
server.listen(5000, function () { return console.log('server start'); });
