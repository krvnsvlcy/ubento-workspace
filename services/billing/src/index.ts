import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class BillingService extends BaseService {
  constructor() {
    super({ name: "Billing", port: 4003 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/billing", router);
  }
}

const service = new BillingService();
service.start();
