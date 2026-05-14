import { writeFileSync } from "fs";
import yaml from "yaml";
import { getSpec } from "./services/vercel.js";

const spec = await getSpec();
writeFileSync("scratch-spec.yaml", yaml.stringify(spec, null, 2));
