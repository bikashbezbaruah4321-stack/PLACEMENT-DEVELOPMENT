import React, { useState } from 'react';
import { STUDY_TRACKS } from '../../data/mockData';
import { StudyTrack } from '../../types';
import {
  Compass,
  CheckCircle2,
  Circle,
  Building2,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';

export const StudyPathsView: React.FC = () => {
  const [tracks, setTracks] = useState<StudyTrack[]>(STUDY_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(STUDY_TRACKS[0].id);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('m1');

  const activeTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  const handleToggleModuleComplete = (moduleId: string) => {
    setTracks((prev) =>
      prev.map((track) => {
        if (track.id !== selectedTrackId) return track;
        const updatedModules = track.modules.map((mod) =>
          mod.id === moduleId ? { ...mod, completed: !mod.completed } : mod
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const newPercent = Math.round((completedCount / updatedModules.length) * 100);
        return {
          ...track,
          modules: updatedModules,
          completedPercent: newPercent,
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Track Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Compass className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
              <span className="font-semibold text-slate-900 dark:text-white">
                Industry-Aligned Study Tracks
              </span>
              <span aria-hidden="true">·</span>
              <span>ASU Fulton Engineering Curriculum</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Select Your Career Specialization
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-500 tabular-nums">
            {tracks.length} Industry Tracks Active
          </div>
        </div>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tracks.map((track) => {
            const isSelected = selectedTrackId === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrackId(track.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#8C1D40] bg-[#8C1D40]/5 dark:bg-[#8C1D40]/15 ring-1 ring-[#8C1D40]'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>{track.category}</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                    {track.completedPercent}%
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {track.title}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-[#8C1D40] h-full rounded-full transition-all duration-300"
                    style={{ width: `${track.completedPercent}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{track.totalWeeks} Weeks</span>
                  <span>{track.partnerCompanies.slice(0, 2).join(', ')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Track Details & Modules */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
        {/* Track Overview */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C1D40] dark:text-[#FFC627]">
              <span>{activeTrack.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">{activeTrack.recommendedFor}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
              {activeTrack.description}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shrink-0 text-xs">
            <div className="text-slate-400 text-[11px] mb-1">Corporate Hiring Partners</div>
            <div className="flex flex-wrap items-center gap-2">
              {activeTrack.partnerCompanies.map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 text-xs"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold pb-1">
            <span>CURRICULUM PHASES ({activeTrack.modules.length} MODULES)</span>
            <span className="font-mono tabular-nums">
              {activeTrack.modules.filter((m) => m.completed).length} of {activeTrack.modules.length} Completed
            </span>
          </div>

          {activeTrack.modules.map((mod, idx) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                {/* Module Bar */}
                <div className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModuleComplete(mod.id);
                      }}
                      className="text-slate-400 hover:text-[#8C1D40] transition-colors focus:outline-none"
                    >
                      {mod.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-semibold">Phase {idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{mod.duration}</span>
                        </span>
                      </div>
                      <div
                        onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                        className={`text-sm font-bold mt-0.5 ${
                          mod.completed
                            ? 'text-slate-600 dark:text-slate-400 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {mod.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-block text-xs font-mono text-slate-400 tabular-nums">
                      {mod.resourceCount} lectures & drills
                    </span>

                    <button
                      type="button"
                      onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/20 text-xs space-y-3">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1.5">
                        <Award className="w-3.5 h-3.5 text-[#8C1D40] dark:text-[#FFC627]" />
                        <span>Corporate Alignment Standard</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{mod.industryAlignment}</p>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        Core Competency Topics:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mod.topics.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
