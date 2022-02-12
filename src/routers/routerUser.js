import { Router } from 'express';
import { post } from '../controllers/user/index.js';
import { validateUser } from '../middlewares/index.js';

const routerUser = Router();

routerUser.post('/', validateUser, post);
routerUser.get('/');
routerUser.put('/');
routerUser.delete('/');

export default routerUser;
