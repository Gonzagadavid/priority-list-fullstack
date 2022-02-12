import { Router } from 'express';
import routerTask from './routerTask.js';
import routerUser from './routerUser.js';

const router = Router();

router.use('/user', routerUser);
router.use('/task', routerTask);

export default router;
