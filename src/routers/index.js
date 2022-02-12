import { Router } from 'express';
import routerTask from './routerTask';
import routerUser from './routerUser';

const router = Router();

router.use('/user', routerUser);
router.use('/task', routerTask);

export default router;
