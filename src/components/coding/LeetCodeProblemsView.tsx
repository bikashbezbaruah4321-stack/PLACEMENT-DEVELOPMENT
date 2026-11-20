import React, { useState, useMemo } from 'react';
import { CodingProblem } from '../../types';
import {
  CODING_PROBLEMS,
  CODING_COMPANIES,
} from '../../data/codingProblemsData';
import { ProblemWorkspaceView } from './ProblemWorkspaceView';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Play,
  Send,
  Calendar as CalendarIcon,
  Code2,
  CheckCircle2,
  XCircle,
  Shuffle,
  SlidersHorizontal,
  ArrowLeft,
  BookOpen,
  Compass,
  GraduationCap,
  Flame,
  Check,
  Terminal,
  X,
  Building2,
  Sparkles,
  Maximize2,
  FileCode,
  HelpCircle,
  ShieldCheck,
  Layers,
  ArrowUp,
} from 'lucide-react';

interface Props {
  onBackToDashboard?: () => void;
}

type TabType = 'All Topics' | 'Algorithms' | 'Database' | 'Shell' | 'Concurrency' | 'JavaScript';
type LangType = 'javascript' | 'python' | 'cpp' | 'java';

export const LeetCodeProblemsView: React.FC<Props> = ({ onBackToDashboard }) => {
  // Navigation & View state
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [problems, setProblems] = useState<CodingProblem[]>(CODING_PROBLEMS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TabType>('All Topics');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Med.' | 'Hard'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'solved' | 'attempted' | 'todo'>('All');
  const [companySearch, setCompanySearch] = useState('');

  // Problem navigation & handlers
  const handleOpenProblem = (prob: CodingProblem) => {
    setActiveProblem(prob);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = activeProblem
    ? problems.findIndex((p) => p.id === activeProblem.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < problems.length - 1;

  const handleNextProblem = () => {
    if (hasNext) {
      setActiveProblem(problems[currentIndex + 1]);
    }
  };

  const handlePrevProblem = () => {
    if (hasPrev) {
      setActiveProblem(problems[currentIndex - 1]);
    }
  };

  const handleProblemSolved = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, status: 'solved' } : p))
    );
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(query);
        const matchesNum = prob.number.toString().includes(query);
        const matchesTag = prob.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesNum && !matchesTag) return false;
      }

      // Category tab
      if (selectedCategory !== 'All Topics') {
        if (selectedCategory === 'Algorithms') {
          if (prob.category === 'Database' || prob.category === 'Shell') return false;
        } else if (selectedCategory === 'Database') {
          if (prob.category !== 'Database') return false;
        } else if (selectedCategory === 'Shell') {
          if (prob.category !== 'Shell') return false;
        } else if (selectedCategory === 'Concurrency') {
          if (prob.category !== 'Concurrency') return false;
        } else if (selectedCategory === 'JavaScript') {
          if (prob.category !== 'JavaScript') return false;
        }
      }

      // Topic tag
      if (selectedTopic && !prob.tags.includes(selectedTopic)) {
        return false;
      }

      // Company filter
      if (selectedCompany && !prob.companies.includes(selectedCompany)) {
        return false;
      }

      // Difficulty
      if (difficultyFilter !== 'All' && prob.difficulty !== difficultyFilter) {
        return false;
      }

      // Status
      if (statusFilter !== 'All' && prob.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [problems, searchQuery, selectedCategory, selectedTopic, selectedCompany, difficultyFilter, statusFilter]);

  // Dynamic Category Counts
  const categoryCounts: Record<TabType, number> = useMemo(() => {
    return {
      'All Topics': problems.length,
      'Algorithms': problems.filter((p) => p.category !== 'Database' && p.category !== 'Shell').length,
      'Database': problems.filter((p) => p.category === 'Database').length,
      'Shell': problems.filter((p) => p.category === 'Shell').length,
      'Concurrency': problems.filter((p) => p.category === 'Concurrency').length,
      'JavaScript': problems.filter((p) => p.category === 'JavaScript').length,
    };
  }, [problems]);

  // Solved counters
  const solvedCount = useMemo(() => problems.filter((p) => p.status === 'solved').length, [problems]);
  const easySolved = useMemo(() => problems.filter((p) => p.status === 'solved' && p.difficulty === 'Easy').length, [problems]);
  const medSolved = useMemo(() => problems.filter((p) => p.status === 'solved' && p.difficulty === 'Med.').length, [problems]);
  const hardSolved = useMemo(() => problems.filter((p) => p.status === 'solved' && p.difficulty === 'Hard').length, [problems]);

  // Pick random question
  const handleRandomPick = () => {
    if (filteredProblems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    handleOpenProblem(filteredProblems[randomIndex]);
  };

  // Company filtering
  const filteredCompanies = useMemo(() => {
    if (!companySearch.trim()) return CODING_COMPANIES;
    return CODING_COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(companySearch.toLowerCase())
    );
  }, [companySearch]);

  // ==========================================
  // VIEW: SINGLE PROBLEM WORKSPACE (IDE VIEW)
  // ==========================================
  if (activeProblem) {
    return (
      <ProblemWorkspaceView
        problem={activeProblem}
        onBack={() => setActiveProblem(null)}
        onBackToDashboard={onBackToDashboard}
        onNext={handleNextProblem}
        onPrev={handlePrevProblem}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onSolved={handleProblemSolved}
      />
    );
  }

  // ==========================================
  // VIEW: LEETCODE PROBLEMS DASHBOARD
  // (EXACT MATCH TO ATTACHED SCREENSHOT)
  // ==========================================
  return (
    <div className="space-y-4">
      {/* Top Corner Navigation Bar with Back Button */}
      {onBackToDashboard && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
            title="Return to Home Dashboard"
          >
            <ArrowLeft className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="hidden sm:inline">Coding Practice</span>
            <span className="hidden sm:inline text-slate-400">/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Problem Library (200 Questions)</span>
          </div>
        </div>
      )}

      {/* Main 3-Column Layout: Left Nav + Center Problem Table + Right Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ========================================================
            LEFT SIDEBAR (Col 1-2): Library, Quest, Explore, Study Plan
           ======================================================== */}
        <div className="hidden lg:block lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-1">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
              <span>Library</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Quest</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Compass className="w-4 h-4 text-sky-500" />
              <span>Explore</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Study Plan</span>
            </button>
          </div>

          {/* Student Solved Progress Mini Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs text-xs space-y-3">
            <div className="text-slate-500 text-[11px] font-medium">Session Progress</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  {solvedCount} / {problems.length}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Solved Questions
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent flex items-center justify-center font-bold text-[10px] text-emerald-600">
                {Math.round((solvedCount / problems.length) * 100)}%
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span className="text-emerald-600 font-semibold">Easy</span>
                <span className="font-mono tabular-nums">{easySolved} solved</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span className="text-amber-500 font-semibold">Medium</span>
                <span className="font-mono tabular-nums">{medSolved} solved</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span className="text-rose-500 font-semibold">Hard</span>
                <span className="font-mono tabular-nums">{hardSolved} solved</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            CENTER COLUMN (Col 3-9): Tags + Filter + Table
           ======================================================== */}
        <div className="lg:col-span-7 space-y-4">

          {/* Category Filter Pills (All Topics, Algorithms, Database, Shell, Concurrency, JavaScript) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {(['All Topics', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript'] as TabType[]).map(
              (cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat === 'Algorithms' && <Code2 className="w-3.5 h-3.5 text-amber-500" />}
                    {cat === 'Database' && <Layers className="w-3.5 h-3.5 text-blue-500" />}
                    {cat === 'Shell' && <Terminal className="w-3.5 h-3.5 text-emerald-500" />}
                    {cat === 'Concurrency' && <Sparkles className="w-3.5 h-3.5 text-purple-500" />}
                    {cat === 'JavaScript' && <FileCode className="w-3.5 h-3.5 text-yellow-500" />}
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Search & Secondary Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions by title or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#8C1D40] dark:focus:ring-[#FFC627] text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs focus:outline-none"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Med.">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs focus:outline-none"
            >
              <option value="All">Status: All</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="todo">Todo</option>
            </select>

            {/* Active Company Pill if set */}
            {selectedCompany && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                <span>{selectedCompany}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCompany(null)}
                  className="hover:opacity-75"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Random Pick Button */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 tabular-nums">
                {solvedCount}/{problems.length} Solved
              </span>
              <button
                type="button"
                onClick={handleRandomPick}
                title="Pick random question"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================
              PROBLEMS TABLE (LEETCODE ROW-BY-ROW STYLING)
             ======================================================== */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProblems.map((prob) => {
                const isHard = prob.difficulty === 'Hard';
                const isMed = prob.difficulty === 'Med.';
                const isEasy = prob.difficulty === 'Easy';

                return (
                  <div
                    key={prob.id}
                    onClick={() => handleOpenProblem(prob)}
                    className="p-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors flex items-center justify-between gap-4 text-xs group"
                  >
                    {/* Status & Title */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Solved checkmark */}
                      <div className="w-5 flex items-center justify-center shrink-0">
                        {prob.status === 'solved' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : prob.status === 'attempted' ? (
                          <div className="w-3 h-3 rounded-full border-2 border-amber-500" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-700" />
                        )}
                      </div>

                      {/* Daily Challenge Badge if daily */}
                      {prob.isDaily && (
                        <CalendarIcon className="w-4 h-4 text-sky-500 shrink-0" />
                      )}

                      {/* Title with problem number */}
                      <div className="truncate">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                          {prob.number}. {prob.title}
                        </span>
                      </div>
                    </div>

                    {/* Right side: Acceptance, Difficulty, Frequency Bar */}
                    <div className="flex items-center gap-6 shrink-0">
                      {/* Acceptance % */}
                      <span className="font-mono text-slate-500 tabular-nums w-12 text-right">
                        {prob.acceptance}
                      </span>

                      {/* Difficulty Badge */}
                      <span
                        className={`font-semibold w-12 text-right ${
                          isEasy
                            ? 'text-teal-600 dark:text-[#00af9b]'
                            : isMed
                            ? 'text-amber-500 dark:text-[#ffb800]'
                            : 'text-rose-500 dark:text-[#ff2d55]'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT SIDEBAR (Col 10-12): Calendar + Trending Companies
           ======================================================== */}
        <div className="lg:col-span-3 space-y-4">
          {/* Calendar Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white">Day 9</span>
                <span className="text-[10px] font-mono text-slate-400">05:31:45 left UTC</span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" className="p-1 text-slate-400 hover:text-slate-600">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  11 NOV
                </span>
                <button type="button" className="p-1 text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar Days Grid */}
            <div>
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 pb-1">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-mono">
                {/* Simulated November 30 days grid */}
                <div className="text-slate-300 dark:text-slate-700 py-1">1</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">2</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">3</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">4</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">5</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">6</div>
                <div className="text-slate-300 dark:text-slate-700 py-1">7</div>

                <div className="text-slate-600 dark:text-slate-400 py-1">8</div>
                {/* Active day 9 highlighted with solid green circle */}
                <div className="py-1">
                  <span className="w-6 h-6 mx-auto rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center">
                    9
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 py-1">10</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">11</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">12</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">13</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">14</div>

                <div className="text-slate-600 dark:text-slate-400 py-1">15</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">16</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">17</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">18</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">19</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">20</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">21</div>

                <div className="text-slate-600 dark:text-slate-400 py-1">22</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">23</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">24</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">25</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">26</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">27</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">28</div>

                <div className="text-slate-600 dark:text-slate-400 py-1">29</div>
                <div className="text-slate-600 dark:text-slate-400 py-1">30</div>
              </div>
            </div>

            {/* Weekly Premium Badges */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-amber-500 flex items-center gap-1">
                  Weekly Premium <HelpCircle className="w-3 h-3 text-slate-400" />
                </span>
                <span className="text-slate-400 text-[10px]">6 days left</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/60">
                  W45
                </span>
                <span className="px-2 py-1 rounded bg-amber-500 text-white font-bold">
                  W46
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                  W47
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                  W48
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                  W49
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 0 Redeem
                </span>
                <span className="text-slate-400 hover:underline cursor-pointer">
                  Rules
                </span>
              </div>
            </div>
          </div>

          {/* Trending Companies Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">
                Trending Companies
              </span>
              <div className="flex items-center gap-1 text-slate-400">
                <ChevronLeft className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                <ChevronRight className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
              </div>
            </div>

            {/* Company Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for a company..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Company Badges with Counts (LeetCode orange style) */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {filteredCompanies.map((c) => {
                const isSelected = selectedCompany === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCompany(isSelected ? null : c.name)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/40'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono opacity-80">{c.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
