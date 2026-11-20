import React, { useState } from 'react';

interface RadarPoint {
  subject: string;
  student: number;
  benchmark: number;
}

interface ReadinessRadarChartProps {
  data: RadarPoint[];
}

export const ReadinessRadarChart: React.FC<ReadinessRadarChartProps> = ({ data }) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const size = 320;
  const center = size / 2;
  const radius = 110;
  const total = data.length;
  const angleStep = (Math.PI * 2) / total;

  // Levels for the radar grid (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const studentPolygon = data
    .map((d, i) => {
      const { x, y } = getCoordinates(d.student, i);
      return `${x},${y}`;
    })
    .join(' ');

  const benchmarkPolygon = data
    .map((d, i) => {
      const { x, y } = getCoordinates(d.benchmark, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Concentric grid polygons */}
          {levels.map((level, lvlIdx) => {
            const points = data
              .map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = level * radius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ');
            return (
              <polygon
                key={lvlIdx}
                points={points}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth={lvlIdx === levels.length - 1 ? '1.5' : '1'}
                strokeDasharray={lvlIdx < levels.length - 1 ? '3 3' : undefined}
              />
            );
          })}

          {/* Radial axis lines */}
          {data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Benchmark polygon */}
          <polygon
            points={benchmarkPolygon}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-70"
          />

          {/* Student polygon */}
          <polygon
            points={studentPolygon}
            fill="rgba(140, 29, 64, 0.16)"
            stroke="#8C1D40"
            strokeWidth="2.5"
            className="transition-all duration-300"
          />

          {/* Data points & vertex hover handles */}
          {data.map((d, i) => {
            const { x, y } = getCoordinates(d.student, i);
            const isHovered = activePoint === i;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  className="fill-[#8C1D40] stroke-white dark:stroke-slate-900 cursor-pointer transition-transform duration-150"
                  strokeWidth="2"
                  onMouseEnter={() => setActivePoint(i)}
                  onMouseLeave={() => setActivePoint(null)}
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {data.map((d, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 24;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);
            const isHovered = activePoint === i;

            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] font-medium transition-colors cursor-pointer select-none ${
                  isHovered
                    ? 'fill-[#8C1D40] dark:fill-[#FFC627] font-semibold'
                    : 'fill-slate-600 dark:fill-slate-400'
                }`}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
              >
                {d.subject.split(' ')[0]}
              </text>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {activePoint !== null && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs rounded-md px-3 py-1.5 shadow-md border border-slate-700 pointer-events-none whitespace-nowrap z-10">
            <span className="font-semibold text-white">{data[activePoint].subject}</span>
            <div className="flex items-center gap-3 mt-1 text-[11px] tabular-nums">
              <span className="text-[#FFC627]">Devin: {data[activePoint].student}%</span>
              <span className="text-slate-400">Target: {data[activePoint].benchmark}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend & Summary */}
      <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-[#8C1D40] rounded-full inline-block" />
          <span>Student Score</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 border-t-2 border-dashed border-slate-400 inline-block" />
          <span>ASU Benchmark (80th Pct)</span>
        </div>
      </div>
    </div>
  );
};
