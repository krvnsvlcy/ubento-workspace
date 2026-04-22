import { Command } from "commander";
import {
  createClient,
  deleteClient,
  getClient,
  listClients,
  updateClient,
} from "../../entities/management/client/client.js";
import {
  createClientCredential,
  listClientCredentials,
  revokeClientCredential,
} from "../../entities/management/client/credentials.js";

export function registerClientsCommands(program: Command) {
  const clients = program.command("clients").description("Client management");

  clients
    .command("list")
    .description("List clients")
    .option("-n, --name <name>", "Filter by name")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listClients({
        name: options.name,
        status: options.status,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  clients
    .command("get")
    .description("Get a client by ID")
    .argument("<id>", "Client ID")
    .action(async (id) => {
      const client = await getClient(id);
      console.log(JSON.stringify(client, null, 2));
    });

  clients
    .command("create")
    .description("Create a new client")
    .requiredOption("-n, --name <name>", "Client name")
    .option("-d, --description <description>", "Client description")
    .action(async (options) => {
      const client = await createClient({
        name: options.name,
        description: options.description,
      });
      console.log(JSON.stringify(client, null, 2));
    });

  clients
    .command("update")
    .description("Update a client")
    .argument("<id>", "Client ID")
    .option("-n, --name <name>", "New name")
    .option("-d, --description <description>", "New description")
    .option("-s, --status <status>", "New status")
    .action(async (id, options) => {
      const client = await updateClient(id, {
        name: options.name,
        description: options.description,
        status: options.status,
      });
      console.log(JSON.stringify(client, null, 2));
    });

  clients
    .command("delete")
    .description("Delete a client")
    .argument("<id>", "Client ID")
    .action(async (id) => {
      await deleteClient(id);
      console.log(`Client ${id} deleted`);
    });

  // ==================== Credentials ====================

  const credentials = clients
    .command("credentials")
    .description("Client credentials management");

  credentials
    .command("list")
    .description("List credentials for a client")
    .requiredOption("-c, --client-id <client_id>", "Client ID")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("--cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listClientCredentials({
        client_id: options.clientId,
        status: options.status,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  credentials
    .command("create")
    .description("Create a new credential for a client")
    .requiredOption("-c, --client-id <client_id>", "Client ID")
    .option("-l, --label <label>", "Credential label")
    .action(async (options) => {
      const cred = await createClientCredential({
        clientId: options.clientId,
        label: options.label,
      });
      console.log(JSON.stringify(cred, null, 2));
    });

  credentials
    .command("revoke")
    .description("Revoke a credential")
    .argument("<id>", "Credential ID")
    .action(async (id) => {
      await revokeClientCredential(id);
      console.log(`Credential ${id} revoked`);
    });
}
