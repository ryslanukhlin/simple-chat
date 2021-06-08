import express, { Express } from 'express';
import donenv from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';
import globalRouter from './route';
import mongoose from 'mongoose';

donenv.config();
const app: Express = express();
app.use(json());
app.use(cors({ origin: '*' }));
app.use([...globalRouter]);

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
        console.log(`server start has been http://localhost:${PORT}`);
    });
};
start();
