import { config } from 'dotenv';
import app from './app.js';

config();

const { PORT } = process.env;

app.listen(PORT, () => global.console.log(`server started in port ${PORT}`));
