export default class Response {
    constructor() {
      this.status = 200;
    }

    static setStatus(status) {
      this.status = status;
      return this;
    }

    static getStatus() {
      return this.status;
    }

    static respond(res, data) {
      if (typeof data !== 'object') data = { message: data }
      return res.status(this.getStatus())
        .json(data);
    }

    static success(res, data) {
      return this.setStatus(200)
        .respond(res, data);
    }

    static notFound(res, message = 'Not found') {
      return this.setStatus(404)
        .respond(res, {
          message,
        });
    }

    static internalError(res, message = 'Internal error') {
      return this.setStatus(500)
        .respond(res, {
          message,
        });
    }

    static badRequest(res, message = 'Bad request') {
      return this.setStatus(400)
        .respond(res, {
          message
        });
    }

    static unAuthorized(res, message = 'Not authorized') {
      return this.setStatus(401)
        .respond(res, {
          message
        });
    }

    static forbidden(res, message = 'Access forbidden') {
      return this.setStatus(403)
        .respond(res, {
          message
        });
    }

    static created(res, data = 'Successfuly created') {
      return this.setStatus(201)
        .respond(res, data);
    }

    static unImplemented(res, message = 'Not yet implemented') {
      return this.setStatus(501)
        .respond(res, { message })
    }
  }