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

class UnauthorizedError extends ApiError {
  constructor(message = 'You aren\'t authorize to access this') {
    super(message, 401);
  }
}

class UserAlreadyUsedError extends ApiError {
  constructor(message = 'Username already used') {
    super(message, 409);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Your permission is not enough to access this.') {
    super(message, 403);
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
  UnauthorizedError,
  InternalServerError,
  UserAlreadyUsedError,
  ForbiddenError,
};
