import React from 'react';
import campusImage from '../../assets/images/asu_campus_innovation_1793904634316.jpg';
import {
  Brain,
  Code2,
  FileText,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface WelcomeViewProps {
  onEnter: () => void;
  onRegister: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onEnter, onRegister }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar for Welcome page */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8C1D40] text-white font-extrabold flex items-center justify-center text-sm shadow-xs tracking-tight">
              PP
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white lowercase">
              placeprep
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onEnter}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-lg shadow-xs transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8C1D40]/10 text-[#8C1D40] dark:text-[#FFC627] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Placement Preparation & Mock Interview System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Master your campus placements with{' '}
              <span className="text-[#8C1D40] dark:text-[#FFC627] lowercase">placeprep</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              An intelligent, adaptive platform built for university students starting from semester 1. Regular practice in aptitude, coding, communication, and technical mock interviews to achieve your dream company offer.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onEnter}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-[#8C1D40] hover:bg-[#721532] rounded-xl shadow-md transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#8C1D40] focus:ring-offset-2"
              >
                <span>Enter placeprep</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRegister}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
              >
                <span>Create New Student Account</span>
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ASU Curriculum Aligned</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                <span>Real-Time Progress Analytics</span>
              </div>
            </div>
          </div>

          {/* Right Image & Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
              <img
                src={campusImage}
                alt="University Innovation Center"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />

              <div className="p-5 space-y-3.5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  4 Core Preparation Pillars
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                    <Brain className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Aptitude Practice</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Quant, logical & reasoning drills</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                    <Code2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Coding Practice</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">DSA, code runner & tests</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Resume Analyzer</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">ATS score & bullet feedback</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Mock Interview</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">AI interviewer with voice & STAR</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-5 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-semibold text-slate-900 dark:text-white lowercase">
            placeprep © 2026
          </div>
          <div>Empowering 1st semester to final year student placement readiness</div>
        </div>
      </footer>
    </div>
  );
};
