import React, { useState } from 'react';
import { PERSONALIZED_PLAN } from '../../data/mockData';
import { PlanItem, NavigationTab } from '../../types';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Filter,
} from 'lucide-react';

interface ImprovementPlanViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onStartPillarPractice: (category: 'Aptitude' | 'Coding' | 'Communication' | 'Technical') => void;
}

export const ImprovementPlanView: React.FC<ImprovementPlanViewProps> = ({
  onNavigate,
  onStartPillarPractice,
}) => {
  const [items, setItems] = useState<PlanItem[]>(PERSONALIZED_PLAN);
  const [filterPillar, setFilterPillar] = useState<string>('All');

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const filteredItems = filterPillar === 'All' ? items : items.filter((i) => i.pillar === filterPillar);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const handleAction = (item: PlanItem) => {
    switch (item.actionType) {
      case 'test':
        onStartPillarPractice(item.pillar);
        break;
      case 'code':
        onNavigate('coding');
        break;
      case 'interview':
        onNavigate('interview');
        break;
      case 'read':
        onNavigate('resume');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sprint Header & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Personalized 30-Day Placement Sprint
            </span>
            <span aria-hidden="true">·</span>
            <span>Week 1 Active</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            ASU Remediation & Placement Readiness Plan
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Curated daily targets synthesized from your recent test diagnostics to lift your overall readiness above the 80% placement bar.
          </p>
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-5 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Sprint Completion</div>
            <div className="flex items-baseline gap-1.5 mt-0.5 font-mono">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-500 tabular-nums">
                ({completedCount}/{items.length} tasks)
              </span>
            </div>
            {/* Bar */}
            <div className="w-32 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-[#8C1D40] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Task List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Filter by Pillar:</span>
            {['All', 'Aptitude', 'Coding', 'Communication', 'Technical'].map((pil) => (
              <button
                key={pil}
                type="button"
                onClick={() => setFilterPillar(pil)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterPillar === pil
                    ? 'bg-[#8C1D40] text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {pil}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Est. ~35 mins daily commitment
          </div>
        </div>

        {/* Action Items List */}
        <div className="space-y-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.completed
                  ? 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="mt-0.5 sm:mt-0 text-slate-300 dark:text-slate-600 hover:text-[#8C1D40] transition-colors focus:outline-none"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold">Day {item.day}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-medium ${
                        item.pillar === 'Coding'
                          ? 'text-blue-600 dark:text-blue-400'
                          : item.pillar === 'Aptitude'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : item.pillar === 'Communication'
                          ? 'text-[#8C1D40] dark:text-[#FFC627]'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {item.pillar}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.estimatedMinutes} mins</span>
                    </span>
                  </div>

                  <div
                    className={`text-sm font-semibold mt-0.5 ${
                      item.completed
                        ? 'line-through text-slate-500 dark:text-slate-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              </div>

              {/* Action Launch Button */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleAction(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>Launch Task</span>
                  <ArrowRight className="w-3 h-3 text-[#8C1D40] dark:text-[#FFC627]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
