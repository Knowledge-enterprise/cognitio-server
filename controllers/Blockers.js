import mongoose from "mongoose";
import { Response } from "../utils";
import { blockerModel, userModel, commentModel, replyModel } from "../models";
import publisher from "../events/Publisher";

export default class Blockers {
  static getBlocker(req, res) {
    blockerModel
      .findOne({
        _id: req.params.id,
        isArchived: false
      })
      .populate("user")
      .then(done => {
        if (done) {
          Response.success(res, done);
          publisher.publish("update_view_count", done);
        } else {
          Response.notFound(res);
        }
      })
      .catch(error => {
        Response.badRequest(res, error);
      });
  }

  static deleteBlocker(req, res) {
    blockerModel
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            isArchived: true
          }
        },
        {
          new: false,
          upsert: false
        }
      )
      .then(done => {
        Response.success(res, {
          message: "successfully archived"
        });
      })
      .catch(error => {
        Response.badRequest(res, {
          message: "error"
        });
      });
  }

  static updateBlocker(req, res) {
    blockerModel
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            updatedAt: new Date()
          }
        },
        {
          new: true
        }
      )
      .then(updatedBlocker => {
        blockerModel
          .findById(updatedBlocker._id)
          .populate("user")
          .then(populatedBlocker => {
            Response.success(res, populatedBlocker);
          })
          .catch(error => {
            Response.badRequest(res);
          });
      })
      .catch(error => {
        Response.badRequest(res);
      });
  }

  static getAllBlockers(req, res) {
    const limit = parseInt(req.query.limit, 10)
      ? parseInt(req.query.limit, 10)
      : 10;
    const page = parseInt(req.query.page, 10)
      ? parseInt(req.query.page, 10)
      : 1;

    blockerModel
      .paginate(
        {
          isArchived: false
        },
        {
          sort: { _id: -1 },
          populate: "user",
          lean: false,
          limit,
          page
        }
      )
      .then(blockers => {
        Response.success(res, blockers);
      })
      .catch(error => {
        Response.internalError(res, error);
      });
  }

  static createBlocker(req, res) {
    res.locals.blocker
      .save()
      .then(done => {
        const updateUser = {
          $pushAll: { blockers: [done._id] }
        };
        userModel
          .findOneAndUpdate(
            {
              _id: res.locals.blocker.user
            },
            updateUser
          )
          .then(user => {
            blockerModel
              .findOne({
                _id: done._id,
                isArchived: false
              })
              .populate("user")
              .then(response => {
                Response.success(res, response);
              })
              .catch(error => {
                Response.internalError(res, error);
              });
          })
          .catch(error => {
            Response.internalError(res, error);
          });
      })
      .catch(error => {
        Response.badRequest(res, error);
      });
  }

  static upvoteBlocker(req, res) {
    blockerModel
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $addToSet: {
            rating: res.locals.user.email
          }
        },
        {
          new: true
        }
      )
      .then(done => {
        Response.success(res, done);
      })
      .catch(error => {
        Response.badRequest(res, error);
      });
  }

  static downvoteBlocker(req, res) {
    blockerModel
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $pullAll: {
            rating: [res.locals.user.email]
          }
        },
        {
          new: true
        }
      )
      .then(done => {
        Response.success(res, done);
      })
      .catch(error => {
        Response.badRequest(res);
      });
  }

  static addComment(req, res) {
    const blockerId = req.params.id;
    blockerModel
      .findById(req.params.id)
      .then(blocker => {
        if (!blocker)
          return Response.badRequest(res, {
            message: `No rating found with Id ${blockerId}`
          });
        console.log(req.body.comment);
        const comment = new commentModel(
          Object.assign(
            {},
            {
              comment: req.body.comment,
              blocker: blockerId,
              user: res.locals.user._id
            }
          )
        );
        comment
          .save()
          .then(newComment => {
            publisher.publish("added_new_comment", newComment);
            commentModel
              .findById(newComment._id)
              .populate("user")
              .then(populatedComment => {
                console.log(populatedComment);
                Response.success(res, populatedComment);
              })
              .catch(error =>
                Response.internalError(res, `An error occurred ${error}`)
              );
          })
          .catch(error => {
            Response.badRequest(
              res,
              `An error occurred creating comment ${error}`
            );
          });
      })
      .catch(error => {
        Response.badRequest(res, `Error processing request: ${error}`);
      });
  }

  static addCommentReply(req, res) {
    const commentId = req.params.id;

    commentModel
      .findById(req.params.id)
      .then(comment => {
        if (!comment)
          return Response.badRequest(res, {
            message: `No rating found with Id ${blockerId}`
          });
        const reply = new replyModel(
          Object.assign(
            {},
            {
              reply: req.body.reply,
              comment: commentId,
              user: res.locals.user._id
            }
          )
        );
        reply
          .save()
          .then(newReply => {
            publisher.publish("added_new_reply", newReply);
            replyModel
              .findById(newReply._id)
              .populate("comment")
              .then(populatedReply => {
                console.log(populatedReply);
                Response.success(res, populatedReply);
              })
              .catch(error =>
                Response.internalError(res, `An error occurred ${error}`)
              );
          })
          .catch(error => {
            Response.badRequest(
              res,
              `An error occurred creating comment ${error}`
            );
          });
      })
      .catch(error => {
        Response.badRequest(res, `Error processing request: ${error}`);
      });
  }

  static getComments(req, res) {
    const blockerId = req.params.id;
    commentModel
      .find({
        blocker: blockerId
      })
      .sort({ _id: -1 })
      .populate("user")
      .then(done => {
        Response.success(res, done);
      })
      .catch(error => {
        Response.badRequest(res, error);
      });
  }

  static searchBlockers(req, res) {
    const limit = parseInt(req.query.limit, 10)
      ? parseInt(req.query.limit, 10)
      : 10;
    const page = parseInt(req.query.page, 10)
      ? parseInt(req.query.page, 10)
      : 1;
    const query = req.query.q;

    blockerModel
      .paginate(
        {
          isArchived: false,
          $or: [
            { title: { $regex: query, $options: "$im" } },
            { content: { $regex: query, $options: "$im" } },
            { tags: { $regex: query, $options: "$im" } }
          ]
        },
        {
          populate: "user",
          lean: false,
          limit,
          page
        }
      )
      .then(done => {
        Response.success(res, done);
      })
      .catch(error => {
        Response.notFound(res, error);
      });
  }
}
