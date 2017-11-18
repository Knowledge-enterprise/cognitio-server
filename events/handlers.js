import logger from "winston";
import { blockerModel, commentModel } from "../models";

export default {
  updateBlockerViewCount(payload) {
    blockerModel
      .findByIdAndUpdate(
        payload._id,
        {
          $push: { views: [payload._id] }
        },
        {
          new: true,
          upsert: false
        }
      )
      .then(updated => {
        logger.info(
          `succssfully updated blocker view count ${payload.views
            .length} => ${updated.views.length}`.cyan
        );
      })
      .catch(error => {
        logger.error(`ERROR: updating blocker view count ${error}`);
      });
  },

  updateBlockerWithNewComment(payload) {
    blockerModel
      .findByIdAndUpdate(
        payload.blocker,
        {
          $addToSet: { comments: payload._id }
        },
        {
          new: true,
          upsert: false
        }
      )
      .then(updatedBlocker => {
        logger.info(
          `successfully associated new comment to a blocker ${updatedBlocker}`
        );
      })
      .catch(error => {
        logger.error(`ERROR: associating comment to a blocker ${error}`);
      });
  },

  updateCommentWithNewReply(payload) {
    commentModel
      .findByIdAndUpdate(
        payload.commentId,
        {
          $addToSet: { replies: payload._doc._id }
        },
        {
          new: true,
          upsert: false
        }
      )
      .then(updatedComment => {
        logger.info(
          `successfully associated new reply to a comment ${updatedComment}`
        );
      })
      .catch(error => {
        logger.error(`ERROR: associating reply to a comment ${error}`);
      });
  }
};
