import React, { useState } from 'react';
import { INITIAL_RESUME_TEXT } from '../../data/mockData';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
  Target,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface Props {
  onBackToDashboard?: () => void;
}

export const ResumeFeedbackView: React.FC<Props> = ({ onBackToDashboard }) => {
  const [resumeText, setResumeText] = useState(INITIAL_RESUME_TEXT);
  const [targetRole, setTargetRole] = useState('Amazon SDE Intern');
  const [copied, setCopied] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  const roles = [
    { id: 'Amazon SDE Intern', requiredKeywords: ['Data Structures', 'Java', 'Algorithms', 'AWS', 'Unit Testing', 'CI/CD'] },
    { id: 'Google STEP Intern', requiredKeywords: ['C++', 'Python', 'Algorithms', 'Git', 'Clean Code', 'Collaboration'] },
    { id: 'Intel Firmware Intern', requiredKeywords: ['C', 'C++', 'Pointers', 'Linux', 'Memory Management', 'Debugging'] },
    { id: 'Full-Stack Web Intern', requiredKeywords: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'SQL', 'Responsive Design'] },
  ];

  const currentRoleConfig = roles.find((r) => r.id === targetRole) || roles[0];

  // Scan keywords presence in resume text
  const keywordStatus = currentRoleConfig.requiredKeywords.map((kw) => {
    const present = resumeText.toLowerCase().includes(kw.toLowerCase());
    return { keyword: kw, present };
  });

  const presentCount = keywordStatus.filter((k) => k.present).length;
  const keywordMatchPercent = Math.round((presentCount / currentRoleConfig.requiredKeywords.length) * 100);

  // ATS Overall Score
  const atsScore = enhanced ? 94 : Math.min(88, Math.max(68, Math.round(keywordMatchPercent * 0.4 + 48)));

  const handleApplyEnhancements = () => {
    // Enhance resume by infusing missing keywords and STAR metrics
    let updated = resumeText;
    if (!updated.includes('CI/CD')) {
      updated = updated.replace(
        'Developer Tools: Git, GitHub, Docker, Postman, Linux/Unix CLI, VS Code',
        'Developer Tools: Git, GitHub, Docker, CI/CD Pipelines, Postman, Linux/Unix CLI, JUnit, AWS'
      );
    }
    if (!updated.includes('99.9% uptime')) {
      updated = updated.replace(
        '• Built a responsive web app used by over 350 ASU freshmen to track campus shuttles in real-time.',
        '• Architected a responsive web app utilized by 500+ ASU engineering students, maintaining 99.9% uptime across semester peak registration.'
      );
    }
    setResumeText(updated);
    setEnhanced(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span>Resume Analyzer</span>
          </div>
        </div>
      )}

      {/* Target Role & ATS Summary Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">
              AI ATS Scanner & Feedback
            </span>
            <span aria-hidden="true">·</span>
            <span>ASU Fulton Career Center Standards</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Resume Optimization for {targetRole}
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-xs text-slate-500 mr-1">Target Profile:</span>
            {roles.map((r) => {
              const isActive = targetRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setTargetRole(r.id);
                    setEnhanced(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#8C1D40] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* ATS Score Dial */}
        <div className="flex items-center gap-5 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">ATS Match Readiness</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                {atsScore}/100
              </span>
              <span
                className={`text-xs font-semibold ${
                  atsScore >= 90
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {atsScore >= 90 ? 'High Match' : 'Good Base'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
              {presentCount} of {currentRoleConfig.requiredKeywords.length} keywords indexed
            </div>
          </div>

          <button
            type="button"
            onClick={handleApplyEnhancements}
            disabled={enhanced}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-[#8C1D40] hover:bg-[#721532] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC627]" />
            <span>{enhanced ? 'Enhanced Applied' : 'Auto-Optimize'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Resume Editor + AI Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Resume Text Document */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>ASU Engineering Resume Document</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={18}
              className="w-full mt-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#8C1D40] leading-relaxed resize-none"
            />
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Directly editable · Clean Markdown & plain-text friendly</span>
            <span className="font-mono tabular-nums">{resumeText.length} characters</span>
          </div>
        </div>

        {/* Right 5 Cols: AI ATS Diagnostic Feedback & Keyword Scan */}
        <div className="lg:col-span-5 space-y-4">
          {/* Keyword Matching Scanner */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Role Keyword Radar</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {keywordMatchPercent}% Match
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Corporate ATS filters scan for exact terms before human recruiters review your file.
            </p>

            <div className="space-y-1.5 pt-1">
              {keywordStatus.map((kw) => (
                <div
                  key={kw.keyword}
                  className="flex items-center justify-between p-2 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {kw.keyword}
                  </span>
                  {kw.present ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Found</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-rose-500 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Missing</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Verb & Impact Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
              <span>Quantifiable Impact Checklist</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                  Strong Metric: "reduced server API calls by 74%"
                </div>
                <div className="text-[11px] text-emerald-800/90 dark:text-emerald-400 mt-0.5">
                  Clear engineering outcome that substantiates optimization skills.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                <div className="font-semibold text-amber-900 dark:text-amber-300">
                  Needs Quantitative Metric: "Trading Backtester"
                </div>
                <div className="text-[11px] text-amber-800/90 dark:text-amber-400 mt-0.5">
                  State how many trades or execution speed (e.g. "analyzed 10,000+ data points in under 300ms").
                </div>
              </div>
            </div>

            {!enhanced && (
              <button
                type="button"
                onClick={handleApplyEnhancements}
                className="w-full flex items-center justify-center gap-2 mt-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span>Apply Recommended Bullet Points</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
