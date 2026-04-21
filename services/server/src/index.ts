import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { z } from "zod";

const app = express();
const port = 4050;

app.use(cors());
app.use(express.json());

// --- Types ---

interface AppConfig {
  routes: Record<string, string>;
}

interface AppInstance {
  id: string;
  name: string;
  teamId: string;
  config: AppConfig;
}

// --- Simple In-Memory DB ---

const db: {
  users: any[];
  teams: any[];
  apps: AppInstance[];
} = {
  users: [
    { id: "u-1", name: "Kervens Volcy", email: "kervens@hivary.com", teamId: "t-1" },
    { id: "u-2", name: "Jane Doe", email: "jane@hivary.com", teamId: "t-1" }
  ],
  teams: [
    { id: "t-1", name: "Core Engineering", ownerId: "u-1" }
  ],
  apps: [
    { 
      id: "tabula", 
      name: "Tabula Board", 
      teamId: "t-1",
      config: {
        routes: { "/": "home" }
      }
    }
  ]
};

// --- API Routes ---

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/users", (req, res) => {
  res.json(db.users);
});

app.get("/teams", (req, res) => {
  res.json(db.teams);
});

app.get("/apps", (req, res) => {
  res.json(db.apps);
});

app.post("/apps", (req, res) => {
  const schema = z.object({
    name: z.string().min(2),
    teamId: z.string()
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const newApp: AppInstance = {
    id: nanoid(10),
    name: result.data.name,
    teamId: result.data.teamId,
    config: { routes: {} }
  };

  db.apps.push(newApp);
  res.status(201).json(newApp);
});

app.listen(port, () => {
  console.log(`Hivary Backend running at http://localhost:${port}`);
});
