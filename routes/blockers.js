import express from 'express';
import { Blockers } from '../controllers';

const router = express.Router();

router.get('/', Blockers.getAllBlockers)
router.get('/:id', Blockers.getBlocker)
router.put('/:id', Blockers.updateBlocker)
router.delete('/', Blockers.deleteBlocker)

export default router;
