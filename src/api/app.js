import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from '../routers';

config();

const app = express();

const { FRONTENDAPP } = process.env;

const origin = FRONTENDAPP;

app.use(express.json());
app.use(cors({ origin }));

app.use('/', router);

export default app;
