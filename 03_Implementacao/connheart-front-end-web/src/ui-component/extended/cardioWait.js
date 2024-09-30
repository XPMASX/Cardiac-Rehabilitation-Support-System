const styles = `
  .loading svg polyline {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .loading svg polyline#back {
    fill: none;
    stroke: #3b82f633;
  }

  .loading svg polyline#front {
    fill: none;
    stroke: #87cefa;
    stroke-dasharray: 48, 144;
    stroke-dashoffset: 192;
    animation: dash_682 1.4s linear infinite;
  }

  @keyframes dash_682 {
    72.5% {
      opacity: 0;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
`;

const cardioWait = () => {
    return (
        <div className="loading" style={{ width: '64px', height: '48px' }}>
            <style>{styles}</style>
            <svg width="100%" height="100%">
                <polyline points="0.157,23.954 14,23.954 21.843,48 43,0 50,24 64,24" id="back"></polyline>
                <polyline points="0.157,23.954 14,23.954 21.843,48 43,0 50,24 64,24" id="front"></polyline>
            </svg>
        </div>
    );
};

export default cardioWait;
