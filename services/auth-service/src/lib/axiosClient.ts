import env from "@/config/env.ts";
import { logger } from "@zerodayz7/common";
import axios, { AxiosInstance } from "axios";

const USER_SERVICE_URL = env.USER_SERVICE_URL;

class UserClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: USER_SERVICE_URL,
      timeout: 5000, // 5s timeout
    });

    // opcjonalnie: interceptor logujący requesty i odpowiedzi
    this.client.interceptors.request.use((config) => {
      logger.info(`[UserClient] Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    this.client.interceptors.response.use(
      (res) => res,
      (err) => {
        logger.error(`[UserClient] Error: ${err.message}`);
        return Promise.reject(err);
      }
    );
  }
}

export const userClient = new UserClient();
