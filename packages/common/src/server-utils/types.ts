export interface ServerConfig {
  port: number;
  name: string;
  nodeEnv: string;
  appVersion: string;
  maxConnections: number;
  requestTimeout: number;
  shutdownTimeout?: number;
  keepAliveTimeout?: number;
  headersTimeout?: number;
}

export interface ServerOptions {
  initializeServices?: () => Promise<void>;
  closeServices?: () => Promise<void>;
}
