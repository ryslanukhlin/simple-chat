import express, { Express } from 'express';
import donenv from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import HTTPServer from 'http';
import { Server as SocketIoServer } from 'socket.io';
import path from 'path';

import globalRouter from './route';
import { addFrendRequest } from './socket/ADD_FREND_REQUEST';
import { joinUser } from './socket/JOIN_USER';
import { leaveUser } from './socket/LEAVE_USER';
import { addFrend } from './socket/ADD_FREND';
import { joinMessageRoom } from './socket/JOIN_MESSAGE_ROOM';
import { sendMessage } from './socket/SEND_MESSAGE';
import { disconect } from './socket/disconnect';
import { leaveMessageRoom } from './socket/leaveMessageRoom';
import { clearUnreadNotificationAplicationFrends } from './socket/CLEAR_UNREAD_NOT_APL_FRN';
import { clearNewNotificationFrends } from './socket/CLEAR_NEW_NOT_FRENDS';

const app: Express = express();
const httpServer = HTTPServer.createServer(app);
const io = new SocketIoServer(httpServer, { cors: { origin: '*' } });

app.use(express.static(path.resolve(__dirname + '/static')));
donenv.config();
app.use(json());
app.use(cors({ origin: '*' }));
app.use([...globalRouter]);

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    io.on('connection', (socket) => {
        const metaData = { userId: null };
        joinUser(io, socket, metaData);
        leaveUser(io, socket);
        addFrendRequest(io, socket);
        addFrend(io, socket);
        clearUnreadNotificationAplicationFrends(io, socket);
        clearNewNotificationFrends(io, socket);
        joinMessageRoom(io, socket);
        leaveMessageRoom(io, socket);
        sendMessage(io, socket);
        disconect(io, socket, metaData);
    });

    httpServer.listen(PORT, () => {
        console.log(`server start has been http://localhost:${PORT}`);
    });
};

start();
