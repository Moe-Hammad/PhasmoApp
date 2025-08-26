import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GhostFilter } from "./Components/GhostFilter";
import { GhostInfo } from "./Components/GhostInfo";

function App() {
  const [ghosts, setGhosts] = useState<GhostDetailed[]>([]);
  const [evidence, setEvidence] = useState<EvidenceMap>([]);

  // Geister vom Backend laden
  useEffect(() => {
    async function fetchGhosts() {
      try {
        const allGhosts = await window.electron.getGhosts();
        setGhosts(allGhosts);
      } catch (error) {
        console.error("Fehler beim Laden der Ghosts:", error);
      }
    }

    fetchGhosts();
  }, []);

  if (ghosts.length === 0) {
    return <p className="text-center mt-5">No ghosts found.</p>;
  }

  return (
    <div className="container py-4">
      <h1 className=" mb-4 text-center">Phasmophobia Ghosts</h1>

      <div className="row h-100">
        {<GhostFilter ghosts={ghosts}></GhostFilter>}
      </div>
      <div className="row">
        {ghosts.map((ghost) => (
          <GhostInfo key={ghost.name} ghost={ghost} />
        ))}
      </div>
    </div>
  );
}

export default App;
