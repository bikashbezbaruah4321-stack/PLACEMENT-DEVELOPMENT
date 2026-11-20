import React, { useState } from 'react';
import { RegisteredUser } from '../../types';
import { CURRENT_STUDENT } from '../../data/mockData';
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: RegisteredUser) => void;
  onGoToRegister: () => void;
  onGoToWelcome: () => void;
  registeredUsers: RegisteredUser[];
  prefilledEmail?: string;
  registrationSuccessMessage?: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onGoToRegister,
  onGoToWelcome,
  registeredUsers,
  prefilledEmail = '',
  registrationSuccessMessage,
}) => {
  const [email, setEmail] = useState(prefilledEmail || CURRENT_STUDENT.email);
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email and password.');
      return;
    }

    // Check against registered users list or default mock student
    const allUsers = [...registeredUsers, CURRENT_STUDENT];
    const foundUser = allUsers.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!foundUser) {
      setError('No account found with this email. Please register for a new account.');
      return;
    }

    if (foundUser.password && foundUser.password !== password) {
      setError('Incorrect password. Please verify your password or use demo account.');
      return;
    }

    onLoginSuccess(foundUser);
  };

  const handleUseDemoAccount = () => {
    setEmail(CURRENT_STUDENT.email);
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 px-4 py-8 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Brand / Logo */}
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={onGoToWelcome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>

          <div className="flex items-center justify-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#8C1D40] text-white font-extrabold flex items-center justify-center text-base shadow-sm">
              PP
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white lowercase">
              placeprep
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your placement dashboard and interview simulations
          </p>
        </div>

        {/* Success Popup from Registration if present */}
        {registrationSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 shadow-sm flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Registration Successful!</div>
              <div className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                {registrationSuccessMessage}
              </div>
            </div>
          </div>
        )}

        {/* Main Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@asu.edu"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link simulated for your email address.')}
                  className="text-[11px] text-[#8C1D40] dark:text-[#FFC627] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#8C1D40] hover:bg-[#721532] text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#8C1D40] focus:ring-offset-2"
            >
              <span>Sign In to placeprep</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need quick testing?</span>
            <button
              type="button"
              onClick={handleUseDemoAccount}
              className="font-medium text-[#8C1D40] dark:text-[#FFC627] hover:underline"
            >
              Fill Demo Student Credentials
            </button>
          </div>
        </div>

        {/* Switch to Registration */}
        <div className="text-center text-xs text-slate-600 dark:text-slate-400">
          <span>Don't have an account yet? </span>
          <button
            type="button"
            onClick={onGoToRegister}
            className="font-bold text-[#8C1D40] dark:text-[#FFC627] hover:underline"
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};
