import { Router } from 'express';
import { post, login } from '../controllers/user/index.js';
import { validateUser, validateLogin } from '../middlewares/index.js';

const routerUser = Router();

routerUser.post('/', validateUser, post);
routerUser.post('/login', validateLogin, login);

export default routerUser;
