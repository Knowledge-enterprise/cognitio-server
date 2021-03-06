import express from 'express';
import { Blockers } from '../controllers';
import {
  BlockerMiddleware as BM,
  Authentication as AM
} from '../middlewares';

const router = express.Router();

router.get('/search', AM.verify, Blockers.searchBlockers);
router.get('/', AM.verify, Blockers.getAllBlockers);
router.get('/:id', AM.verify, Blockers.getBlocker);
router.put('/:id', AM.verify, Blockers.updateBlocker);
router.post('/', AM.verify, BM.createBlocker, Blockers.createBlocker);
router.delete('/:id', AM.verify, BM.deleteBlocker, Blockers.deleteBlocker);
router.put('/:id/upvote', AM.verify, Blockers.upvoteBlocker);
router.put('/:id/downvote', AM.verify, Blockers.downvoteBlocker);
router.get('/:id/comments', AM.verify, Blockers.getComments);
router.post('/:id/comments', AM.verify, Blockers.addComment);
router.post('/comment/:id/reply', AM.verify, Blockers.addCommentReply);

export default router;
