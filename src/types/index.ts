export type NavigationTab = 
  | 'dashboard' 
  | 'aptitude' 
  | 'coding' 
  | 'resume' 
  | 'interview'
  | 'profile';

export type AuthScreen = 'welcome' | 'login' | 'register' | 'authenticated';

export interface RegisteredUser {
  name: string;
  email: string;
  phone: string;
  password?: string;
  asuId: string;
  college: string;
  degree: string;
  semester: string;
  gpa: number;
  targetRole: string;
  targetCompany: string;
  placementCycle: string;
  avatarUrl: string;
}

export type StudentProfile = RegisteredUser;


export interface PillarScore {
  name: string;
  key: 'aptitude' | 'coding' | 'communication' | 'technical';
  score: number;
  benchmark: number;
  testsCompleted: number;
  status: 'Strong' | 'On Track' | 'Needs Focus';
  trend: string;
  topWeakness: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PracticeQuestion {
  id: string;
  category: 'Aptitude' | 'Coding' | 'Communication' | 'Technical';
  subTopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  companyTags: string[];
}

export interface MockInterviewQuestion {
  id: string;
  role: string;
  type: 'Technical' | 'Behavioral (STAR)' | 'System Design' | 'Campus Specific';
  prompt: string;
  context: string;
  keyEvaluationPoints: string[];
  sampleModelAnswer: string;
}

export interface InterviewEvaluation {
  clarityScore: number;
  pacingWpm: number;
  fillerWordCount: number;
  technicalDepthScore: number;
  starStructureScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestedAnswer: string;
}

export interface InterviewQuestionResponse {
  questionId: string;
  questionPrompt: string;
  questionType: string;
  transcript: string;
  evaluation: InterviewEvaluation;
}

export interface CompletedInterviewReport {
  id: string;
  date: string;
  completedAt: string;
  overallScore: number;
  verdict: string;
  durationMinutes: number;
  totalQuestions: number;
  answeredCount: number;
  averagePacingWpm: number;
  totalFillerWords: number;
  starAverageScore: number;
  clarityAverageScore: number;
  technicalAverageScore: number;
  confidenceScore: number;
  responses: InterviewQuestionResponse[];
  masterFeedback: {
    strengths: string[];
    improvements: string[];
  };
}

export interface CodingProblem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Med.' | 'Hard';
  acceptance: string;
  category: 'Algorithms' | 'Database' | 'Concurrency' | 'JavaScript' | 'Shell';
  tags: string[];
  companies: string[];
  status: 'solved' | 'attempted' | 'todo';
  isDaily?: boolean;
  frequency: number; // 1-5 scale for LeetCode company bar
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases: {
    input: string;
    expected: string;
  }[];
}

export interface PeerCodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptanceRate: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<string, string>;
  testCases: {
    input: string;
    expected: string;
  }[];
}

export interface StudyPathModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  completed: boolean;
  industryAlignment: string;
  resourceCount: number;
}

export interface StudyTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  recommendedFor: string;
  totalWeeks: number;
  completedPercent: number;
  partnerCompanies: string[];
  modules: StudyPathModule[];
}

export interface PlanItem {
  id: string;
  day: number;
  title: string;
  pillar: 'Aptitude' | 'Coding' | 'Communication' | 'Technical';
  estimatedMinutes: number;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Routine';
  actionType: 'test' | 'code' | 'interview' | 'read';
}

export type SetDifficultyLevel = 'Easy' | 'Moderate' | 'Hard' | 'Mixed';

export interface AptitudeQuestion {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formulaOrConcept?: string;
  companyTag?: string;
}

export interface AptitudeSet {
  id: string;
  setNumber: number;
  title: string;
  difficulty: SetDifficultyLevel;
  questionCount: number;
  timeMinutes: number;
  category: string;
  description: string;
  companyTags: string[];
  bestScore?: number;
  attemptsCount: number;
  questions: AptitudeQuestion[];
}

export interface TestAttemptRecord {
  id: string;
  setId: string;
  setTitle: string;
  difficulty: SetDifficultyLevel;
  date: string;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  timeSpentSeconds: number;
  avgTimePerQuestionSeconds: number;
  accuracyPercent: number;
  topicBreakdown: {
    topic: string;
    correct: number;
    total: number;
  }[];
  userAnswers: Record<number, number>;
}

