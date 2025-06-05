import type { Idea } from "@/database/entities";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("iden-database") as Dexie & {
	ideas: EntityTable<Idea, "id">;
};

db.version(1).stores({
	ideas: "++id, title, potential, status, duration, *tags, *relatedIdeas",
});

export { db };
