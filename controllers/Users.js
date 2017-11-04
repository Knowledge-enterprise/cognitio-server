import { Response } from '../utils';
import { userModel } from '../models';

export default class Users {
  static getUser(req, res) {
    userModel.findById(req.params.id)
      .populate('blockers')
      .then((done) => {
        Response.success(res, done);
      })
      .catch((error) => {
        Response.badRequest(res, error);
      })
  }

  static getAllUsers(req, res) {
    userModel.find()
      .then((done) => {
        Response.success(res, done);
      })
      .catch((error) => {
        Response.badRequest(res, error);
      })
  }

  static addUser(req, res) {
    const user = new userModel(req.body);

    user.save()
      .then((done) => {
        Response.success(res, done);
      })
      .catch((error) => {
        Response.badRequest(res, {
          message: error
        });
      })
  }
}