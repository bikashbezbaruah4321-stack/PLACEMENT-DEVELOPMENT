import React, { useState } from 'react';

interface HistoryPoint {
  week: string;
  aptitude: number;
  coding: number;
  technical: number;
  overall: number;
}

interface PerformanceAreaChartProps {
  data: HistoryPoint[];
}

export const PerformanceAreaChart: React.FC<PerformanceAreaChartProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'overall' | 'coding' | 'aptitude' | 'technical'>('overall');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 580;
  const height = 220;
  const padding = { top: 20, right: 24, bottom: 32, left: 36 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const yMin = 40;
  const yMax = 100;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - ((val - yMin) / (yMax - yMin)) * innerHeight;

  // Colors per metric
  const metricConfigs = {
    overall: { label: 'Overall Readiness', color: '#8C1D40', fill: 'rgba(140, 29, 64, 0.12)' },
    coding: { label: 'Coding & DSA', color: '#2563EB', fill: 'rgba(37, 99, 235, 0.12)' },
    aptitude: { label: 'Aptitude & Quant', color: '#059669', fill: 'rgba(5, 150, 105, 0.12)' },
    technical: { label: 'Core Technical', color: '#D97706', fill: 'rgba(217, 119, 6, 0.12)' },
  };

  const currentConfig = metricConfigs[activeMetric];

  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d[activeMetric]),
    val: d[activeMetric],
    week: d.week,
  }));

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  const yTicks = [40, 60, 80, 100];

  return (
    <div className="w-full flex flex-col">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span>Weekly Diagnostic Progression</span>
          <span className="mx-1.5" aria-hidden="true">·</span>
          <span className="tabular-nums font-mono">6 Weeks Tracked</span>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {(Object.keys(metricConfigs) as Array<keyof typeof metricConfigs>).map((key) => {
            const active = activeMetric === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMetric(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {metricConfigs[key].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Horizontal Grid lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 dark:fill-slate-500 text-[10px] font-mono tabular-nums"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill={currentConfig.fill} className="transition-all duration-300" />

          {/* Path line */}
          <path
            d={pathD}
            fill="none"
            stroke={currentConfig.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* X axis labels & vertical lines */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoverIndex === i;
            return (
              <g key={d.week}>
                <text
                  x={x}
                  y={height - padding.bottom + 18}
                  textAnchor="middle"
                  className={`text-[11px] font-mono tabular-nums transition-colors ${
                    isHovered
                      ? 'fill-slate-900 dark:fill-white font-semibold'
                      : 'fill-slate-500 dark:fill-slate-400'
                  }`}
                >
                  {d.week}
                </text>

                {/* Hover guideline */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={height - padding.bottom}
                    stroke={currentConfig.color}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}
              </g>
            );
          })}

          {/* Hover interactive hit areas & points */}
          {points.map((p, i) => {
            const isHovered = hoverIndex === i;
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill={currentConfig.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoverIndex(i)}
                />
                {/* Transparent wider target for easy touch/mouse hover */}
                <rect
                  x={p.x - 20}
                  y={padding.top}
                  width={40}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(i)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoverIndex !== null && (
          <div
            className="absolute bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs rounded-md px-3 py-2 shadow-lg border border-slate-700 pointer-events-none z-10 transition-transform duration-75"
            style={{
              left: `${(points[hoverIndex].x / width) * 100}%`,
              top: `${(points[hoverIndex].y / height) * 100}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="font-semibold text-slate-200">
              {data[hoverIndex].week} Diagnostic Result
            </div>
            <div className="mt-1 flex items-center justify-between gap-4 text-[11px] tabular-nums">
              <span className="text-slate-400">{currentConfig.label}:</span>
              <span className="font-bold text-[#FFC627]">{points[hoverIndex].val}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
