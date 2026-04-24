import { Command } from "commander";
import { policies } from "../../constants/policies.js";
import { authorizer } from "../../lib/authorizer.js";

export function registerAuthCommands(program: Command) {
  const auth = program.command("auth").description("Authorization management");

  auth
    .command("assign-role")
    .description("Assign a role to a user on a scope")
    .argument("<user>", "User ID")
    .argument("<role>", "Role name")
    .argument("<scope>", "Scope (e.g. /team/123)")
    .action(async (user, role, scope) => {
      await authorizer.assignRole(user, role, scope);
      console.log(
        `Role '${role}' assigned to user '${user}' on scope '${scope}'`,
      );
    });

  auth
    .command("revoke-role")
    .description("Revoke a role from a user on a scope")
    .argument("<user>", "User ID")
    .argument("<role>", "Role name")
    .argument("<scope>", "Scope")
    .action(async (user, role, scope) => {
      await authorizer.revokeRole(user, role, scope);
      console.log(
        `Role '${role}' revoked from user '${user}' on scope '${scope}'`,
      );
    });

  auth
    .command("assign-permission")
    .description("Assign a permission to a role")
    .argument("<role>", "Role name")
    .argument("<action>", "Action (e.g. user:read)")
    .action(async (role, action) => {
      await authorizer.assignRolePermission(role, action);
      console.log(`Permission '${action}' assigned to role '${role}'`);
    });

  auth
    .command("revoke-permission")
    .description("Revoke a permission from a role")
    .argument("<role>", "Role name")
    .argument("<action>", "Action")
    .action(async (role, action) => {
      await authorizer.revokeRolePermission(role, action);
      console.log(`Permission '${action}' revoked from role '${role}'`);
    });

  auth
    .command("check")
    .description("Check if a user has permission on a resource")
    .argument("<user>", "User ID")
    .argument("<resource>", "Resource URN")
    .argument("<action>", "Action")
    .action(async (user, resource, action) => {
      const allowed = await authorizer.can(user, resource, action);
      if (allowed) {
        console.log("✅ ALLOWED");
      } else {
        console.log("❌ DENIED");
      }
    });

  auth
    .command("sync-policies")
    .description("Sync policies from code to database")
    .action(async () => {
      console.log("Syncing policies...");

      const entries = Object.entries(policies);
      for (const [role, config] of entries) {
        console.log(`Processing role: ${role}`);

        // 1. Sync permissions
        if (config.permissions) {
          await Promise.all(
            config.permissions.map(async (permission) => {
              await authorizer.assignRolePermission(role, permission);
              console.log(`  Added permission: ${permission}`);
            }),
          );
        }

        // 2. Sync inheritance
        const inheritedRoles = (config as any).roles;
        if (inheritedRoles) {
          await Promise.all(
            inheritedRoles.map(async (parentRole: string) => {
              await authorizer.assignRoleInheritance(role, parentRole, "/");
              console.log(`  Added inheritance: ${role} -> ${parentRole}`);
            }),
          );
        }
      }

      console.log("Policy sync complete.");
    });
}
