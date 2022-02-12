import { Router } from 'express';
import { post } from '../controllers/user/index.js';

const routerUser = Router();

routerUser.post('/', post);
routerUser.get('/');
routerUser.put('/');
routerUser.delete('/');

export default routerUser;
