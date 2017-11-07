import jwt from 'jsonwebtoken';
import { blockerModel, userModel } from '../models';
import { Response } from '../utils';

export default class Blockers {
  static createBlocker(req, res, next) {
    const data = Object.assign({}, { user: res.locals.user._id  }, req.body);
    const blocker = new blockerModel(data);
    blocker.validate((error) => {
      if (error) {
        Response.badRequest(res, {
          title: error.errors.title && error.errors.title.message,
          content: error.errors.content && error.errors.content.message,
          tags: error.errors.tags && error.errors.tags.message,
          user: error.errors.user && error.errors.user.message,
        })
      } else {
        res.locals.blocker = blocker;
        next();
      }
    });
  }

  static viewCounter(req, res) {
    
  }
}
