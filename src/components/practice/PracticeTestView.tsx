import React, { useState, useEffect, useMemo } from 'react';
import { APTITUDE_SETS } from '../../data/aptitudeSetsData';
import { AptitudeSet, AptitudeQuestion, TestAttemptRecord, SetDifficultyLevel } from '../../types';
import {
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  Edit3,
  Search,
  Filter,
  Check,
  Flag,
  ArrowLeft,
  Clock,
  Sparkles,
  BarChart2,
  Award,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface PracticeTestViewProps {
  initialCategory?: 'Aptitude' | 'Coding' | 'Communication' | 'Technical';
  pastRecords: TestAttemptRecord[];
  onSaveTestAttempt: (record: TestAttemptRecord) => void;
  onBackToDashboard?: () => void;
}

export const PracticeTestView: React.FC<PracticeTestViewProps> = ({
  initialCategory,
  pastRecords,
  onSaveTestAttempt,
  onBackToDashboard,
}) => {
  // Navigation inside Aptitude practice: 'select_set' | 'test_active' | 'analysis_report'
  const [viewState, setViewState] = useState<'select_set' | 'test_active' | 'analysis_report'>('select_set');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Test Session State
  const [activeSet, setActiveSet] = useState<AptitudeSet>(APTITUDE_SETS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(activeSet.timeMinutes * 60);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Analysis & Review State
  const [completedRecord, setCompletedRecord] = useState<TestAttemptRecord | null>(null);
  const [comparisonRecord, setComparisonRecord] = useState<TestAttemptRecord | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'marked'>('all');

  // Filter available sets
  const filteredSets = useMemo(() => {
    return APTITUDE_SETS.filter((set) => {
      const matchesDifficulty = selectedDifficulty === 'All' || set.difficulty === selectedDifficulty;
      const matchesSearch =
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.companyTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDifficulty && matchesSearch;
    });
  }, [selectedDifficulty, searchQuery]);

  // Active question accessor
  const currentQuestion: AptitudeQuestion | undefined = activeSet.questions[currentQuestionIndex];

  // Timer interval effect
  useEffect(() => {
    if (!timerActive || viewState !== 'test_active' || timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, viewState, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Launch a test set
  const handleStartSet = (set: AptitudeSet) => {
    setActiveSet(set);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeRemaining(set.timeMinutes * 60);
    setTimeElapsed(0);
    setTimerActive(true);
    setScratchpadText('');
    setViewState('test_active');
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionIndex];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex],
    }));
  };

  const handleAutoSubmit = () => {
    finalizeSubmission();
  };

  const finalizeSubmission = () => {
    setTimerActive(false);
    setShowSubmitModal(false);

    // Calculate score & topic breakdown
    let correctCount = 0;
    const topicStats: Record<string, { correct: number; total: number }> = {};

    activeSet.questions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      const isCorrect = userAns !== undefined && userAns === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0 };
      }
      topicStats[q.topic].total++;
      if (isCorrect) topicStats[q.topic].correct++;
    });

    const totalQ = activeSet.questions.length;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const avgSec = Math.round(timeElapsed / (totalQ || 1));

    const breakdown = Object.entries(topicStats).map(([topic, stats]) => ({
      topic,
      correct: stats.correct,
      total: stats.total,
    }));

    const newRecord: TestAttemptRecord = {
      id: `attempt-${Date.now()}`,
      setId: activeSet.id,
      setTitle: `Set ${activeSet.setNumber}: ${activeSet.title}`,
      difficulty: activeSet.difficulty,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      timestamp: Date.now(),
      totalQuestions: totalQ,
      correctCount,
      scorePercent: scorePct,
      timeSpentSeconds: timeElapsed,
      avgTimePerQuestionSeconds: avgSec,
      accuracyPercent: scorePct,
      topicBreakdown: breakdown,
      userAnswers: { ...userAnswers },
    };

    // Find previous attempt on this same set or most recent prior test for comparison
    const previousAttemptOnSet = pastRecords.find(
      (r) => r.setId === activeSet.id || r.setTitle.includes(`Set ${activeSet.setNumber}`)
    );
    const lastPriorAttempt = previousAttemptOnSet || (pastRecords.length > 0 ? pastRecords[0] : null);

    setComparisonRecord(lastPriorAttempt);
    setCompletedRecord(newRecord);

    // Save to global history
    onSaveTestAttempt(newRecord);
    setViewState('analysis_report');
  };

  // State 1: Aptitude Sets Selection Screen
  if (viewState === 'select_set') {
    return (
      <div className="space-y-4">
        {/* Top Corner Back Button */}
        {onBackToDashboard && (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
              title="Return to Home Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              <span>Aptitude Practice</span>
            </div>
          </div>
        )}

        {/* Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold text-slate-900 dark:text-white">
                Aptitude Practice Engine
              </span>
              <span aria-hidden="true">·</span>
              <span>20–25 Questions Per Set</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Campus Placement Practice Sets
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Systematically arranged in Easy, Moderate, Hard, and Mixed difficulty levels with instant deep analysis and past comparison reporting.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-400">Total Sets Available</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                {APTITUDE_SETS.length} Sets
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-400">Historical Attempts</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
                {pastRecords.length} Finished
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Difficulty Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Easy', 'Moderate', 'Hard', 'Mixed'].map((level) => {
              const isActive = selectedDifficulty === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#8C1D40] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {level === 'All' ? 'All Sets' : `${level} Level`}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search set title, company, or topic..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#8C1D40]"
            />
          </div>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSets.map((set) => {
            const hasAttempts = pastRecords.some(
              (r) => r.setId === set.id || r.setTitle.includes(`Set ${set.setNumber}`)
            );
            const pastAttemptForSet = pastRecords.find(
              (r) => r.setId === set.id || r.setTitle.includes(`Set ${set.setNumber}`)
            );

            return (
              <div
                key={set.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
              >
                <div>
                  {/* Top line badges */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Set #{set.setNumber}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        set.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : set.difficulty === 'Moderate'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                          : set.difficulty === 'Hard'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {set.difficulty} Level
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#8C1D40] dark:group-hover:text-[#FFC627] transition-colors">
                    {set.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {set.description}
                  </p>

                  {/* Metadata pill-less row */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{set.questionCount} Questions</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{set.timeMinutes} Mins</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{hasAttempts ? `Best: ${pastAttemptForSet?.scorePercent || set.bestScore}%` : 'Unattempted'}</span>
                  </div>

                  {/* Company tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 mr-1">Frequent in:</span>
                    {set.companyTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {hasAttempts ? 'Past attempts recorded' : 'Ready to start'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStartSet(set)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-xl shadow-xs transition-colors"
                  >
                    <span>{hasAttempts ? 'Retake Set' : 'Start Test Set'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // State 2: Active Test Session
  if (viewState === 'test_active' && currentQuestion) {
    const answeredCount = Object.keys(userAnswers).length;
    const isSelected = userAnswers[currentQuestionIndex] !== undefined;
    const isMarked = markedForReview[currentQuestionIndex];

    return (
      <div className="space-y-6 select-none">
        {/* Test Session Top Control Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to pause/exit this test session? Your responses will not be saved until submitted.')) {
                  setViewState('select_set');
                  setTimerActive(false);
                }
              }}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="text-xs text-slate-400 font-mono">
                Set #{activeSet.setNumber} · {activeSet.difficulty} Level
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {activeSet.title}
              </h2>
            </div>
          </div>

          {/* Center Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold tabular-nums border ${
              timeRemaining < 300
                ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
                : 'bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100'
            }`}
          >
            <Timer className="w-4 h-4 text-slate-500" />
            <span>Time Left: {formatTime(timeRemaining)}</span>
          </div>

          {/* Right Action: Scratchpad & Finish */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setScratchpadOpen(!scratchpadOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                scratchpadOpen
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-900 dark:text-white'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Scratchpad</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-lg shadow-xs transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Grid: Question Workspace + Question Palette Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Viewer (8 or 9 cols) */}
          <div className={`${scratchpadOpen ? 'lg:col-span-8' : 'lg:col-span-8'} space-y-4`}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums text-sm">
                    Question {currentQuestionIndex + 1} of {activeSet.questions.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {currentQuestion.topic}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>{currentQuestion.subtopic}</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      currentQuestion.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : currentQuestion.difficulty === 'Moderate'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  {currentQuestion.companyTag && (
                    <span className="text-slate-400">[{currentQuestion.companyTag}]</span>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="py-2">
                <p className="text-base text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isChecked = userAnswers[currentQuestionIndex] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-[#8C1D40] bg-[#8C1D40]/5 dark:bg-[#8C1D40]/15 text-slate-900 dark:text-white font-semibold ring-1 ring-[#8C1D40]'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            isChecked
                              ? 'bg-[#8C1D40] text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isChecked && <CheckCircle2 className="w-5 h-5 text-[#8C1D40] dark:text-[#FFC627] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Question Footer Controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMarkReview}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                      isMarked
                        ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>

                  {isSelected && (
                    <button
                      type="button"
                      onClick={handleClearResponse}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Clear Response
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentQuestionIndex < activeSet.questions.length - 1) {
                        setCurrentQuestionIndex((prev) => prev + 1);
                      } else {
                        setShowSubmitModal(true);
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs"
                  >
                    {currentQuestionIndex < activeSet.questions.length - 1 ? 'Next' : 'Review & Submit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Scratchpad drawer */}
            {scratchpadOpen && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Rough Math & Formulas Scratchpad</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setScratchpadText('')}
                    className="text-[11px] text-slate-400 hover:text-slate-600"
                  >
                    Clear Notes
                  </button>
                </div>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Work out equations, scratch variable values or track fractions..."
                  rows={4}
                  className="w-full mt-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Right Question Palette (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Question Palette
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-3 h-3 rounded-xs bg-emerald-600" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-3 h-3 rounded-xs bg-slate-200 dark:bg-slate-700" />
                  <span>Unanswered ({activeSet.questions.length - answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="w-3 h-3 rounded-xs bg-amber-500" />
                  <span>Marked Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                </div>
              </div>
            </div>

            {/* 1 to 20 Grid */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-5 gap-2">
              {activeSet.questions.map((_, qIdx) => {
                const isCurrent = currentQuestionIndex === qIdx;
                const isAns = userAnswers[qIdx] !== undefined;
                const isRev = markedForReview[qIdx];

                let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                if (isAns) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                }
                if (isRev) {
                  btnClass = 'bg-amber-500 text-white border-amber-600 font-bold';
                }
                if (isCurrent) {
                  btnClass += ' ring-2 ring-[#8C1D40] ring-offset-1 dark:ring-offset-slate-900';
                }

                return (
                  <button
                    key={qIdx}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(qIdx)}
                    className={`h-9 rounded-lg border text-xs font-mono font-semibold transition-transform hover:scale-105 ${btnClass}`}
                  >
                    {qIdx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 rounded-xl bg-[#8C1D40] hover:bg-[#721532] text-white text-xs font-bold transition-colors shadow-xs"
              >
                Submit & Generate Deep Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Test for Deep Analysis?
              </h3>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Answered Questions:</span>
                  <span className="font-bold text-emerald-600">{answeredCount} of {activeSet.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Unanswered Questions:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeSet.questions.length - answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Marked for Review:</span>
                  <span className="font-bold text-amber-600">{Object.values(markedForReview).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Time Elapsed:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formatTime(timeElapsed)}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Return to Test
                </button>
                <button
                  type="button"
                  onClick={finalizeSubmission}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-xl transition-colors shadow-xs"
                >
                  Yes, Submit & View Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // State 3: Deep Analysis & Past Comparison System
  if (viewState === 'analysis_report' && completedRecord) {
    const scoreDelta = comparisonRecord
      ? completedRecord.scorePercent - comparisonRecord.scorePercent
      : null;
    const speedDelta = comparisonRecord
      ? comparisonRecord.avgTimePerQuestionSeconds - completedRecord.avgTimePerQuestionSeconds
      : null;

    const filteredQuestions = activeSet.questions.filter((q, idx) => {
      const userAns = completedRecord.userAnswers[idx];
      const isCorrect = userAns === q.correctIndex;
      if (reviewFilter === 'incorrect') return !isCorrect;
      if (reviewFilter === 'marked') return markedForReview[idx];
      return true;
    });

    return (
      <div className="space-y-6">
        {/* Report Top Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-900 dark:text-white">placeprep Diagnostic Report</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{completedRecord.date}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Performance & Past Comparison Analysis
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {completedRecord.setTitle} ({completedRecord.difficulty} Level)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleStartSet(activeSet)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Set</span>
            </button>

            <button
              type="button"
              onClick={() => setViewState('select_set')}
              className="px-4 py-2 text-xs font-bold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-xl transition-colors shadow-xs"
            >
              Back to Sets
            </button>
          </div>
        </div>

        {/* PAST VS PRESENT COMPARISON SYSTEM (User's Core Requirement) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FFC627]" />
              <h2 className="text-base font-bold text-white">
                Past vs. Present Test Comparison Matrix
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Compared with: {comparisonRecord ? comparisonRecord.date : 'Baseline'}
            </div>
          </div>

          {comparisonRecord ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Metric 1: Score Delta */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-[11px] text-slate-400 font-medium">Score Progression</div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-extrabold text-white tabular-nums">
                    {completedRecord.scorePercent}%
                  </span>
                  <span className="text-xs text-slate-400">
                    (was {comparisonRecord.scorePercent}%)
                  </span>
                </div>
                <div
                  className={`text-xs font-bold font-mono ${
                    (scoreDelta || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {(scoreDelta || 0) >= 0 ? `▲ +${scoreDelta}% Improvement` : `▼ ${scoreDelta}% Decline`}
                </div>
              </div>

              {/* Metric 2: Speed / Pace Delta */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-[11px] text-slate-400 font-medium">Pacing Efficiency</div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-extrabold text-white tabular-nums">
                    {completedRecord.avgTimePerQuestionSeconds}s
                  </span>
                  <span className="text-xs text-slate-400">
                    (was {comparisonRecord.avgTimePerQuestionSeconds}s)
                  </span>
                </div>
                <div
                  className={`text-xs font-bold font-mono ${
                    (speedDelta || 0) >= 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {(speedDelta || 0) >= 0 ? `▲ ${speedDelta}s faster / item` : `▼ ${Math.abs(speedDelta || 0)}s slower`}
                </div>
              </div>

              {/* Metric 3: Accuracy Delta */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="text-[11px] text-slate-400 font-medium">Total Correct Answers</div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-extrabold text-white tabular-nums">
                    {completedRecord.correctCount} / {completedRecord.totalQuestions}
                  </span>
                  <span className="text-xs text-slate-400">
                    (past: {comparisonRecord.correctCount})
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#FFC627]">
                  {completedRecord.correctCount >= comparisonRecord.correctCount
                    ? 'Growth in conceptual retention'
                    : 'Review incorrect items below'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 p-2">
              This is your first recorded attempt on this set. Future attempts will compare your accuracy, pacing, and topic retention against this score.
            </div>
          )}
        </div>

        {/* Topic-Wise Deep Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                <span>Topic Mastery Diagnostic Breakdown</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pinpoints exact mathematical concepts where you succeeded versus where remediation is required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedRecord.topicBreakdown.map((t) => {
              const pct = Math.round((t.correct / t.total) * 100);
              const isStrong = pct >= 75;
              return (
                <div
                  key={t.topic}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{t.topic}</span>
                    <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white">
                      {t.correct}/{t.total} ({pct}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isStrong ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question-by-Question Deep Analysis Review */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Step-by-Step Question Derivation & Solutions</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review mathematical proofs, formula shortcuts, and error diagnoses.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All ({activeSet.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  reviewFilter === 'incorrect'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Incorrect ({activeSet.questions.length - completedRecord.correctCount})
              </button>
            </div>
          </div>

          {/* List of Questions with Detailed Derivations */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const originalIndex = activeSet.questions.findIndex((item) => item.id === q.id);
              const userAns = completedRecord.userAnswers[originalIndex];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border text-xs space-y-3 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-rose-200 dark:border-rose-800/40 bg-rose-50/20 dark:bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-slate-900 dark:text-white">
                        Question #{originalIndex + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500">{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-600 font-bold">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isUserChoice = userAns === optIdx;

                      let optBoxStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                      if (isOptionCorrect) {
                        optBoxStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isUserChoice && !isOptionCorrect) {
                        optBoxStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${optBoxStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isOptionCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          {isUserChoice && !isOptionCorrect && <span className="text-[10px] text-rose-600 font-semibold font-mono">Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-step Mathematical Derivation */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 mt-2">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#FFC627]" />
                      <span>Mathematical Derivation & Concept:</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {q.explanation}
                    </p>
                    {q.formulaOrConcept && (
                      <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500">
                        <strong className="text-slate-700 dark:text-slate-300">Key Formula: </strong>
                        {q.formulaOrConcept}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
