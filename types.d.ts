// === Evidence ===
type EvidenceKey =
  | "EMF Level 5"
  | "Spirit Box"
  | "Ghost Writing"
  | "Freezing Temps"
  | "D.O.T.S"
  | "Ghost Orbs"
  | "Fingerprints (UV)";

// === Ghosts ===
type GhostName =
  | "Spirit"
  | "Wraith"
  | "Phantom"
  | "Poltergeist"
  | "Banshee"
  | "Jinn"
  | "Mare"
  | "Revenant"
  | "Shade"
  | "Demon"
  | "Yurei"
  | "Oni"
  | "Hantu"
  | "Yokai"
  | "Myling"
  | "Onryo"
  | "The Twins"
  | "Raiju"
  | "Obake"
  | "The Mimic"
  | "Moroi"
  | "Deogen"
  | "Thaye";

// === Behaviour Details ===
type GhostBehaviourDetails = {
  threshold: string;
  traits: string[];
  abilities: string[];
  tests: string[];
  strategy: string[];
};

// besser als Map (key: GhostName → Details)
type SpecificGhostbehaviour = { [key in GhostName]: GhostBehaviourDetails };

// === Speed ===
type SpeedModifier = { maxspeed: number; when: string };

type SpeedDetails = {
  speed: number; // base speed
  changesSpeed: boolean;
  fixed?: SpeedModifier[];
  notes?: string[];
};

// === Ghost Model ===
type Ghost = {
  name: GhostName;
  ev: EvidenceKey[]; // Evidences
  notes: string[];
  speedDetails: SpeedDetails;
  behaviour?: GhostBehaviourDetails;
};

// === DB Root ===
type DBData = {
  ghosts: Ghost[];
  behaviours: SpecificGhostbehaviour;
  evidences: EvidenceKey[];
};

// === Criteria for Filtering ===
type GhostCriteria = Partial<Ghost>;

// === IPC Mapping ===
type EventPayloadMapping = {
  "get-ghosts": Ghost[];
  "filter-ghosts": Ghost[];
  "found-ghost": Ghost;
};

// === Preload API ===
interface Window {
  electron: {
    getGhosts: () => Promise<Ghost[]>;
    getEveryThing: () => Promise<DBData>;
    filterGhosts: (criteria: GhostCriteria) => Promise<Ghost[]>;
  };
}
