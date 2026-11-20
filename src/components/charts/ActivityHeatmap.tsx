import React, { useState } from 'react';

export const ActivityHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);

  // Generate 12 weeks of historical daily data leading up to today
  const weeks = 12;
  const daysPerWeek = 7;
  const dayNames = ['Mon', 'Wed', 'Fri'];

  // Seeded deterministic activity for realistic student practice
  const gridData = React.useMemo(() => {
    const cells: { date: string; count: number; level: number }[][] = [];
    const baseDate = new Date(2026, 10, 5); // Current date: Nov 5, 2026

    for (let w = 0; w < weeks; w++) {
      const weekCols = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const offsetDays = (weeks - 1 - w) * 7 + (6 - d);
        const cellDate = new Date(baseDate);
        cellDate.setDate(cellDate.getDate() - offsetDays);

        // Pattern: more activity on weekdays and recent weeks
        const dayOfWeek = cellDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const seed = (w * 7 + d * 3) % 11;
        let count = 0;
        if (!isWeekend && seed > 2) {
          count = (seed % 5) + 1;
        } else if (isWeekend && seed > 6) {
          count = 2;
        }

        let level = 0;
        if (count > 0 && count <= 1) level = 1;
        else if (count === 2) level = 2;
        else if (count === 3 || count === 4) level = 3;
        else if (count >= 5) level = 4;

        weekCols.push({
          date: cellDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          count,
          level,
        });
      }
      cells.push(weekCols);
    }
    return cells;
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#8C1D40]/25 border-[#8C1D40]/30';
      case 2:
        return 'bg-[#8C1D40]/50 border-[#8C1D40]/60';
      case 3:
        return 'bg-[#8C1D40]/80 border-[#8C1D40]';
      case 4:
        return 'bg-[#8C1D40] border-[#8C1D40]';
      default:
        return 'bg-slate-100 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-800';
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">18 Days</span> Active Streak
          </div>
          <span aria-hidden="true">·</span>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">78</span> Problems Solved
          </div>
          <span aria-hidden="true">·</span>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">42.5 hrs</span> Practice Logged
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#8C1D40]/25" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#8C1D40]/50" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#8C1D40]/80" />
          <span className="w-2.5 h-2.5 rounded-xs bg-[#8C1D40]" />
          <span>More</span>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative overflow-x-auto pb-1">
        <div className="flex gap-1.5 min-w-[340px]">
          {/* Day row labels */}
          <div className="flex flex-col justify-between py-0.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono pr-1 select-none">
            {dayNames.map((d) => (
              <span key={d} className="h-3 leading-3">
                {d}
              </span>
            ))}
          </div>

          {/* Columns of 7 days */}
          <div className="flex gap-1">
            {gridData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <button
                    key={dIdx}
                    type="button"
                    className={`w-3.5 h-3.5 rounded-xs border transition-transform duration-100 hover:scale-125 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8C1D40] ${getLevelColor(
                      day.level
                    )}`}
                    onMouseEnter={() => setHoveredCell({ date: day.date, count: day.count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    aria-label={`${day.count} activities on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 dark:bg-slate-800/95 text-white text-[11px] rounded-md px-2.5 py-1.5 shadow-md border border-slate-700 pointer-events-none whitespace-nowrap z-20">
            <span className="font-semibold text-[#FFC627] tabular-nums">
              {hoveredCell.count === 0 ? 'No activity' : `${hoveredCell.count} practice modules`}
            </span>
            <span className="text-slate-400 ml-1.5 font-normal">on {hoveredCell.date}</span>
          </div>
        )}
      </div>
    </div>
  );
};
