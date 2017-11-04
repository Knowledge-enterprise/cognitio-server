import { Response } from '../utils';
import { blockerModel, userModel } from '../models';
import publisher from '../events/Publisher';

export default class Blockers {
  static getBlocker(req, res) {

    blockerModel.findOne({
      _id: req.params.id,
      isArchived: false,
    })
      .populate('user')
      .then((done) => {
        if (done) {
          Response.success(res, done);
          publisher.publish('update_view_count', done);
        } else {
          Response.notFound(res);
        }
      })
      .catch((error) => {
        Response.badRequest(res, error);
      });
  }

  static deleteBlocker(req, res) {
    blockerModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        isArchived: true,
      }
    }, {
      new: false,
      upsert: false,
    })
    .then((done) => {
      Response.success(res, {
        message: 'successfully archived'
      });
    })
    .catch((error) => {
        Response.badRequest(res, {
          message: 'error'
        });
      });
  }

  static updateBlocker(req, res) {
    blockerModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
      }
    }, {
      new: true,
    })
    .then((done) => {
      Response.success(res, done);
    })
    .catch((error) => {
      Response.badRequest(res);
    });
  }

  static getAllBlockers(req, res) {
    blockerModel.find({
      isArchived: false,
    })
      .populate('user')
      .then((done) => {
        Response.success(res, done);
      })
      .catch((error) => {
        Response.internalError(res)
      });
  }

  static createBlocker(req, res) {
    res.locals.blocker.save()
      .then((done) => {
        const updateUser = {
          $pushAll: { blockers: [done._id] },
        };
        userModel.findOneAndUpdate({
          _id: res.locals.blocker.user
        }, updateUser)
          .then((user) => {
            Response.success(res, done);
          })
          .catch((error) => {
            Response.internalError(res, error)
          });
      })
      .catch((error) => {
        Response.badRequest(res, error);
      });
  }

  static upvoteBlocker(req, res) {
    const loggedInUserEmail = res.locals.user.UserInfo.email;
    blockerModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $addToSet: {
        rating: loggedInUserEmail,
      }
    }, {
      new: true,
    })
    .then((done) => {
      Response.success(res, done);
    })
    .catch((error) => {
      Response.badRequest(res);
    });
  }

  static downvoteBlocker(req, res) {
    const loggedInUserEmail = res.locals.user.UserInfo.email;
    blockerModel.findOneAndUpdate({
      _id: req.params.id
    }, {
      $pullAll: {
        rating: [loggedInUserEmail],
      }
    }, {
      new: true,
    })
    .then((done) => {
      Response.success(res, done);
    })
    .catch((error) => {
      Response.badRequest(res);
    });
  }
}
