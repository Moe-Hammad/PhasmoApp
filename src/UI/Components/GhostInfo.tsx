interface GhostInfoProps {
  ghost: GhostDetailed;
}

export function GhostInfo({ ghost }: GhostInfoProps) {
  return (
    // <div className="col-md-2 mb-4 me-1 mb-1">
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{ghost.name}</h5>
        <p className="card-text mb-1">
          <strong>Strength:</strong> {ghost.strength}
        </p>
        <p className="card-text mb-1">
          <strong>Weakness:</strong> {ghost.weakness}
        </p>
        {/* <p className="card-text mb-2">
          <strong>Blinking Pattern:</strong> {ghost.blinkingPattern}
        </p> */}
        <div>
          <strong>Evidence:</strong>{" "}
          {ghost.evidence.map((e) => (
            <span key={e} className="badge bg-primary me-1 mb-1">
              {e}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer text-muted">Speed: {ghost.speed} m/s</div>
    </div>
    // </div>
  );
}
