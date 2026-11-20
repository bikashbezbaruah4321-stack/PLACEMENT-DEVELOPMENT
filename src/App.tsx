import React, { useState, useEffect } from 'react';
import { NavigationTab, AuthScreen, RegisteredUser, TestAttemptRecord, CompletedInterviewReport } from './types';
import { CURRENT_STUDENT } from './data/mockData';
import { INITIAL_PAST_RECORDS } from './data/aptitudeSetsData';
import { WelcomeView } from './components/auth/WelcomeView';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { Navbar } from './components/layout/Navbar';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { PracticeTestView } from './components/practice/PracticeTestView';
import { MockInterviewView } from './components/interview/MockInterviewView';
import { ResumeFeedbackView } from './components/resume/ResumeFeedbackView';
import { PeerCodingArena } from './components/peer/PeerCodingArena';
import { LeetCodeProblemsView } from './components/coding/LeetCodeProblemsView';
import { ProfileView } from './components/profile/ProfileView';

export default function App() {
  // Navigation & Auth State
  const [authScreen, setAuthScreen] = useState<AuthScreen>('welcome');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([CURRENT_STUDENT]);
  const [currentUser, setCurrentUser] = useState<RegisteredUser>(CURRENT_STUDENT);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Past test attempt records state for comparison and profile ledger sheet
  const [pastRecords, setPastRecords] = useState<TestAttemptRecord[]>(INITIAL_PAST_RECORDS);

  // Completed mock interview performance report state
  const [interviewReport, setInterviewReport] = useState<CompletedInterviewReport | null>(null);

  // Sync dark theme to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Auth Handlers
  const handleRegisterSuccess = (newUser: RegisteredUser) => {
    setRegisteredUsers((prev) => [newUser, ...prev]);
    setPrefilledEmail(newUser.email);
    setRegistrationMessage(
      `Welcome ${newUser.name}! Your placeprep account has been successfully registered. Please enter your password to sign in.`
    );
    // As requested: "after that popup to the login page"
    setAuthScreen('login');
  };

  const handleLoginSuccess = (user: RegisteredUser) => {
    setCurrentUser(user);
    setRegistrationMessage(null);
    setAuthScreen('authenticated');
    setCurrentTab('dashboard');
  };

  const handleSignOut = () => {
    setAuthScreen('welcome');
    setCurrentTab('dashboard');
    setRegistrationMessage(null);
  };

  // Save completed aptitude test attempt into historical ledger
  const handleSaveTestAttempt = (newRecord: TestAttemptRecord) => {
    setPastRecords((prev) => [newRecord, ...prev]);
  };

  // If in Welcome Page
  if (authScreen === 'welcome') {
    return (
      <WelcomeView
        onEnter={() => setAuthScreen('login')}
        onRegister={() => setAuthScreen('register')}
      />
    );
  }

  // If in Login Page
  if (authScreen === 'login') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onGoToRegister={() => {
          setRegistrationMessage(null);
          setAuthScreen('register');
        }}
        onGoToWelcome={() => setAuthScreen('welcome')}
        registeredUsers={registeredUsers}
        prefilledEmail={prefilledEmail}
        registrationSuccessMessage={registrationMessage}
      />
    );
  }

  // If in Registration Page
  if (authScreen === 'register') {
    return (
      <RegisterView
        onRegisterSuccess={handleRegisterSuccess}
        onGoToLogin={() => {
          setRegistrationMessage(null);
          setAuthScreen('login');
        }}
        onGoToWelcome={() => setAuthScreen('welcome')}
      />
    );
  }

  // Authenticated Student App
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        user={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Dashboard showing student profile and progress analytics */}
        {currentTab === 'dashboard' && (
          <StudentDashboard
            user={currentUser}
            onNavigate={(tab) => setCurrentTab(tab)}
            interviewReport={interviewReport}
            onStartPillarPractice={(category) => {
              if (category === 'Coding') setCurrentTab('coding');
              else if (category === 'Communication') setCurrentTab('interview');
              else setCurrentTab('aptitude');
            }}
          />
        )}

        {/* 1. Aptitude Practice with Easy, Moderate, Hard, Mixed Sets + Past Comparison */}
        {currentTab === 'aptitude' && (
          <PracticeTestView
            initialCategory="Aptitude"
            pastRecords={pastRecords}
            onSaveTestAttempt={handleSaveTestAttempt}
            onBackToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {/* 2. Coding Practice (LeetCode Problem Engine & Split IDE) */}
        {currentTab === 'coding' && (
          <LeetCodeProblemsView onBackToDashboard={() => setCurrentTab('dashboard')} />
        )}

        {/* 3. Resume Analyzer */}
        {currentTab === 'resume' && (
          <ResumeFeedbackView onBackToDashboard={() => setCurrentTab('dashboard')} />
        )}

        {/* 4. Mock Interview */}
        {currentTab === 'interview' && (
          <MockInterviewView
            onBackToDashboard={() => setCurrentTab('dashboard')}
            initialReport={interviewReport}
            onInterviewFinished={(report) => setInterviewReport(report)}
          />
        )}

        {/* 5. Dedicated Profile Page with Sideways Options & Past Records Sheet */}
        {currentTab === 'profile' && (
          <ProfileView
            user={currentUser}
            pastRecords={pastRecords}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#8C1D40] dark:text-[#FFC627] lowercase">placeprep</span>
            <span>·</span>
            <span>AI Placement & Mock Interview System</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">{currentUser.name}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono tabular-nums">
            <span>{currentUser.college}</span>
            <span aria-hidden="true">·</span>
            <span>Semester 1 Placement Preparation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
