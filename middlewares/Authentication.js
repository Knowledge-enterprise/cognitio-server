import jwt from 'jsonwebtoken';
import { Response } from '../utils';
import { userModel } from '../models';

export default class Authentication {
  static verify(req, res, next) {
    const authorizationToken = req.headers.authorization;

    /**
     * A better authentication is to make an api call to
     *
     */

    if (!authorizationToken) return Response.unAuthorized(res);

    const token = authorizationToken ? authorizationToken.split(' ')[1] : null;

    if (!token) return Response.unAuthorized(res);

    res.locals.user = token ? jwt.decode(token) : null;

    if (!res.locals.user || !res.locals.user.UserInfo) return Response.unAuthorized(res);

    userModel.findOne({
      uid: res.locals.user.UserInfo.id
    })
      .then((userFound) => {
        if (!userFound) {
          Response.unAuthorized(res);
        } else {
          res.locals.user.userId = userFound._id;
          next();
        }
      });
  }
}