import React, { useState, useEffect } from 'react';
import { PEER_PROBLEMS } from '../../data/mockData';
import { PeerCodingProblem } from '../../types';
import {
  Code2,
  Play,
  Send,
  Timer,
  Swords,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Users,
  Terminal,
} from 'lucide-react';

export const PeerCodingArena: React.FC = () => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<
    { input: string; expected: string; actual: string; passed: boolean; timeMs: number }[] | null
  >(null);
  const [duelActive, setDuelActive] = useState(true);
  const [peerProgress, setPeerProgress] = useState(1); // 1 of 3 passed
  const [elapsedSeconds, setElapsedSeconds] = useState(184); // 3m 04s
  const [duelFinished, setDuelFinished] = useState(false);

  const problem: PeerCodingProblem = PEER_PROBLEMS[selectedProblemIndex];

  // Initialize starter code when problem or language changes
  useEffect(() => {
    setCode(problem.starterCode[language] || '');
    setTestResults(null);
    setDuelFinished(false);
    setPeerProgress(1);
  }, [selectedProblemIndex, language]);

  // Elapsed timer & peer progress simulator
  useEffect(() => {
    if (!duelActive || duelFinished) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      // Random peer simulated progress
      if (Math.random() > 0.85 && peerProgress < 3) {
        setPeerProgress((prev) => Math.min(3, prev + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [duelActive, duelFinished, peerProgress]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Evaluate test cases safely in browser for JS
      const results = problem.testCases.map((tc) => {
        let actual = '';
        let passed = false;
        const timeMs = Math.floor(Math.random() * 8) + 2;

        try {
          if (language === 'javascript') {
            // Safe simulation for known problems
            if (problem.id === 'prob-1') {
              // Intervals bay calculation
              const intervals = JSON.parse(tc.input);
              const starts = intervals.map((x: number[]) => x[0]).sort((a: number, b: number) => a - b);
              const ends = intervals.map((x: number[]) => x[1]).sort((a: number, b: number) => a - b);
              let bays = 0, maxBays = 0, endPtr = 0;
              for (let i = 0; i < starts.length; i++) {
                if (starts[i] < ends[endPtr]) {
                  bays++;
                  maxBays = Math.max(maxBays, bays);
                } else {
                  endPtr++;
                }
              }
              actual = String(maxBays);
              passed = actual === tc.expected;
            } else if (problem.id === 'prob-2') {
              // Valid brackets
              const s = JSON.parse(tc.input);
              const stack = [];
              const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
              let valid = true;
              for (const ch of s) {
                if (ch === '(' || ch === '[' || ch === '{') {
                  stack.push(ch);
                } else if (pairs[ch]) {
                  if (stack.pop() !== pairs[ch]) {
                    valid = false;
                    break;
                  }
                }
              }
              actual = String(valid && stack.length === 0);
              passed = actual === tc.expected;
            }
          } else {
            // Python mode mockup evaluation
            actual = tc.expected;
            passed = true;
          }
        } catch (e) {
          actual = 'Runtime Error';
          passed = false;
        }

        return { input: tc.input, expected: tc.expected, actual, passed, timeMs };
      });

      setTestResults(results);
      setIsRunning(false);

      if (results.every((r) => r.passed)) {
        setDuelFinished(true);
        setDuelActive(false);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1v1 Arena Matchmaking Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Player vs Peer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                src="/src/assets/images/avatar_student_1793904634702.jpg"
                alt="Devin Chen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Devin Chen (You)</div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                1,540 MMR · ASU CS '28
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-xs shrink-0">
            VS
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
              MV
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Marcus Vance</div>
              <div className="text-[11px] font-mono text-slate-500">1,525 MMR · Barrett Fulton</div>
            </div>
          </div>
        </div>

        {/* Right: Duel Status & Live Opponent Progress */}
        <div className="flex flex-wrap items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-6 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Opponent Status</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
              <span className="font-mono tabular-nums">{peerProgress}/3 Tests Passed</span>
              <span className="text-slate-400 font-normal">· Typing...</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-base font-bold text-slate-900 dark:text-white tabular-nums">
            <Timer className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {/* Problem Selector Dropdown */}
          <select
            value={selectedProblemIndex}
            onChange={(e) => setSelectedProblemIndex(Number(e.target.value))}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            {PEER_PROBLEMS.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Duel Victory Banner */}
      {duelFinished && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                Match Won! All 3 Test Cases Passed
              </div>
              <div className="text-xs text-emerald-800/90 dark:text-emerald-400 mt-0.5">
                Solved in {formatTimer(elapsedSeconds)}. +26 MMR Rating gained. Marcus solved 2/3 cases.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setDuelFinished(false);
              setElapsedSeconds(0);
              setDuelActive(true);
              setTestResults(null);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Queue Next Duel
          </button>
        </div>
      )}

      {/* Main Split-Screen Workspace: Problem Description + Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Problem Description & Test Case Samples */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8C1D40] dark:text-[#FFC627]">
                {problem.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                Acceptance: {problem.acceptanceRate}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {problem.title}
            </h2>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {problem.description}
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-900 dark:text-white">Sample Examples</div>
            {problem.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs font-mono space-y-1"
              >
                <div className="text-slate-500 dark:text-slate-400">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">Input:</span> {ex.input}
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Output:</span> {ex.output}
                </div>
                {ex.explanation && (
                  <div className="text-[11px] text-slate-500 font-sans mt-1">
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Interactive Code Editor & Test Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#FFC627]" />
                <span className="text-xs font-semibold text-slate-200 font-mono">solution.{language === 'javascript' ? 'js' : 'py'}</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-slate-800 text-slate-200 text-xs font-mono px-2 py-1 rounded border border-slate-700 focus:outline-none"
                >
                  <option value="javascript">JavaScript (ES6)</option>
                  <option value="python">Python 3.11</option>
                </select>

                <button
                  type="button"
                  onClick={() => setCode(problem.starterCode[language])}
                  className="p-1 text-slate-400 hover:text-white text-xs"
                  title="Reset starter template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="p-4 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={13}
                spellCheck={false}
                className="w-full bg-transparent font-mono text-xs text-slate-100 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Editor Action Buttons */}
            <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Memory limit: 256MB · CPU: 1.0s
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isRunning}
                  onClick={handleRunTests}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Run Tests</span>
                </button>

                <button
                  type="button"
                  disabled={isRunning}
                  onClick={handleRunTests}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFC627]" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Case Execution Results Console */}
          {testResults && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span>Test Runner Console</span>
                </div>
                <div className="font-mono text-slate-500">
                  {testResults.filter((r) => r.passed).length} of {testResults.length} passed
                </div>
              </div>

              <div className="space-y-2">
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                      tr.passed
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tr.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>Case {idx + 1}: {tr.input}</span>
                    </div>

                    <div className="flex items-center gap-3 tabular-nums">
                      <span className="text-[11px] text-slate-500">{tr.timeMs}ms</span>
                      <span className="font-semibold">{tr.passed ? 'PASSED' : 'FAILED'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
