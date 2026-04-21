import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class IAMService extends BaseService {
  constructor() {
    super({ name: "IAM", port: 4002 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/iam", router);
  }
}

const service = new IAMService();
service.start();
