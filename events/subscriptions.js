import publisher from './Publisher';
import handlers from './handlers';

const subscribeHandlers = () => {
  publisher.subscribe('update_view_count', handlers.updateBlockerViewCount);
  publisher.subscribe('added_new_comment', handlers.updateBlockerWithNewComment);
  publisher.subscribe('update_tags', handlers.updateTags);
};

export default subscribeHandlers;
