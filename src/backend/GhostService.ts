// src/backend/getGhosts.ts
import type { Low } from "lowdb";

// Gibt alle Geister zurück
export async function getGhosts(db: Low<DBData>): Promise<Ghost[]> {
  await db.read();
  return db.data?.ghosts ?? [];
}

// Gibt alle Geister zurück
export async function getEveryThing(db: Low<DBData>): Promise<DBData> {
  await db.read();
  return db.data ?? [];
}

// Filtert Geister nach ausgewählten Evidences
function filterGhostsByEvidence(
  ghosts: Ghost[],
  evidences: EvidenceKey[]
): Ghost[] {
  if (evidences.length === 0) return ghosts;

  const ghostHasEvidence = (g: Ghost, e: EvidenceKey) =>
    g.ev.every((eObj) => Object.values(eObj).includes(e));

  if (evidences.length === 1) {
    // OR-Logik für einen einzelnen Beweis
    return ghosts.filter((g) => ghostHasEvidence(g, evidences[0]));
  } else {
    // AND-Logik für mehrere Beweise
    return ghosts.filter((g) => evidences.every((e) => ghostHasEvidence(g, e)));
  }
}
