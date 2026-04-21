import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class NetworkingService extends BaseService {
  constructor() {
    super({ name: "Networking", port: 4006 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/networking", router);
  }
}

const service = new NetworkingService();
service.start();
