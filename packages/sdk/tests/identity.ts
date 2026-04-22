import { IdentityService } from "../src/services/iam.js";
import { tokenManager } from "./auth.js";

async function runIdentityServiceTests() {
  console.log("Running IdentityService tests...");

  const identityService = new IdentityService({
    tokenManager,
  });

  const [organizations, next] = await identityService.listOrganizations({
    limit: 2,
  });

  console.log("Fetched organizations:", organizations);
}

runIdentityServiceTests().catch((error) => {
  console.error("IdentityService tests failed:", error);
  process.exit(1);
});
