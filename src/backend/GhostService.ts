// src/backend/getGhosts.ts
import type { Low } from "lowdb";

// Gibt alle Geister zurück
export async function getGhosts(db: Low<DBData>): Promise<GhostDetailed[]> {
  await db.read();
  return db.data!.ghosts;
}

export function filterGhostsByEvidence(
  ghosts: GhostDetailed[],
  evidences: EvidenceMap
): GhostDetailed[] {
  if (evidences.length === 0) return ghosts; // Keine Filter -> alles zurückgeben
  return ghosts.filter((g) => evidences.some((e) => g.evidence.includes(e)));
}
