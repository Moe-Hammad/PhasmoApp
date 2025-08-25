// types.d.ts
type EvidenceMap = {
  [key: string]: EvidenceItem; // Keys sind "0", "1", "2", ...
};

type EvidenceItem = {
  name: string;
  img: string;
};

// === Ghost-Types ===
type Ghost = {
  name: string;
  strength: string;
  weakness: string;
  unique: string;
  blinkingPattern: "fast" | "slow" | "normal";
  evidence: Evidence[];
  speed: double;
};

type GhostDetailed = {
  name: string;
  evidence: EvidenceItem[]; // einfacher Zugriff mit .map
  strength: string;
  weakness: string;
  abilities: string;
  behavior: string;
  strategies: string;
  excluded: boolean;
};

type DBData = {
  ghosts: Ghost[];
};

// Kriterien für Filter: alle Eigenschaften optional
type GhostCriteria = Partial<Ghost>;

// === IPC Mapping ===
type EventPayloadMapping = {
  "get-ghosts": Ghost[]; // alle Geister
  "filter-ghosts": Ghost[]; // gefilterte Geister
  "found-ghost": Ghost; // gefundener Geist
};

// === Preload API im Window-Objekt ===
interface Window {
  electron: {
    getGhosts: () => Promise<Ghost[]>;
    filterGhosts: (criteria: GhostCriteria) => Promise<Ghost[]>;
  };
}
