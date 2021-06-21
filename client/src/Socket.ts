import socketio, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { ServerPort } from './config';

const io: Socket<DefaultEventsMap, DefaultEventsMap> = socketio(ServerPort);

export default io;
