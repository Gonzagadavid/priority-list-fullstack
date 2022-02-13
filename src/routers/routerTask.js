import { Router } from 'express';
import authToken from '../auth/index.js';
import {
  post, get, put, getById, deleteTask,
} from '../controllers/task/index.js';
import { validateTask } from '../middlewares/index.js';

const routerTask = Router();

routerTask.post('/', authToken, validateTask, post);
routerTask.get('/', authToken, get);
routerTask.get('/:id', authToken, getById);
routerTask.put('/:id', authToken, validateTask, put);
routerTask.delete('/:id', authToken, deleteTask);

export default routerTask;
