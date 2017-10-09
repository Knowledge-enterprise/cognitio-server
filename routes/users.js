import express from 'express';
import { Users } from '../controllers';

const router = express.Router();

router.get('/', Users.getAllUsers)
router.get('/:id', Users.getUser)

export default router;
