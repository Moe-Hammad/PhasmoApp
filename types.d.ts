// types.d.ts

type DBData = {
  ghosts: GhostDetailed[];
};

type EvidenceItem = {
  name: string;
  img: string;
};
type EvidenceMap = EvidenceItem[];

type GhostDetailed = {
  name: string;
  evidence: EvidenceMap; // einfacher Zugriff mit .map
  strength: string;
  weakness: string;
  abilities: string;
  behavior: string;
  strategies: string;
  excluded: boolean;
};

// Kriterien für Filter: alle Eigenschaften optional
type GhostCriteria = Partial<GhostDetailed>;

// === IPC Mapping ===
type EventPayloadMapping = {
  "get-ghosts": GhostDetailed[]; // alle Geister
  "filter-ghosts": GhostDetailed[]; // gefilterte Geister
  "found-ghost": GhostDetailed; // gefundener Geist
};

// === Preload API im Window-Objekt ===
interface Window {
  electron: {
    getGhosts: () => Promise<GhostDetailed[]>;
    filterGhosts: (criteria: GhostCriteria) => Promise<GhostDetailed[]>;
  };
}
