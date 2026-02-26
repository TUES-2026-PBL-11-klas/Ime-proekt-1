import { ErrorResponseSchema, type ApiResponse } from '@/schemas/api';
import z from 'zod';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HttpOptions = {
  body?: unknown;
  headers?: Record<string, string>;
};

type HttpFunctionConfig<T> = {
    method: HttpMethod,
    path: string,
    options?: HttpOptions,
    schema?: z.ZodType<T>,
    token?: string
}

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'authorization',
  'cookie',
  'set-cookie',
  'accessToken',
  'refreshToken',
]);

const MAX_STRING_LENGTH = 500;

function truncateString(value: string): string {
  if (value.length <= MAX_STRING_LENGTH) {
    return value;
  }

  return `${value.slice(0, MAX_STRING_LENGTH)}... [truncated]`;
}

function sanitizeForLog(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    return truncateString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForLog(item));
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const sanitized: Record<string, unknown> = {};
    for (const [key, fieldValue] of Object.entries(obj)) {
      if (SENSITIVE_KEYS.has(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
        continue;
      }

      sanitized[key] = sanitizeForLog(fieldValue);
    }
    return sanitized;
  }

  return value;
}

function createRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * HTTP abstraction for API calls
 * Handles authentication, error parsing, and consistent response shape
 */
export async function http<T>({
  method,
  path,
  options,
  schema,
  token
}: HttpFunctionConfig<T>): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const url = `${baseUrl}${path}`;
  const requestId = createRequestId();
  const startTime = Date.now();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // Add Authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Prevent client side calls
  if (typeof window !== 'undefined') {
    return {
        success: false,
        message: "Only make backend API calls server side."
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (options?.body && method !== 'GET') {
    config.body = JSON.stringify(options.body);
  }

  const requestLog = {
    requestId,
    method,
    path,
    url,
    headers: sanitizeForLog(headers),
    body: method === 'GET' ? undefined : sanitizeForLog(options?.body),
  };

  console.info('[Express Backend Request]', requestLog);

  try {
    const response = await fetch(url, config);
    const status = response.status;
    const durationMs = Date.now() - startTime;

    // Parse response safely (JSON preferred, otherwise raw text)
    const rawText = await response.text();
    let json: unknown;
    if (rawText.length > 0) {
      try {
        json = JSON.parse(rawText);
      } catch {
        json = rawText;
      }
    }

    if (typeof json === 'string') {
      console.error('[Express Backend Error] Invalid response format', {
        requestId,
        method,
        path,
        status,
        durationMs,
        response: sanitizeForLog(json),
      });
      return {
        success: false,
        message: 'Invalid response format',
      };
    }

    // Check if response is successful (2xx)
    if (status >= 200 && status < 300) {
        if(schema) {
            const parsedData = schema.safeParse(json)
            if(!parsedData.success) {
                console.error('[Express Backend Error] Schema validation failed', {
                  requestId,
                  method,
                  path,
                  status,
                  durationMs,
                  response: sanitizeForLog(json),
                });
                return {
                    success: false,
                    message: "Invalid response format"
                }
            }
        }

        console.info('[Express Backend Response]', {
          requestId,
          method,
          path,
          status,
          durationMs,
          response: sanitizeForLog(json),
        });

        return {
            success: true,
            data: json as T,
        };
    }

    // Handle error response
    const parsedError = ErrorResponseSchema.safeParse(json)
    if(parsedError.success) {
        console.error('[Express Backend Error]', {
          requestId,
          method,
          path,
          status,
          durationMs,
          error: sanitizeForLog(parsedError.data.error),
          response: sanitizeForLog(json),
        });
        return {
            success: false,
            message: parsedError.data.error
        }
    }

    console.error('[Express Backend Error] Unexpected error response', {
      requestId,
      method,
      path,
      status,
      durationMs,
      response: sanitizeForLog(json),
    });

    // Fallback for unexpected error format
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } catch (error) {
    console.error('[Express Backend Error] Request failed', {
      requestId,
      method,
      path,
      durationMs: Date.now() - startTime,
      error: error instanceof Error ? error.message : String(error),
    });

    // Network errors or fetch failures
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}
