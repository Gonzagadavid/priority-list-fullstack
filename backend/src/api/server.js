import { config } from 'dotenv';
import app from './app.js';

config();

const { PORT = 3800 } = process.env;

app.listen(PORT, () => global.console.log(`server started in port ${PORT}`));
