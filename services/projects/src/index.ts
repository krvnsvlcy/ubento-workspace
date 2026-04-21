import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class ProjectsService extends BaseService {
  constructor() {
    super({ name: "Projects", port: 4001 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/projects", router);
  }
}

const service = new ProjectsService();
service.start();
