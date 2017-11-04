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
router.put('/:id/upvote', AM.verify, Blockers.upvoteBlocker);
router.put('/:id/downvote', AM.verify, Blockers.downvoteBlocker);

export default router;
