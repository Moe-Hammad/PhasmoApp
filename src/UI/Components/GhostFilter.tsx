import { useState, useMemo } from "react";
import { GhostInfo } from "./GhostInfo";

interface GhostFilterProps {
  ghosts: Ghost[];
}

export function GhostFilter({ ghosts }: GhostFilterProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence[]>([]);

  // Gefilterte Geister berechnen
  const filteredGhosts = useMemo(() => {
    if (selectedEvidence.length === 0) return ghosts;
    return ghosts.filter((g) =>
      selectedEvidence.some((e) => g.evidence.includes(e))
    );
  }, [ghosts, selectedEvidence]);

  return (
    <div>
      {/* Evidence-Filter Buttons */}
      <div className="column-2">
        {evidence.map((checked) => (
          <button
            key={checked}
            className={`btn me-2 mb-2 ${
              selectedEvidence.includes(checked)
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() =>
              setSelectedEvidence((prev) =>
                prev.includes(checked)
                  ? prev.filter((x) => x !== checked)
                  : [...prev, checked]
              )
            }
          >
            {checked}
          </button>
        ))}
      </div>

      {/* Gefilterte Ghost Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {filteredGhosts.map((ghost) => (
          <GhostInfo key={ghost.name} ghost={ghost} />
        ))}
      </div>
    </div>
  );
}
