import { Router } from 'express';
import {
    signin,
    signup,
    verifyEmailHandler,
} from '../controllers/auth/auth.controller';

const router = Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/email/verify/:code', verifyEmailHandler);

export default router;
