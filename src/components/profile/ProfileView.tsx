import React, { useState } from 'react';
import { RegisteredUser, TestAttemptRecord, NavigationTab } from '../../types';
import {
  User,
  Search,
  FileSpreadsheet,
  Settings as SettingsIcon,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Download,
  Filter,
  Eye,
  Sliders,
  ShieldCheck,
  Building2,
  ArrowLeft,
} from 'lucide-react';

interface ProfileViewProps {
  user: RegisteredUser;
  pastRecords: TestAttemptRecord[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectPastRecordForReview?: (record: TestAttemptRecord) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  pastRecords,
  onNavigate,
  onSelectPastRecordForReview,
}) => {
  const [activeSideTab, setActiveSideTab] = useState<'profile' | 'records' | 'settings'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [recordFilterDifficulty, setRecordFilterDifficulty] = useState<string>('All');
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<TestAttemptRecord | null>(null);

  // Settings local state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [timerSound, setTimerSound] = useState(false);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(true);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Filter records based on search and difficulty
  const filteredRecords = pastRecords.filter((rec) => {
    const matchesSearch =
      rec.setTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.date.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      recordFilterDifficulty === 'All' || rec.difficulty === recordFilterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = ['Record ID', 'Test Set', 'Difficulty', 'Date', 'Questions', 'Correct', 'Score (%)', 'Time (s)'];
    const rows = pastRecords.map((r) => [
      r.id,
      `"${r.setTitle}"`,
      r.difficulty,
      r.date,
      r.totalQuestions,
      r.correctCount,
      r.scorePercent,
      r.timeSpentSeconds,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${user.name.replace(/\s+/g, '_')}_placement_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Top Corner Back Button */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
          title="Return to Home Dashboard"
        >
          <ArrowLeft className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          <span>Student Profile &amp; Records</span>
        </div>
      </div>

      {/* Top Header & Universal Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">placeprep</span>
            <span aria-hidden="true">·</span>
            <span>Student Management & Records System</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Student Profile & Academic Records
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search profile, tests, topics..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
          />
        </div>
      </div>

      {/* Main Sideways Layout: Left Sidebar + Right Content Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sideways Navigation Menu (3 cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs space-y-1">
          <button
            type="button"
            onClick={() => {
              setActiveSideTab('profile');
              setSelectedRecordDetail(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSideTab === 'profile'
                ? 'bg-[#8C1D40] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="truncate">Profile View</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSideTab('records');
              setSelectedRecordDetail(null);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSideTab === 'records'
                ? 'bg-[#8C1D40] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 truncate">
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span className="truncate">Past Records Sheet</span>
            </div>
            <span
              className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                activeSideTab === 'records' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              {pastRecords.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSideTab('settings');
              setSelectedRecordDetail(null);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeSideTab === 'settings'
                ? 'bg-[#8C1D40] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SettingsIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">Settings & Preferences</span>
          </button>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 px-3">
            <div className="text-[11px] text-slate-400">Quick Navigation</div>
            <button
              type="button"
              onClick={() => onNavigate('aptitude')}
              className="mt-2 text-xs text-[#8C1D40] dark:text-[#FFC627] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Go to Aptitude Sets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Content Viewport (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: Profile View */}
          {activeSideTab === 'profile' && (
            <div className="space-y-6">
              {/* Identity Overview Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-xs"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-[#8C1D40] text-white text-3xl font-extrabold flex items-center justify-center shadow-xs">
                        {user.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[10px] font-semibold">
                          Active Student
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Student ID: {user.asuId}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                        {user.college}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-xs text-slate-400">Current Semester</span>
                    <span className="text-base font-bold text-[#8C1D40] dark:text-[#FFC627] font-mono mt-0.5">
                      {user.semester}
                    </span>
                    <span className="text-xs text-slate-500 font-mono mt-1">
                      GPA: {user.gpa} / 4.00
                    </span>
                  </div>
                </div>

                {/* Academic & Placement Metadata Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Registered Email</span>
                    </div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {user.email}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone Number</span>
                    </div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {user.phone}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Degree Program</span>
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {user.degree}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>Target Role</span>
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {user.targetRole}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Dream Companies</span>
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {user.targetCompany}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Placement Target</span>
                    </div>
                    <div className="font-semibold text-[#8C1D40] dark:text-[#FFC627]">
                      {user.placementCycle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Placement Track Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Academic Placement Preparedness Status</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                    You have completed {pastRecords.length} diagnostic test sheets. Your highest score is{' '}
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {Math.max(...pastRecords.map((r) => r.scorePercent), 0)}%
                    </strong>
                    . Keep completing adaptive sets to raise your campus placement index.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSideTab('records')}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-[#8C1D40] hover:bg-[#721532] transition-colors whitespace-nowrap shrink-0 shadow-xs"
                >
                  View Historical Sheet
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Past Records Sheet */}
          {activeSideTab === 'records' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                    <span>Placement Test Past Records Sheet</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official record of all completed aptitude sets, scores, duration, and topic mastery.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('aptitude')}
                    className="px-3 py-1.5 rounded-lg bg-[#8C1D40] text-white text-xs font-semibold hover:bg-[#721532] transition-colors"
                  >
                    Take New Set
                  </button>
                </div>
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500">Filter Difficulty:</span>
                  {['All', 'Easy', 'Moderate', 'Hard', 'Mixed'].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setRecordFilterDifficulty(diff)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        recordFilterDifficulty === diff
                          ? 'bg-[#8C1D40] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                <span className="text-slate-400 font-mono tabular-nums">
                  Showing {filteredRecords.length} of {pastRecords.length} Records
                </span>
              </div>

              {/* Table / Ledger Sheet */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium select-none">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Test Set</th>
                      <th className="py-3 px-3 font-semibold">Difficulty</th>
                      <th className="py-3 px-3 font-semibold">Date</th>
                      <th className="py-3 px-3 font-semibold text-right">Score</th>
                      <th className="py-3 px-3 font-semibold text-right">Accuracy</th>
                      <th className="py-3 px-3 font-semibold text-right">Duration</th>
                      <th className="py-3 px-4 text-center font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                    {filteredRecords.map((rec) => (
                      <tr
                        key={rec.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 font-sans font-semibold text-slate-900 dark:text-white">
                          {rec.setTitle}
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              rec.difficulty === 'Easy'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                : rec.difficulty === 'Moderate'
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                                : rec.difficulty === 'Hard'
                                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                            }`}
                          >
                            {rec.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 tabular-nums">
                          {rec.date}
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums">
                          <span
                            className={`font-bold ${
                              rec.scorePercent >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : rec.scorePercent >= 60
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-rose-600'
                            }`}
                          >
                            {rec.scorePercent}%
                          </span>
                          <span className="text-[10px] text-slate-400 ml-1">
                            ({rec.correctCount}/{rec.totalQuestions})
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                          {rec.accuracyPercent}%
                        </td>
                        <td className="py-3 px-3 text-right tabular-nums text-slate-500">
                          {Math.floor(rec.timeSpentSeconds / 60)}m {rec.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedRecordDetail(rec)}
                            className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-[#8C1D40] dark:text-[#FFC627] hover:underline"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Analyze</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 font-sans">
                          No matching records found. Complete an aptitude set to record your performance.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Detail Inspection Modal / Drawer if user clicked Analyze */}
              {selectedRecordDetail && (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Record Diagnostic: {selectedRecordDetail.setTitle}
                      </h4>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Attempted on {selectedRecordDetail.date} · {selectedRecordDetail.totalQuestions} Questions
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedRecordDetail(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                    >
                      Close
                    </button>
                  </div>

                  {/* Topic breakdown list */}
                  <div className="space-y-2 text-xs">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">
                      Topic-Wise Breakdown:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedRecordDetail.topicBreakdown.map((t) => (
                        <div
                          key={t.topic}
                          className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                            {t.topic}
                          </span>
                          <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                            {t.correct} / {t.total} ({Math.round((t.correct / t.total) * 100)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Settings & Preferences */}
          {activeSideTab === 'settings' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                  <span>Student Account Preferences & Test Settings</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure aptitude practice behavior, notification triggers, and security.
                </p>
              </div>

              {savedSettingsNotice && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Preferences saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
                {/* Section 1: Practice Engine */}
                <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    Adaptive Test Behavior
                  </div>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        Automatic Difficulty Adaptation
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Promote questions to higher tiers when maintaining correct answer streaks.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={adaptiveDifficulty}
                      onChange={(e) => setAdaptiveDifficulty(e.target.checked)}
                      className="w-4 h-4 accent-[#8C1D40]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        Timer Warning Chimes
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Play subtle audio notification at 5 minutes and 1 minute remaining.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={timerSound}
                      onChange={(e) => setTimerSound(e.target.checked)}
                      className="w-4 h-4 accent-[#8C1D40]"
                    />
                  </label>
                </div>

                {/* Section 2: Notifications */}
                <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    Campus Placement Alerts
                  </div>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        Email Weekly Progress Summary
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Receive automated diagnosis comparing this week's tests against previous scores.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 accent-[#8C1D40]"
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#8C1D40] hover:bg-[#721532] text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
