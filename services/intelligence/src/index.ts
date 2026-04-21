import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class IntelligenceService extends BaseService {
  constructor() {
    super({ name: "Intelligence", port: 4005 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/intelligence", router);
  }
}

const service = new IntelligenceService();
service.start();
