import logger from 'winston';
import { blockerModel, tagModel } from '../models';

export default {
  updateBlockerViewCount(payload) {
    blockerModel.findByIdAndUpdate(payload._id, {
      $push: { views: [payload._id] },
    }, {
        new: true,
        upsert: false,
      })
      .then((updated) => {
        logger.info(`succssfully updated blocker view count ${payload.views.length} => ${updated.views.length}`.cyan)
      })
      .catch((error) => {
        logger.error(`ERROR: updating blocker view count ${error}`);
      });
  },

  updateBlockerWithNewComment(payload) {
    blockerModel.findByIdAndUpdate(payload.blocker, {
      $addToSet: { comments: payload._id }
    }, {
        new: true,
        upsert: false,
      })
      .then((updatedBlocker) => {
        logger.info(`successfully associated new comment to a blocker ${updatedBlocker}`);
      })
      .catch((error) => {
        logger.error(`ERROR: associating comment to a blocker ${error}`);
      });
  },

  updateTags(tags) {
    tags.forEach((tag) => {
      var tag = new tagModel({name: tag});
      tag.save('tags')
      .then((done) => {
        logger.info('updated tags', done);
      })
      .catch((error) => {
        logger.error('could not update tags', error)
      })
    })
  }
}
