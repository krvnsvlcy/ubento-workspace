// --- Base ---
export class ServiceError extends Error {
  public status: number;
  public code: string;
  public context?: Record<string, unknown>;

  constructor(
    message: string,
    options: {
      status?: number;
      code?: string;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message);
    this.name = new.target.name;
    this.status = options.status ?? 500;
    this.code = options.code ?? "INTERNAL_ERROR";
    this.context = options.context;
  }
}

// --- 4xx: Client errors ---
export class ValidationError extends ServiceError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, { status: 400, code: "VALIDATION_ERROR", context });
  }
}

export class AuthenticationError extends ServiceError {
  constructor(
    message = "Authentication required",
    context?: Record<string, unknown>
  ) {
    super(message, { status: 401, code: "UNAUTHENTICATED", context });
  }
}

export class AuthorizationError extends ServiceError {
  constructor(message = "Not authorized", context?: Record<string, unknown>) {
    super(message, { status: 403, code: "FORBIDDEN", context });
  }
}

export class NotFoundError extends ServiceError {
  constructor(resource: string, context?: Record<string, unknown>) {
    super(`${resource} not found`, { status: 404, code: "NOT_FOUND", context });
  }
}

export class ConflictError extends ServiceError {
  constructor(message = "Conflict", context?: Record<string, unknown>) {
    super(message, { status: 409, code: "CONFLICT", context });
  }
}

export class TooManyRequestsError extends ServiceError {
  constructor(
    message = "Too many requests",
    context?: Record<string, unknown>
  ) {
    super(message, { status: 429, code: "TOO_MANY_REQUESTS", context });
  }
}

// --- 5xx: Server errors ---
export class InternalServerError extends ServiceError {
  constructor(
    message = "Internal server error",
    context?: Record<string, unknown>
  ) {
    super(message, { status: 500, code: "INTERNAL_ERROR", context });
  }
}

export class NotImplementedError extends ServiceError {
  constructor(message = "Not implemented", context?: Record<string, unknown>) {
    super(message, { status: 501, code: "NOT_IMPLEMENTED", context });
  }
}

export class ServiceUnavailableError extends ServiceError {
  constructor(
    message = "Service unavailable",
    context?: Record<string, unknown>
  ) {
    super(message, { status: 503, code: "SERVICE_UNAVAILABLE", context });
  }
}

export class TimeoutError extends ServiceError {
  constructor(
    message = "Operation timed out",
    context?: Record<string, unknown>
  ) {
    super(message, { status: 504, code: "TIMEOUT", context });
  }
}
