import React from 'react';

interface PeerPercentileCurveProps {
  percentile: number;
  cohortName: string;
  totalStudents: number;
}

export const PeerPercentileCurve: React.FC<PeerPercentileCurveProps> = ({
  percentile = 84,
  cohortName = 'Fulton Engineering 1st-Year Cohort',
  totalStudents = 1240,
}) => {
  const width = 360;
  const height = 120;
  const padding = { top: 15, bottom: 25, left: 15, right: 15 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Gaussian Bell curve distribution
  const pointsCount = 60;
  const bellPoints = [];
  const mean = 50;
  const sigma = 18;

  for (let i = 0; i <= pointsCount; i++) {
    const xVal = (i / pointsCount) * 100;
    // Normal distribution formula
    const exponent = -Math.pow(xVal - mean, 2) / (2 * Math.pow(sigma, 2));
    const yVal = Math.exp(exponent);
    const px = padding.left + (xVal / 100) * innerWidth;
    const py = padding.top + innerHeight - yVal * innerHeight * 0.95;
    bellPoints.push({ x: px, y: py, xVal });
  }

  const pathD = bellPoints.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

  // Shaded area under curve up to student's percentile
  const studentX = padding.left + (percentile / 100) * innerWidth;
  const shadedPoints = bellPoints.filter((p) => p.x <= studentX);
  
  // Calculate exact Y at studentX
  const studentExp = -Math.pow(percentile - mean, 2) / (2 * Math.pow(sigma, 2));
  const studentY = padding.top + innerHeight - Math.exp(studentExp) * innerHeight * 0.95;
  
  const shadedD = `${shadedPoints.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')} L ${studentX} ${studentY} L ${studentX} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`;

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
        <span className="truncate">{cohortName}</span>
        <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 font-medium">
          Top {100 - percentile}% ({Math.round(totalStudents * (1 - percentile / 100))} rank)
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Baseline */}
          <line
            x1={padding.left}
            y1={padding.top + innerHeight}
            x2={width - padding.right}
            y2={padding.top + innerHeight}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="1"
          />

          {/* Shaded student rank area */}
          <path d={shadedD} fill="rgba(140, 29, 64, 0.15)" />

          {/* Bell curve line */}
          <path
            d={pathD}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            className="opacity-70 dark:opacity-40"
          />

          {/* Student vertical line indicator */}
          <line
            x1={studentX}
            y1={studentY}
            x2={studentX}
            y2={padding.top + innerHeight}
            stroke="#8C1D40"
            strokeWidth="2"
            strokeDasharray="2 2"
          />

          {/* Marker dot */}
          <circle
            cx={studentX}
            cy={studentY}
            r="4.5"
            fill="#8C1D40"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* X ticks */}
          <text
            x={padding.left}
            y={height - 6}
            textAnchor="start"
            className="fill-slate-400 text-[10px] font-mono"
          >
            0%
          </text>
          <text
            x={padding.left + innerWidth * 0.5}
            y={height - 6}
            textAnchor="middle"
            className="fill-slate-400 text-[10px] font-mono"
          >
            Median (50%)
          </text>
          <text
            x={width - padding.right}
            y={height - 6}
            textAnchor="end"
            className="fill-slate-400 text-[10px] font-mono"
          >
            Top 1%
          </text>
        </svg>

        {/* Floating badge */}
        <div
          className="absolute text-[11px] font-semibold text-[#8C1D40] dark:text-[#FFC627] tabular-nums"
          style={{
            left: `${(studentX / width) * 100}%`,
            top: `${(studentY / height) * 100}%`,
            transform: 'translate(-50%, -130%)',
          }}
        >
          {percentile}th Pct
        </div>
      </div>
    </div>
  );
};
