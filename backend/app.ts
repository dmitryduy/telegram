import { dialogId, IDialog, IGlobalSearch, IMessage, IUser, IUsers, phone } from "./types";

const express = require('express');
import { Request, Response } from 'express';

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

const profileImageColors = ['#a695e7', '#6ec9cb', '#7bc862', '#faa774', '#e17076'];

const users: IUsers = userFile ?
    new Map<phone, IUser>(JSON.parse(userFile))
    :
    new Map<phone, IUser>();
users.forEach(user => user.dialogs = user.dialogs ?
    new Map<dialogId, IDialog>(user.dialogs)
    :
    new Map<dialogId, IDialog>());


const usersMapToArray = () => {
    return Array.from(users)
        .map(([userPhone, user]) => ([userPhone, {
            ...user,
            dialogs: user.dialogs ? Array.from(user.dialogs) : null
        }]))
}

const addMessageToDialogByPhone = (user: IUser, dialogId: dialogId, message: IMessage, partner: IUser, isUnread = false) => {
    if (!user.dialogs) {
        user.dialogs = new Map<dialogId, IDialog>();
    }

    if (user.dialogs.has(dialogId)) {
        user.dialogs.get(dialogId)!.messages.push(message);
        isUnread && user.dialogs.get(dialogId)!.unread++;
    } else {
        user.dialogs.set(dialogId, {
            partnerPhone: partner.phoneNumber,
            partnerAvatar: partner.avatar,
            partnerNickname: partner.nickname,
            messages: [message],
            unread: isUnread? 1: 0
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
        avatar: profileImageColors[Math.floor(Math.random() * profileImageColors.length)],
        backgroundImage: 'default'
    };
}

app.post('/login', (req: Request, res: Response) => {
    const {userPhone, nickname}: { userPhone: phone, nickname: string } = req.body;
    if (users.has(userPhone)) {
        const user: IUser = users.get(userPhone)!;
        if (users.get(userPhone)!.nickname === nickname) {
            res.json({...user, dialogs: user.dialogs ? Array.from(user.dialogs) : null});
        } else {
            res.json({error: true})
        }
    } else {
        const newUser = createNewUser(userPhone, nickname);
        users.set(userPhone, newUser);
        writeUsersToFile();
        res.json({...newUser, dialogs: newUser.dialogs ? Array.from(newUser.dialogs) : null});
    }
})

// @ts-ignore
app.get('/backgrounds', (req: Request, res: Response) => {
    let filesData: string[] = [];
    fs.readdir(__dirname +'/assets/images/backgrounds', (_err, files) => {
        files.forEach((file: string) => {
            filesData.push(file.slice(0, -5));
        });
        res.json(filesData);
    });
});

app.post('/background', (req: Request, res: Response) => {
    const {userPhone, chooseImage} = req.body;
    if (users.get(userPhone)) {
        users.get(userPhone)!.backgroundImage = chooseImage;
        writeUsersToFile();
    }

    res.send();
})

app.get('/users/', (req: Request, res: Response) => {
    const {value, userPhone} = req.query;
    const result: IGlobalSearch = {
        chatsOfUser: [],
        chatsOfGlobal: [],
    }
    const filteredUsers = Array.from(users.values())
        .filter(user => user.nickname.startsWith(value as string));
    filteredUsers.forEach((user) => {
        if (user.phoneNumber !== userPhone) {
            let dialogId = -1;
            if (user.dialogs) {
                console.log(user.dialogs.entries());
                for (let [id, partner] of user.dialogs.entries()) {
                    if (partner.partnerPhone === userPhone) {
                        dialogId = id;
                        break;
                    }
                }
            }
            if (dialogId !== -1) {
                result.chatsOfUser.push(dialogId);
            } else {
                result.chatsOfGlobal.push({
                    partnerPhone: user.phoneNumber,
                    partnerAvatar: user.avatar,
                    partnerNickname: user.nickname,
                    messages: [],
                    unread: 0
                })
            }
        }
    });
    res.json(result);
});

app.get('/users/phone', (req: Request, res: Response) => {
    const {partnerPhone, userPhone} = req.query;
    console.log(req.params)
    const user = users.get(partnerPhone as phone);
    users.get(userPhone as string)!.dialogs?.forEach((dialog) => {
        if (dialog.partnerPhone === partnerPhone) {
            dialog.unread = 0;
        }
    });
    writeUsersToFile();
    res.json({isOnline: user?.isOnline || false, lastSeen: user?.lastSeen || 0});
});


io.on('connection', (socket: any) => {
    console.log('user id: ', socket.id);
    let user: IUser | null = null;
    socket.on('joined', (userPhone: phone) => {
        user = users.get(userPhone)!;
        user.isOnline = true;
        user.socketId = socket.id;
        user.lastSeen = null;
        socket.broadcast.emit('user online', {userPhone: user.phoneNumber})
    })

    socket.on('send message', ({senderPhone, receiverPhone, messageText, dialogId}:
                                   {
                                       senderPhone: phone, receiverPhone: phone, messageText: string,
                                       dialogId: dialogId
                                   }) => {
        const newMessageObj: IMessage = {
            createDate: Date.now(),
            text: messageText,
            senderPhone
        }
        const sender = users.get(senderPhone)!;
        const receiver = users.get(receiverPhone)!;
        addMessageToDialogByPhone(sender, dialogId, newMessageObj, receiver);
        addMessageToDialogByPhone(receiver, dialogId, newMessageObj, sender, true);
        if (receiver.isOnline) {
            io.to(receiver.socketId).emit("new message", {
                ...newMessageObj,
                partnerPhone: sender.phoneNumber,
                partnerAvatar: sender.avatar,
                partnerNickname: sender.nickname,
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