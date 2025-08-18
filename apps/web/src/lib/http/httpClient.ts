'use client';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  csrfToken?: string;
  getAuthToken?: () => string | null; // np. JWT z localStorage albo cookies
  defaultHeaders?: Record<string, string>;
}

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  signal?: AbortSignal;
  skipAuth?: boolean;
  skipCsrf?: boolean;
}

export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      timeout: 8000,
      defaultHeaders: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  private async request<TResponse = unknown, TBody = unknown>(endpoint: string, options: RequestOptions<TBody> = {}): Promise<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    const headers: Record<string, string> = {
      ...this.config.defaultHeaders,
      ...options.headers,
    };

    // 🔒 JWT/Auth
    if (!options.skipAuth && this.config.getAuthToken) {
      const token = this.config.getAuthToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    // 🔒 CSRF
    if (!options.skipCsrf && this.config.csrfToken) {
      headers['X-CSRF-Token'] = this.config.csrfToken;
    }

    const res = await fetch(`${this.config.baseURL || ''}${endpoint}`, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal ?? controller.signal,
      credentials: 'include', // wysyłaj cookies
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
      let errMsg = `Request failed with status ${res.status}`;
      try {
        const data = await res.json();
        errMsg = data.message || errMsg;
      } catch {}
      throw new Error(errMsg);
    }

    try {
      return (await res.json()) as TResponse;
    } catch {
      return {} as TResponse;
    }
  }

  get<TResponse>(url: string, options?: RequestOptions) {
    return this.request<TResponse>(url, { ...options, method: 'GET' });
  }

  post<TResponse, TBody>(url: string, body: TBody, options?: RequestOptions<TBody>) {
    return this.request<TResponse, TBody>(url, { ...options, method: 'POST', body });
  }

  put<TResponse, TBody>(url: string, body: TBody, options?: RequestOptions<TBody>) {
    return this.request<TResponse, TBody>(url, { ...options, method: 'PUT', body });
  }

  patch<TResponse, TBody>(url: string, body: TBody, options?: RequestOptions<TBody>) {
    return this.request<TResponse, TBody>(url, { ...options, method: 'PATCH', body });
  }

  delete<TResponse>(url: string, options?: RequestOptions) {
    return this.request<TResponse>(url, { ...options, method: 'DELETE' });
  }
}
