class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.httpStatus = status;
    this.class = this.constructor;
  }
}

class ResourceNotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class UserNotFoundError extends ApiError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

class ValidationError extends ApiError {
  constructor(details) {
    super(`Validation error: ${details}`, 400);
  }
}

class InvalidLoginError extends ApiError {
  constructor(message = 'Username or password incorrect') {
    super(message, 401);
  }
}

class InternalServerError extends ApiError {
  constructor(message = 'Something happened with our internal server :(') {
    super(message);
  }
}

module.exports = {
  ApiError,
  UserNotFoundError,
  ResourceNotFoundError,
  ValidationError,
  InternalServerError,
  InvalidLoginError,
};
