import express from 'express';
import { Users } from '../controllers';

const router = express.Router();

router.get('/', Users.getAllUsers);
router.get('/:id', Users.getUser);
router.post('/', Users.addUser);

export default router;
