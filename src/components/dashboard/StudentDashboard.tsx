import React from 'react';
import {
  CURRENT_STUDENT,
  PILLAR_SCORES,
  RADAR_DATA,
  PERFORMANCE_HISTORY,
} from '../../data/mockData';
import { ReadinessRadarChart } from '../charts/ReadinessRadarChart';
import { PerformanceAreaChart } from '../charts/PerformanceAreaChart';
import { ActivityHeatmap } from '../charts/ActivityHeatmap';
import { PeerPercentileCurve } from '../charts/PeerPercentileCurve';
import { NavigationTab, RegisteredUser, CompletedInterviewReport } from '../../types';
import {
  Brain,
  Code2,
  MessageSquare,
  Cpu,
  ArrowUpRight,
  Calendar,
  AlertCircle,
  Building2,
  Award,
  ChevronRight,
  Flame,
  User,
  CheckCircle2,
} from 'lucide-react';

interface StudentDashboardProps {
  user: RegisteredUser;
  onNavigate: (tab: NavigationTab) => void;
  onStartPillarPractice: (category: 'Aptitude' | 'Coding' | 'Communication' | 'Technical') => void;
  interviewReport?: CompletedInterviewReport | null;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onNavigate,
  onStartPillarPractice,
  interviewReport,
}) => {
  // Aggregate placement readiness index
  const averageReadiness = Math.round(
    PILLAR_SCORES.reduce((acc, p) => acc + p.score, 0) / PILLAR_SCORES.length
  );

  const getPillarIcon = (key: string) => {
    switch (key) {
      case 'aptitude':
        return <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'coding':
        return <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'communication':
        return <MessageSquare className="w-5 h-5 text-[#8C1D40] dark:text-[#FFC627]" />;
      case 'technical':
        return <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Award className="w-5 h-5 text-slate-600" />;
    }
  };

  const getPillarCategory = (key: string): 'Aptitude' | 'Coding' | 'Communication' | 'Technical' => {
    switch (key) {
      case 'aptitude':
        return 'Aptitude';
      case 'coding':
        return 'Coding';
      case 'communication':
        return 'Communication';
      case 'technical':
        return 'Technical';
      default:
        return 'Aptitude';
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar + Details */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#8C1D40] text-white text-2xl font-bold flex items-center justify-center shadow-xs">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#8C1D40] text-[10px] font-bold text-white rounded-md tracking-wider">
                PP
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="text-xs text-slate-500 dark:text-slate-400">·</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  Student ID: {user.asuId}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <span>{user.college}</span>
                <span aria-hidden="true">·</span>
                <span>{user.degree}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#8C1D40] dark:text-[#FFC627]">
                  {user.semester}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">GPA: {user.gpa}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono">{user.email}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{user.phone}</span>
                <span aria-hidden="true">·</span>
                <span>Target: <strong className="text-slate-800 dark:text-slate-200">{user.targetRole}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Aggregate Readiness Ring */}
          <div className="flex items-center gap-5 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">Overall Placement Index</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                  {averageReadiness}%
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +7.2% vs baseline
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Evaluated across 60 diagnostic items
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5 text-[#8C1D40] dark:text-[#FFC627]" />
              <span>Full Profile & Records Sheet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Options for Home Dashboard (Requested by user) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
            Placement Preparation Modules
          </h2>
          <span className="text-xs text-slate-500">4 Active Pillars</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Option 1: Aptitude Practice */}
          <div
            onClick={() => onNavigate('aptitude')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-[#8C1D40] dark:hover:border-[#FFC627] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                Aptitude Practice
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Adaptive practice tests in quantitative ability, permutations, logical reasoning, and speed drills.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>82% Mastery</span>
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Start Tests <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Option 2: Coding Practice */}
          <div
            onClick={() => onNavigate('coding')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-[#8C1D40] dark:hover:border-[#FFC627] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                Coding Practice
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Data structures, algorithm challenges, in-browser code editor, and live test case evaluation runner.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>74% Mastery</span>
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Solve Problems <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Option 3: Resume Analyzer */}
          <div
            onClick={() => onNavigate('resume')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-[#8C1D40] dark:hover:border-[#FFC627] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                Resume Analyzer
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Automated ATS scan, role keyword alignment, quantifiable impact checks, and 1-click bullet rewrites.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>84/100 ATS Score</span>
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Scan Resume <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Option 4: Mock Interview */}
          <div
            onClick={() => onNavigate('interview')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-[#8C1D40] dark:hover:border-[#FFC627] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#8C1D40]/10 dark:bg-[#8C1D40]/20 text-[#8C1D40] dark:text-[#FFC627] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                Mock Interview
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                AI interviewer video & audio simulation, speech-to-text transcript, WPM pacing, and STAR feedback.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#8C1D40] dark:text-[#FFC627]">
              {interviewReport ? (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finished ({interviewReport.overallScore}%)</span>
                </span>
              ) : (
                <span>Round 1 Ready</span>
              )}
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {interviewReport ? 'View Report' : 'Enter Interview'} <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillar KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLAR_SCORES.map((pillar) => {
          const isNeedsFocus = pillar.status === 'Needs Focus';
          return (
            <div
              key={pillar.key}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getPillarIcon(pillar.key)}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isNeedsFocus
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {pillar.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {pillar.name}
                  </h2>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                      {pillar.score}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      Goal: {pillar.benchmark}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isNeedsFocus ? 'bg-amber-500' : 'bg-[#8C1D40]'
                    }`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>

                <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-slate-400">Priority Review: </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {pillar.topWeakness}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono tabular-nums">
                  {pillar.testsCompleted} sessions
                </span>
                <button
                  type="button"
                  onClick={() => onStartPillarPractice(getPillarCategory(pillar.key))}
                  className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline inline-flex items-center gap-1"
                >
                  <span>Practice</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row: Radar Chart + Performance Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Placement Competency Radar */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Skill Balance & Readiness Radar
              </h2>
              <span className="text-xs font-mono text-slate-500 tabular-nums">6 Core Dimensions</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Evaluates current test scores against freshman placement benchmarks for top software firms.
            </p>
          </div>

          <div className="py-2">
            <ReadinessRadarChart data={RADAR_DATA} />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Strongest: Communication (86%)</span>
            <button
              type="button"
              onClick={() => onNavigate('aptitude')}
              className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline"
            >
              Start Adaptive Quiz →
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Performance Over Time Area Chart */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Diagnostic Progression Trend
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                Week 1 – Week 6
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Adaptive scoring tracks your mastery velocity and retention over weekly diagnostic tests.
            </p>
          </div>

          <div className="py-1">
            <PerformanceAreaChart data={PERFORMANCE_HISTORY} />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Gain: +18 points since Week 1 baseline</span>
            <button
              type="button"
              onClick={() => onNavigate('aptitude')}
              className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline"
            >
              Start Adaptive Drills →
            </button>
          </div>
        </div>
      </div>

      {/* Activity Heatmap & Cohort Distribution Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Placement Consistency Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily practice discipline across aptitude tests, coding challenges, and mock answers.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold font-mono">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>18-Day Streak</span>
            </div>
          </div>
          <ActivityHeatmap />
        </div>

        {/* Peer Percentile Distribution (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              ASU Freshman Cohort Standing
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Normal percentile curve across 1,240 Fulton Computer Science freshmen.
            </p>
          </div>

          <div className="py-2">
            <PeerPercentileCurve
              percentile={84}
              cohortName="ASU Fulton CS 2026 Cohort"
              totalStudents={1240}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">182 spots above median</span>
            <button
              type="button"
              onClick={() => onNavigate('coding')}
              className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline"
            >
              Enter Coding Arena →
            </button>
          </div>
        </div>
      </div>

      {/* Action Banners & Campus Placement Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent AI Diagnostic Action */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>AI Placement Diagnostic Recommendation</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              Reinforce Dynamic Programming & Time Complexity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Your recent practice tests revealed a 32% accuracy dip in recursive memoization. Completing a 25-minute targeted drill will lift your coding pillar past the 80% benchmark.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">25 mins · 6 questions</span>
            <button
              type="button"
              onClick={() => onStartPillarPractice('Coding')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-lg shadow-xs transition-colors"
            >
              Start Target Drill
            </button>
          </div>
        </div>

        {/* AI Mock Interview Callout */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <MessageSquare className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
              <span>Next Milestone</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              Behavioral & Technical Mock Interview
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Simulate a real 15-minute campus interview with AI interviewer Sarah Lin. Receive live speech-to-text analysis, STAR scoring, and filler word detection.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-mono">Camera & Mic Enabled</span>
            <button
              type="button"
              onClick={() => onNavigate('interview')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Launch Simulator
            </button>
          </div>
        </div>

        {/* ASU Campus Placement Drives */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>ASU Campus Drives</span>
              </span>
              <span className="font-mono tabular-nums">Fall 2026</span>
            </div>

            <div className="space-y-2.5 mt-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Intel Chandler Lab</div>
                    <div className="text-[11px] text-slate-500">Firmware & Systems Interns</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 tabular-nums">Nov 18</span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Amazon AWS Day</div>
                    <div className="text-[11px] text-slate-500">SDE 1 Internship Screening</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 tabular-nums">Dec 02</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">ASU Fulton SunHacks</div>
                    <div className="text-[11px] text-slate-500">Recruiter Networking Arena</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 tabular-nums">Nov 22</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">3 eligibility criteria met</span>
            <button
              type="button"
              onClick={() => onNavigate('resume')}
              className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline"
            >
              Verify ATS Resume →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
