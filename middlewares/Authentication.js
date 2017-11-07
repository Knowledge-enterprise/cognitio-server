import jwt from 'jsonwebtoken';
import { Response } from '../utils';
import { userModel } from '../models';

export default class Authentication {
  static verify(req, res, next) {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) return Response.unAuthorized(res);

    const token = authorizationToken ? authorizationToken.split(' ')[1] : null;

    if (!token) return Response.unAuthorized(res);

    res.locals.user = token ? jwt.decode(token).data : null;

    if (!res.locals.user) return Response.unAuthorized(res);

    userModel.findOne({
      uid: res.locals.user.uid
    })
      .then((userFound) => {
        if (!userFound) return Response.unAuthorized(res);
        next();
      });
  }
}
