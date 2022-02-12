import { config } from 'dotenv';
import app from './app.js';

config();

const { PORT } = process.env;

app.listen(PORT, () => console.log(`server started in port ${PORT}`));
