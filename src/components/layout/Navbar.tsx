import React, { useState } from 'react';
import { NavigationTab, RegisteredUser } from '../../types';
import { Sun, Moon, Menu, X, LogOut, User } from 'lucide-react';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  user: RegisteredUser;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  user,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Home dashboard options strictly as requested by the user:
  // aptitude practice, coding practice, resume analyzer, mock interview
  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'aptitude', label: 'Aptitude Practice' },
    { id: 'coding', label: 'Coding Practice' },
    { id: 'resume', label: 'Resume Analyzer' },
    { id: 'interview', label: 'Mock Interview' },
  ];

  const handleNavClick = (id: NavigationTab) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title wordmark "placeprep" */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2 text-left group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8C1D40] flex items-center justify-center text-white font-extrabold text-sm shadow-xs group-hover:bg-[#721532] transition-colors">
              PP
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 lowercase">
              placeprep
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onSelectTab(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#8C1D40] dark:text-[#FFC627] font-semibold border-b-2 border-[#8C1D40] dark:border-[#FFC627]'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: User Profile & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#FFC627]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-left transition-colors"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-md object-cover border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#8C1D40] text-white text-xs font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-900 dark:text-white max-w-[120px] truncate">
                {user.name}
              </span>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-3 z-50 text-xs">
                <div className="pb-2.5 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white truncate">{user.name}</div>
                  <div className="text-slate-500 truncate text-[11px] font-mono mt-0.5">{user.email}</div>
                  <div className="text-slate-500 text-[11px] font-mono mt-0.5">{user.phone}</div>
                  <div className="text-[#8C1D40] dark:text-[#FFC627] text-[11px] font-medium mt-1 truncate">
                    {user.college}
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onSelectTab('profile');
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-left"
                  >
                    <User className="w-3.5 h-3.5 text-[#8C1D40] dark:text-[#FFC627]" />
                    <span>View Profile & Records</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of placeprep</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#8C1D40]/10 text-[#8C1D40] dark:text-[#FFC627] font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 space-y-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectTab('profile');
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Profile & Past Records</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSignOut();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
