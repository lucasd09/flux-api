import * as schema from "./schemas";
import { pgGenerate } from "drizzle-dbml-generator";

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema, out, relational });
