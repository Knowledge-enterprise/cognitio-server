import publisher from './Publisher';
import handlers from './handlers';

const subscribeHandlers = () => {
  publisher.subscribe('update_view_count', handlers.updateBlockerViewCount);
};

export default subscribeHandlers;
