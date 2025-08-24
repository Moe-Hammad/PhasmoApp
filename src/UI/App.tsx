import { useEffect, useState } from "react";
import "./App.css";
import { BaseChart } from "./BaseChart";

function App() {
  const [count, setCount] = useState(0);

  // Hier abonniert das Frontend mit dem backend und kann somit die Daten anzeigen lassen
  useEffect(() => {
    //@ts-ignore
    const unsub = window.electron.subscribeStatistics((stats) =>
      console.log(stats)
    );
    return unsub;
  }, []);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div style={{ height: 120 }}>
        <BaseChart
          data={[{ value: 25 }, { value: 35 }, { value: 100 }]}
        ></BaseChart>
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
