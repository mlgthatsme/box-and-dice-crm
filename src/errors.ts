export class BoxDiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: any
  ) {
    super(message);
    this.name = 'BoxDiceError';
  }
}

export class AuthenticationError extends BoxDiceError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends BoxDiceError {
  constructor(retryAfter: number) {
    super(`Rate limit exceeded. Retry after ${retryAfter} seconds`, 429);
    this.name = 'RateLimitError';
  }
}
