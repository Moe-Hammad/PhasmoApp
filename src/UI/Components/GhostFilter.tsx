import { useState, useMemo } from "react";
import { GhostInfo } from "./GhostInfo";

interface GhostFilterProps {
  ghosts: Ghost[];
  evidence: EvidenceKey[]; // Alle möglichen Evidenzen
  behave?: SpecificGhostbehaviour | null; // Komplette Map
}

export function GhostFilter({ ghosts, evidence, behave }: GhostFilterProps) {
  const [selectedEV, setSelectedEV] = useState<EvidenceKey[]>([]);

  // Gefilterte Geister berechnen
  const filteredGhosts = useMemo(() => {
    if (selectedEV.length === 0) return ghosts;

    // Ghosts behalten, die ALLE ausgewählten Evidenzen enthalten
    return ghosts.filter((g) => selectedEV.every((ev) => g.ev.includes(ev)));
  }, [ghosts, selectedEV]);

  return (
    <div>
      {/* Evidence-Filter Buttons */}
      <div className="column-2 mb-3">
        {evidence.map((ev) => (
          <button
            key={ev}
            className={`btn me-2 mb-2 ${
              selectedEV.includes(ev) ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() =>
              setSelectedEV(
                (prev) =>
                  prev.includes(ev)
                    ? prev.filter((x) => x !== ev) // abwählen
                    : [...prev, ev] // auswählen
              )
            }
          >
            {ev}
          </button>
        ))}
      </div>

      {/* Gefilterte Ghost Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {filteredGhosts.map((ghost) => (
          <GhostInfo
            key={ghost.name}
            ghost={ghost}
            behave={behave ? behave[ghost.name] : undefined}
          />
        ))}
      </div>
    </div>
  );
}
