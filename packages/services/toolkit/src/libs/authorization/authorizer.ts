import { Enforcer, newEnforcer, newModelFromString } from "casbin";
import { MongooseAdapter } from "casbin-mongoose-adapter";

/**
 * Custom Matcher: Checks if the user's assigned scope covers the requested object.
 * Casbin passes: (requestScope, assignedScope)
 */
function matchScope(requestScope: string, assignedScope: string): boolean {
  // Global admin override
  if (assignedScope === "/" || assignedScope === "*") return true;

  // Exact match
  if (requestScope === assignedScope) return true;

  // Child match (e.g. assigned on /team/123, accessing /team/123/app/456)
  const cleanAssigned = assignedScope.replace(/\/$/, "");
  return requestScope.startsWith(cleanAssigned + "/");
}

export class Authorizer {
  private initialized = false;
  private enforcer: Enforcer | undefined;

  private readonly modelConf = `
[request_definition]
r = sub, scp, act

[policy_definition]
p = role, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
# Short-circuit: Check if accessing public scope as a guest FIRST, then fallback to DB roles
m = ((r.scp == "/public" && p.role == "guest") || g(r.sub, p.role, r.scp)) && (p.act == r.act || p.act == "*")
`.trim();

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
      const rm = this.enforcer?.getRoleManager();
      if (rm && "addDomainMatchingFunc" in rm) {
        (rm as any).addDomainMatchingFunc((...args: any[]) => {
          const result = matchScope(...(args as [string, string]));
          // console.log("Match:", result, assignedScope, requestObject);
          return result;
        });
      }
      this.initialized = true;
      this.initializationPromise = null;
    })();
    return this.initializationPromise;
  }

  // --- Management API ---

  async getEnforcer() {
    await this.ensureInit();
    if (!this.enforcer) throw new Error("Authorizer not initialized");
    return this.enforcer;
  }

  // 1. Add User to Role (Scoped)
  async RunHttpHandlerErrorCode(user: string, role: string, scope: string) {
    const enforcer = await this.getEnforcer();
    await enforcer.addGroupingPolicy(user, role, scope);
  }
  async revokeRole(user: string, role: string, scope: string) {
    const enforcer = await this.getEnforcer();
    await enforcer.removeGroupingPolicy(user, role, scope);
  }

  // 2. Define What Roles Can Do (Global definitions)
  async assignRolePermission(role: string, action: string) {
    const enforcer = await this.getEnforcer();
    await enforcer.addPolicy(role, action);
  }
  async revokeRolePermission(role: string, action: string) {
    const enforcer = await this.getEnforcer();
    await enforcer.removePolicy(role, action);
  }

  // 3. Define Role Inheritance (g policies between roles)
  async assignRoleInheritance(
    role: string,
    parentRole: string,
    scope: string = "/",
  ) {
    const enforcer = await this.getEnforcer();
    await enforcer.addGroupingPolicy(role, parentRole, scope);
  }
  async revokeRoleInheritance(
    role: string,
    parentRole: string,
    scope: string = "/",
  ) {
    const enforcer = await this.getEnforcer();
    await enforcer.removeGroupingPolicy(role, parentRole, scope);
  }

  // --- Check API ---

  async can(user: string, resourceUrn: string, action: string) {
    const enforcer = await this.getEnforcer();
    const allowed = await enforcer.enforce(user, resourceUrn, action);
    return allowed;
  }
}
