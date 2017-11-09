import jwt from 'jsonwebtoken';
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
    let userToken;
    userModel.findOne({ 'uid': req.body.uid })
      .then((existingUser) => {
        if (existingUser !== null) {
          userToken = jwt.sign({
            data: existingUser
          }, process.env.JWT_SECRET, { expiresIn: '1h' });
          Response.success(res, userToken);
        } else {
          user.save()
            .then((done) => {
              userToken = jwt.sign({ data: done }, process.env.JWT_SECRET, { expiresIn: '1h' });
              Response.success(res, userToken);
            })
            .catch((error) => {
              Response.badRequest(res, {
                message: error
              });
            })
        }
      })
      .catch((error) => {
        Response.badRequest(res, error);
      });
  }
}
