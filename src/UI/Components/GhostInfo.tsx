interface GhostInfoProps {
  ghost: Ghost;
  behave?: GhostBehaviourDetails;
}

const renderObject = (obj: Record<string, any>): JSX.Element => (
  <div style={{ marginBottom: "10px" }}>
    {Object.entries(obj).map(([key, value]) => {
      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          // Array: primitives oder Objekte
          return (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              {value.map((v, i) =>
                typeof v === "object" ? (
                  <span key={i}>{renderObject(v)}</span>
                ) : (
                  <span key={i}>{(i > 0 ? ", " : "") + v}</span>
                )
              )}
            </div>
          );
        } else {
          // Verschachteltes Objekt → rekursiver Aufruf
          return (
            <div key={key}>
              <strong>{key}:</strong> {renderObject(value)}
            </div>
          );
        }
      }

      // Primitive Werte
      let displayValue: React.ReactNode = value;
      if (typeof value === "boolean") displayValue = value ? "Yes" : "No";

      return (
        <span key={key} style={{ marginRight: "10px" }}>
          <strong>{key}:</strong> {displayValue}
        </span>
      );
    })}
  </div>
);

export function GhostInfo({ ghost, behave }: GhostInfoProps) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{ghost.name}</h5>
        <div>
          <div>
            <div>{Object.entries(ghost).map((obj) => renderObject(obj))}</div>
          </div>

          {ghost.behaviour &&
            Object.entries(ghost.behaviour).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value}
              </p>
            ))}
        </div>

        {/* {behave && (
          <>
            <p className="card-text mb-1">
              <strong>Threshold:</strong> {behave.threshold}
            </p>
            <p className="card-text mb-1">
              <strong>Traits:</strong> {behave.traits.join(", ")}
            </p>
            <p className="card-text mb-1">
              <strong>Abilities:</strong> {behave.abilities.join(", ")}
            </p>
            <p className="card-text mb-1">
              <strong>Tests:</strong> {behave.tests.join(", ")}
            </p>
            <p className="card-text mb-1">
              <strong>Strategy:</strong> {behave.strategy.join(", ")}
            </p>
          </>
        )}

        <div className="mb-2">
          <strong>Evidence:</strong>{" "}
          {ghost.ev.map((e: EvidenceKey) => (
            <span key={e} className="badge bg-primary me-1 mb-1">
              {e}
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer text-muted">
        Speed: {ghost.speedDetails.speed ?? 0} m/s
      </div> */}
      </div>
    </div>
  );
}
