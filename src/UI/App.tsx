import { useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const cpuUsages = useMemo(
    () => statistics.map((stats) => stats.cpuUsage),
    [statistics]
  );
  const ramUsage = useMemo(
    () => statistics.map((stats) => stats.ramUsage),
    [statistics]
  );
  const storageUsage = useMemo(
    () => statistics.map((stats) => stats.storageData),
    [statistics]
  );
  // Hier abonniert das Frontend mit dem backend und kann somit die Daten anzeigen lassen

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div style={{ height: 120 }}>
        <Chart data={cpuUsages} maxDataPoint={10} color={"#FFFFFF"} />
      </div>
      <div style={{ height: 120 }}>
        <Chart data={ramUsage} maxDataPoint={10} color={"#f60404ff"} />
      </div>
      <div style={{ height: 120 }}>
        <Chart data={storageUsage} maxDataPoint={10} color={"#1707f1ff"} />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
