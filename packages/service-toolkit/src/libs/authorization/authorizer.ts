import { newEnforcer, newModelFromString } from "casbin";
import { MongooseAdapter } from "casbin-mongoose-adapter";

/**
 * Custom Matcher: Checks if the user's assigned scope covers the requested object.
 * e.g., Assigned: "org_1", Requested: "org_1/repo_5" -> TRUE
 */
function matchScope(assignedScope: string, requestObject: string): boolean {
  // 1. Exact match (e.g. assigned on org_1, accessing org_1)
  if (assignedScope === requestObject) return true;

  // 2. Child match (e.g. assigned on org_1, accessing org_1/repo_5)
  // We check if the requestObject STARTS WITH the assignedScope + separator
  return requestObject.startsWith(assignedScope + "/");
}

export class Authorizer {
  private initialized = false;
  private enforcer: any;

  private readonly modelConf = `
    [request_definition]
    r = sub, obj, act
    
    [policy_definition]
    p = role, act
    
    [role_definition]
    g = _, _, _
    
    [matchers]
    # We pass the Request Object as the 'domain' to g()
    # But we define a custom domain matching function for the role manager.
    m = g(r.sub, p.role, r.obj) && p.act == r.act
  `;

  constructor(private mongoUri: string) {}

  private initializationPromise: Promise<void> | null = null;
  private async ensureInit() {
    if (this.initialized) return;
    if (this.initializationPromise) return this.initializationPromise;
    this.initializationPromise = (async () => {
      const adapter = new MongooseAdapter(this.mongoUri);
      const model = newModelFromString(this.modelConf);

      this.enforcer = await newEnforcer(model, adapter);

      // REGISTER THE CUSTOM DOMAIN MATCHER
      // This tells Casbin: "When checking if Alice has role X on 'org_1/repo_2',
      // also accept it if she has role X on 'org_1'".
      this.enforcer.getRoleManager().addDomainMatchingFunc(matchScope);
      this.initialized = true;
      this.initializationPromise = null;
    })();
    return this.initializationPromise;
  }

  // --- Management API ---

  // 1. Add User to Role (Scoped)
  async assignRole(user: string, role: string, scope: string) {
    await this.ensureInit();
    // e.g. assignRole('alice', 'admin', 'org_1')
    await this.enforcer.addGroupingPolicy(user, role, scope);
  }

  // 2. Define What Roles Can Do (Global definitions)
  async defineRolePermission(role: string, action: string) {
    await this.ensureInit();
    // e.g. defineRolePermission('admin', 'write')
    // This means "Admins can write" (on whatever scope they are assigned to)
    await this.enforcer.addPolicy(role, action);
  }

  // --- Check API ---

  async can(user: string, resourceUrn: string, action: string) {
    await this.ensureInit();
    // resourceUrn example: "org_1/ws_5/repo_git-flow"
    return await this.enforcer.enforce(user, resourceUrn, action);
  }
}
