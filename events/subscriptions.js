import publisher from './Publisher';
import handlers from './handlers';

const subscribeHandlers = () => {
  publisher.subscribe('update_view_count', handlers.updateBlockerViewCount);
  publisher.subscribe('added_new_comment', handlers.updateBlockerWithNewComment);
};

export default subscribeHandlers;
