import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

export interface ServiceConfig {
  name: string;
  port: number;
}

export abstract class BaseService {
  protected app: Express;
  protected config: ServiceConfig;

  constructor(config: ServiceConfig) {
    dotenv.config();
    this.config = config;
    this.app = express();
    this.setupStandardMiddleware();
  }

  private setupStandardMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  protected abstract setupRoutes(): void;

  public start() {
    this.setupRoutes();
    this.app.listen(this.config.port, () => {
      console.log(`[${this.config.name}] Service started on port ${this.config.port}`);
    });
  }

  public getApp(): Express {
    return this.app;
  }
}
