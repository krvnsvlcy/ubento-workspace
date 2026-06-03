// Define the configuration options for the retry logic
interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoff?: number;
}

/**
 * Retries an asynchronous operation with exponential backoff.
 * * @param operation - A function that returns a Promise to be executed.
 * @param options - Configuration for retries, delay, and backoff multiplier.
 * @returns A Promise resolving to the exact type `<T>` of the operation.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  let currentDelay = options.delayMs ?? 1000;
  const backoff = options.backoff ?? 2.0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(`Operation failed after ${maxRetries} retries.`);
        throw error;
      }

      // Safely handle the error type in TypeScript
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.warn(
        `Attempt ${attempt + 1}/${maxRetries} failed: ${errorMessage}. ` +
          `Retrying in ${currentDelay}ms...`,
      );

      // Wait for the specified delay
      await new Promise((resolve) => setTimeout(resolve, currentDelay));

      // Increase the delay for the next attempt
      currentDelay *= backoff;
    }
  }

  // TypeScript requires a return/throw at the end of the function,
  // though mathematically the loop will always return or throw first.
  throw new Error("Retry loop failed unexpectedly.");
}
