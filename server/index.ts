import express, { Express } from 'express';
import donenv from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import HTTPServer from 'http';
import { Server as SocketIoServer } from 'socket.io';

import globalRouter from './route';
import { addFrendRequest } from './socket/ADD_FREND_REQUEST';
import { joinUser } from './socket/JOIN_USER';
import { addFrend } from './socket/ADD_FREND';

const app: Express = express();
const httpServer = HTTPServer.createServer(app);
const io = new SocketIoServer(httpServer, { cors: { origin: '*' } });

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
        joinUser(io, socket);
        addFrendRequest(io, socket);
        addFrend(io, socket);
    });

    httpServer.listen(PORT, () => {
        console.log(`server start has been http://localhost:${PORT}`);
    });
};

start();
