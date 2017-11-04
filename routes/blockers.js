import express from 'express';
import { Blockers } from '../controllers';
import {
  BlockerMiddleware as BM,
  Authentication as AM
} from '../middlewares';

const router = express.Router();

router.get('/', AM.verify, Blockers.getAllBlockers);
router.get('/:id', AM.verify, Blockers.getBlocker);
router.put('/:id', Blockers.updateBlocker);
router.post('/', AM.verify, BM.createBlocker, Blockers.createBlocker);
router.delete('/:id', Blockers.deleteBlocker);

export default router;
