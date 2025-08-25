// src/backend/getGhosts.ts
import type { Low } from "lowdb";

// Gibt alle Geister zurück
export async function getGhosts(db: Low<DBData>): Promise<Ghost[]> {
  await db.read();
  return db.data!.ghosts;
}
