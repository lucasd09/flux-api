// src/utils/errors.ts
export class NotFoundError extends Error {
  name = "NotFoundError";
}

export class ConflictError extends Error {
  name = "ConflictError";
}

export class ValidationError extends Error {
  name = "ValidationError";
}

export class UnauthorizedError extends Error {
  name = "UnauthorizedError";

  constructor(message = "Unauthorized") {
    super(message);
  }
}

export class ForbiddenError extends Error {
  name = "ForbiddenError";

  constructor(message = "Forbidden") {
    super(message);
  }
}
