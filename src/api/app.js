import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();

const { FRONTENDAPP } = process.env;

const origin = FRONTENDAPP;

app.use(express.json());
app.use(cors({ origin }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ping' });
});

export default app;
