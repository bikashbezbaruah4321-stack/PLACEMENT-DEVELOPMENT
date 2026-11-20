import React, { useState, useEffect, useRef } from 'react';
import { MOCK_INTERVIEW_QUESTIONS } from '../../data/mockData';
import {
  MockInterviewQuestion,
  InterviewEvaluation,
  CompletedInterviewReport,
  InterviewQuestionResponse,
} from '../../types';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Square,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  ArrowLeft,
  Radio,
  Headphones,
  Bot,
  Send,
  Check,
  ChevronRight,
  HelpCircle,
  Settings2,
  XCircle,
  Award,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  BarChart2,
} from 'lucide-react';

interface Props {
  onBackToDashboard?: () => void;
  onInterviewFinished?: (report: CompletedInterviewReport) => void;
  initialReport?: CompletedInterviewReport | null;
}

export const MockInterviewView: React.FC<Props> = ({
  onBackToDashboard,
  onInterviewFinished,
  initialReport,
}) => {
  // View Modes: 'session' (Live Voice Interview) | 'report' (Detailed Performance Report) | 'hub' (Interview Overview with Finished Indicator)
  const [viewMode, setViewMode] = useState<'session' | 'report' | 'hub'>(
    initialReport ? 'hub' : 'session'
  );

  // Completed report & historical responses state
  const [completedReport, setCompletedReport] = useState<CompletedInterviewReport | null>(
    initialReport || null
  );
  const [responses, setResponses] = useState<Record<string, InterviewQuestionResponse>>({});
  const [showEndModal, setShowEndModal] = useState(false);

  // Question navigation inside session
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // AI Assistant Voice States
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiAudioLevel, setAiAudioLevel] = useState(0);
  const [autoPlayAiVoice, setAutoPlayAiVoice] = useState(true);
  const [autoListenAfterAi, setAutoListenAfterAi] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);

  // Candidate Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [candidateAudioLevel, setCandidateAudioLevel] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  // Evaluation States
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  // Session duration timer
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const activeQuestion: MockInterviewQuestion = MOCK_INTERVIEW_QUESTIONS[currentQuestionIndex];

  // Track session timer
  useEffect(() => {
    let timer: any = null;
    if (viewMode === 'session') {
      timer = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [viewMode]);

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setVoiceSupported(true);
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    } else {
      setVoiceSupported(false);
    }
  }, []);

  // Web Speech Recognition setup
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      setSpeechRecognitionSupported(true);
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentText.trim());
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechRecognitionSupported(false);
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Simulated dynamic audio waves when AI is speaking
  useEffect(() => {
    let intervalId: any = null;
    if (isAiSpeaking) {
      intervalId = setInterval(() => {
        setAiAudioLevel(Math.floor(Math.random() * 65) + 35);
      }, 100);
    } else {
      setAiAudioLevel(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAiSpeaking]);

  // Simulated dynamic audio waves when Candidate is speaking
  useEffect(() => {
    let intervalId: any = null;
    if (isRecording) {
      intervalId = setInterval(() => {
        setCandidateAudioLevel(Math.floor(Math.random() * 75) + 25);
      }, 100);
    } else {
      setCandidateAudioLevel(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRecording]);

  // ==========================================
  // AI ASSISTANT SPEECH SYNTHESIS ENGINE
  // ==========================================
  const speakText = (text: string, onFinished?: () => void) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (isRecording) {
      try {
        recognitionRef.current?.stop();
      } catch (_) {}
      setIsRecording(false);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Female') ||
            v.name.includes('Jenny') ||
            v.name.includes('Victoria'))
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsAiSpeaking(true);
    };

    utterance.onend = () => {
      setIsAiSpeaking(false);
      if (onFinished) {
        onFinished();
      } else if (autoListenAfterAi && viewMode === 'session') {
        startUserRecording();
      }
    };

    utterance.onerror = () => {
      setIsAiSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const askQuestionWithAiVoice = () => {
    const speechIntro = `Question ${currentQuestionIndex + 1}. ${activeQuestion.prompt}`;
    speakText(speechIntro);
  };

  const stopAiVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAiSpeaking(false);
  };

  useEffect(() => {
    if (viewMode === 'session' && autoPlayAiVoice && voiceSupported) {
      const timer = setTimeout(() => {
        askQuestionWithAiVoice();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, autoPlayAiVoice, voiceSupported, viewMode]);

  // ==========================================
  // CANDIDATE VOICE RECORDING ENGINE
  // ==========================================
  const startUserRecording = () => {
    if (isAiSpeaking) {
      stopAiVoice();
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (_) {
        setIsRecording(true);
      }
    } else {
      setIsRecording(true);
    }
  };

  const stopUserRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopUserRecording();
    } else {
      startUserRecording();
    }
  };

  const toggleCamera = async () => {
    if (cameraActive) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (_) {
        setCameraActive(true);
      }
    }
  };

  // ==========================================
  // EVALUATION & AI FEEDBACK
  // ==========================================
  const handleEvaluate = () => {
    if (!transcript.trim()) return;

    if (isRecording) {
      stopUserRecording();
    }

    setEvaluating(true);

    setTimeout(() => {
      const words = transcript.trim().split(/\s+/);
      const wordCount = words.length;
      const lower = transcript.toLowerCase();

      const fillers = ['um', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of'];
      let fillerCount = 0;
      fillers.forEach((f) => {
        const matches = lower.match(new RegExp(`\\b${f}\\b`, 'g'));
        if (matches) fillerCount += matches.length;
      });

      const simulatedDurationMinutes = Math.max(0.6, wordCount / 140);
      const pacingWpm = Math.round(wordCount / simulatedDurationMinutes);

      const hasSituation =
        lower.includes('in') ||
        lower.includes('when') ||
        lower.includes('during') ||
        lower.includes('asu') ||
        lower.includes('project');
      const hasAction =
        lower.includes('i ') ||
        lower.includes('built') ||
        lower.includes('implemented') ||
        lower.includes('designed') ||
        lower.includes('refactored');
      const hasResult =
        lower.includes('result') ||
        lower.includes('percent') ||
        lower.includes('%') ||
        lower.includes('reduced') ||
        lower.includes('improved') ||
        lower.includes('faster');

      let starScore = 72;
      if (hasSituation) starScore += 9;
      if (hasAction) starScore += 10;
      if (hasResult) starScore += 9;
      starScore = Math.min(100, starScore);

      let customStrengths: string[] = [];
      let customWeaknesses: string[] = [];
      let spokenVerdict = '';

      if (currentQuestionIndex === 0) {
        customStrengths = [
          'Clear introduction of your name, academic background, and CS focus at ASU.',
          'Articulated genuine enthusiasm and motivation for software engineering.',
          fillerCount <= 2
            ? 'Smooth and confident delivery cadence with minimal filler words.'
            : 'Friendly, approachable tone that built immediate rapport with the interviewer.',
        ];
        customWeaknesses = [
          'Highlight 1 specific project or technical hobby you enjoy to make your intro extra memorable.',
          fillerCount > 2
            ? `Noticed ${fillerCount} verbal filler occurrences ("like", "basically"). Try 1-second deliberate pauses instead.`
            : 'Conclude with a forward-looking sentence about what you hope to achieve this year.',
        ];
        spokenVerdict = `Nice introduction, Devin! You scored ${Math.min(96, Math.max(78, 95 - fillerCount * 4))} percent on communication clarity. You presented your background and enthusiasm clearly. Let's look at the breakdown.`;
      } else if (currentQuestionIndex === 1) {
        customStrengths = [
          'Clear inventory of foundational programming languages (e.g. JavaScript, Python, C++).',
          'Connected technical skills directly to first-semester coursework and practical projects.',
          'Demonstrated eager learning mindset and willingness to explore modern frameworks.',
        ];
        customWeaknesses = [
          'Consider mentioning which specific language you feel most proficient in.',
          'Briefly cite one tangible tool or project feature you built using these skills.',
        ];
        spokenVerdict = `Great walkthrough of your skills and experience! You scored ${Math.min(95, Math.max(76, 82 + Math.min(15, wordCount / 10)))} percent on technical foundation. You clearly outlined your programming stack and coursework.`;
      } else {
        customStrengths = [
          'Effective direct answer addressing the core question without trailing off.',
          hasResult
            ? 'Included quantifiable metric to substantiate real engineering impact.'
            : 'Good technical phrasing and terminology appropriate for collegiate level.',
          fillerCount <= 2
            ? 'Minimal filler words; demonstrated confident delivery cadence.'
            : 'Articulated individual ownership versus generic team consensus.',
        ];
        customWeaknesses = [
          fillerCount > 2
            ? `Noticed ${fillerCount} filler occurrences ("like", "basically"). Try replacing them with 1-second deliberate pauses.`
            : 'Could further elaborate on trade-offs considered prior to choosing this solution.',
          !hasResult
            ? 'Quantify the outcome (e.g. % performance improvement, latency reduction, user volume) to maximize recruiter scoring.'
            : 'Provide an explicit reflection on what you would do differently in retrospect.',
        ];
        spokenVerdict = `Thank you Devin. I have evaluated your response. Your answer scored ${starScore} percent on structure with ${fillerCount === 0 ? 'zero filler words' : `${fillerCount} filler words`}. Here is the complete rubric feedback.`;
      }

      const computedEval: InterviewEvaluation = {
        clarityScore: Math.min(96, Math.max(72, 95 - fillerCount * 4)),
        pacingWpm: pacingWpm || 138,
        fillerWordCount: fillerCount,
        technicalDepthScore: Math.min(94, Math.max(72, 80 + Math.min(15, wordCount / 10))),
        starStructureScore: starScore,
        confidenceScore: Math.min(95, Math.max(75, 92 - fillerCount * 3)),
        strengths: customStrengths,
        weaknesses: customWeaknesses,
        suggestedAnswer: activeQuestion.sampleModelAnswer,
      };

      setEvaluation(computedEval);

      // Save to question responses state
      const responseEntry: InterviewQuestionResponse = {
        questionId: activeQuestion.id,
        questionPrompt: activeQuestion.prompt,
        questionType: activeQuestion.type,
        transcript: transcript.trim(),
        evaluation: computedEval,
      };

      setResponses((prev) => ({
        ...prev,
        [activeQuestion.id]: responseEntry,
      }));

      setEvaluating(false);

      if (voiceSupported) {
        speakText(spokenVerdict, () => {});
      }
    }, 1100);
  };

  // ==========================================
  // END INTERVIEW & COMPILE DETAILED REPORT
  // ==========================================
  const handleEndInterview = () => {
    stopAiVoice();
    stopUserRecording();
    setShowEndModal(false);

    // If current transcript is present but not evaluated yet, save it
    const activeResp = responses[activeQuestion.id] || (transcript.trim() ? {
      questionId: activeQuestion.id,
      questionPrompt: activeQuestion.prompt,
      questionType: activeQuestion.type,
      transcript: transcript.trim(),
      evaluation: evaluation || {
        clarityScore: 90,
        pacingWpm: 140,
        fillerWordCount: 1,
        technicalDepthScore: 88,
        starStructureScore: 86,
        confidenceScore: 92,
        strengths: ['Clear articulate delivery', 'Good collegiate technical phrasing'],
        weaknesses: ['Elaborate further on trade-offs'],
        suggestedAnswer: activeQuestion.sampleModelAnswer,
      },
    } : null);

    const allResponses: InterviewQuestionResponse[] = Object.values({
      ...responses,
      ...(activeResp ? { [activeQuestion.id]: activeResp } : {}),
    });

    // If candidate ended before answering any question, seed sample model answers
    if (allResponses.length === 0) {
      allResponses.push(
        {
          questionId: MOCK_INTERVIEW_QUESTIONS[0].id,
          questionPrompt: MOCK_INTERVIEW_QUESTIONS[0].prompt,
          questionType: MOCK_INTERVIEW_QUESTIONS[0].type,
          transcript: MOCK_INTERVIEW_QUESTIONS[0].sampleModelAnswer,
          evaluation: {
            clarityScore: 94,
            pacingWpm: 142,
            fillerWordCount: 1,
            technicalDepthScore: 90,
            starStructureScore: 92,
            confidenceScore: 95,
            strengths: [
              'Clear introduction of name, academic background, and CS focus at ASU.',
              'Articulated genuine enthusiasm and motivation for software engineering.',
              'Clean speaking cadence with minimal filler words.',
            ],
            weaknesses: [
              'Highlight 1 specific project or technical hobby you enjoy to make your intro extra memorable.',
            ],
            suggestedAnswer: MOCK_INTERVIEW_QUESTIONS[0].sampleModelAnswer,
          },
        },
        {
          questionId: MOCK_INTERVIEW_QUESTIONS[1].id,
          questionPrompt: MOCK_INTERVIEW_QUESTIONS[1].prompt,
          questionType: MOCK_INTERVIEW_QUESTIONS[1].type,
          transcript: MOCK_INTERVIEW_QUESTIONS[1].sampleModelAnswer,
          evaluation: {
            clarityScore: 92,
            pacingWpm: 138,
            fillerWordCount: 0,
            technicalDepthScore: 89,
            starStructureScore: 88,
            confidenceScore: 91,
            strengths: [
              'Clear inventory of foundational programming languages (JavaScript, Python, C++).',
              'Connected technical skills directly to first-semester coursework and practical projects.',
              'Demonstrated eager learning mindset and willingness to explore modern frameworks.',
            ],
            weaknesses: [
              'Consider mentioning which specific language you feel most proficient in.',
            ],
            suggestedAnswer: MOCK_INTERVIEW_QUESTIONS[1].sampleModelAnswer,
          },
        }
      );
    }

    // Calculate composite metrics
    const avgClarity = Math.round(
      allResponses.reduce((sum, r) => sum + r.evaluation.clarityScore, 0) / allResponses.length
    );
    const avgTech = Math.round(
      allResponses.reduce((sum, r) => sum + r.evaluation.technicalDepthScore, 0) / allResponses.length
    );
    const avgStar = Math.round(
      allResponses.reduce((sum, r) => sum + r.evaluation.starStructureScore, 0) / allResponses.length
    );
    const avgPacing = Math.round(
      allResponses.reduce((sum, r) => sum + r.evaluation.pacingWpm, 0) / allResponses.length
    );
    const totalFillers = allResponses.reduce((sum, r) => sum + r.evaluation.fillerWordCount, 0);
    const avgConfidence = Math.round(
      allResponses.reduce((sum, r) => sum + r.evaluation.confidenceScore, 0) / allResponses.length
    );

    const overallScore = Math.round(avgClarity * 0.35 + avgTech * 0.35 + avgStar * 0.2 + avgConfidence * 0.1);

    const report: CompletedInterviewReport = {
      id: `int-rep-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      completedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      overallScore,
      verdict: overallScore >= 85 ? 'Strong Hire / Recommended for ASU Placement Round 2' : 'Hire / Good Technical Foundation',
      durationMinutes: Math.max(3, Math.round(sessionSeconds / 60) || 4),
      totalQuestions: MOCK_INTERVIEW_QUESTIONS.length,
      answeredCount: allResponses.length,
      averagePacingWpm: avgPacing,
      totalFillerWords: totalFillers,
      starAverageScore: avgStar,
      clarityAverageScore: avgClarity,
      technicalAverageScore: avgTech,
      confidenceScore: avgConfidence,
      responses: allResponses,
      masterFeedback: {
        strengths: [
          'Exceptional introductory presence: clearly established student background at Arizona State University.',
          'Sound technical vocabulary across JavaScript, Python, and foundational data structures.',
          `Maintained steady speaking delivery pace averaging ${avgPacing} words per minute without rushing.`,
          `High verbal polish: restricted verbal filler occurrences to only ${totalFillers} across all responses.`,
        ],
        improvements: [
          'When discussing technical skills, specify 1 feature or tool you built to provide concrete evidence.',
          'Quantify outcomes when referencing projects (e.g. % faster load times, user counts, or test cases passed).',
          'Practice structured 1-second pauses when formulating thoughts instead of vocalized fillers.',
        ],
      },
    };

    setCompletedReport(report);
    if (onInterviewFinished) {
      onInterviewFinished(report);
    }

    // Switch to detailed report view
    setViewMode('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS.length - 1) {
      stopAiVoice();
      stopUserRecording();
      setCurrentQuestionIndex((prev) => prev + 1);
      setTranscript('');
      setEvaluation(null);
    } else {
      // Reached the final question, trigger end interview
      handleEndInterview();
    }
  };

  const handleRetakeSession = () => {
    stopAiVoice();
    stopUserRecording();
    setCurrentQuestionIndex(0);
    setTranscript('');
    setEvaluation(null);
    setResponses({});
    setSessionSeconds(0);
    setViewMode('session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadSampleAnswer = () => {
    setTranscript(activeQuestion.sampleModelAnswer);
  };

  // Download interview report as text file
  const handleDownloadReport = () => {
    if (!completedReport) return;
    const content = `
=====================================================
ASU FULTON SCHOOLS OF ENGINEERING - MOCK INTERVIEW REPORT
=====================================================
Candidate: Devin Chen
Interviewer: Sarah Lin (Senior Staff Engineer, ASU Alum)
Date: ${completedReport.date} at ${completedReport.completedAt}
Status: COMPLETED & EVALUATED
Overall Score: ${completedReport.overallScore}/100
Verdict: ${completedReport.verdict}
Duration: ${completedReport.durationMinutes} Minutes
Questions Completed: ${completedReport.answeredCount} of ${completedReport.totalQuestions}

PERFORMANCE METRICS
-----------------------------------------------------
- Communication Clarity: ${completedReport.clarityAverageScore}%
- Technical Depth: ${completedReport.technicalAverageScore}%
- Speaking Cadence: ${completedReport.averagePacingWpm} WPM (Target: 130-160)
- Total Verbal Fillers: ${completedReport.totalFillerWords} occurrences
- STAR Method Compliance: ${completedReport.starAverageScore}%
- Confidence & Poise: ${completedReport.confidenceScore}%

MASTER RECRUITER KEY STRENGTHS
-----------------------------------------------------
${completedReport.masterFeedback.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

PRIORITY IMPROVEMENT AREAS
-----------------------------------------------------
${completedReport.masterFeedback.improvements.map((im, i) => `${i + 1}. ${im}`).join('\n')}

QUESTION-BY-QUESTION RESPONSES & RUBRIC
-----------------------------------------------------
${completedReport.responses
  .map(
    (r, i) => `
[Question ${i + 1}] (${r.questionType})
Prompt: ${r.questionPrompt}
Your Transcript: "${r.transcript}"
Score: ${r.evaluation.clarityScore}% Clarity | ${r.evaluation.technicalDepthScore}% Technical
Recruiter Strengths: ${r.evaluation.strengths.join('; ')}
Key Improvement: ${r.evaluation.weaknesses.join('; ')}
`
  )
  .join('\n')}
=====================================================
PlacePrep Placement Preparation Platform - ASU
=====================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Devin_Chen_ASU_Interview_Report_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ========================================================
  // VIEW 1: INTERVIEW HUB (REFLECT BACK PREVIOUS PAGE STATE)
  // INDICATING INTERVIEW IS FINISHED
  // ========================================================
  if (viewMode === 'hub') {
    return (
      <div className="space-y-6">
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
              <span>Mock Interview Hub</span>
            </div>
          </div>
        )}

        {/* PROMINENT INTERVIEW FINISHED BANNER */}
        {completedReport ? (
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white rounded-2xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-800/40">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black tracking-wider uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interview Session Finished &amp; Evaluated</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Placement Mock Interview Completed
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Your voice interview session with Senior Staff Engineer Sarah Lin has concluded. Your responses have been fully evaluated against ASU placement criteria.
                </p>
              </div>

              {/* Score Display */}
              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
                <div className="text-right">
                  <div className="text-[11px] uppercase font-mono text-slate-400 tracking-wider">
                    Overall Verdict
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    Strong Hire
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-black text-white">{completedReport.overallScore}%</span>
                  <span className="text-[10px] text-emerald-300 font-bold uppercase">Grade A</span>
                </div>
              </div>
            </div>

            {/* Quick Session Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-sans">Completed On</div>
                <div className="text-xs font-bold text-white mt-0.5">{completedReport.date} at {completedReport.completedAt}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-sans">Questions Evaluated</div>
                <div className="text-xs font-bold text-white mt-0.5">{completedReport.answeredCount} Questions</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-sans">Speaking Pace</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">{completedReport.averagePacingWpm} WPM</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="text-[11px] text-slate-400 font-sans">Verbal Fillers</div>
                <div className="text-xs font-bold text-amber-300 mt-0.5">{completedReport.totalFillerWords} Words</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setViewMode('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Detailed Performance Report</span>
              </button>

              <button
                type="button"
                onClick={handleRetakeSession}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake / Practice Again</span>
              </button>

              {onBackToDashboard && (
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer ml-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Dashboard</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Bot className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                <span className="font-semibold text-slate-900 dark:text-white">AI Placement Interview Booth</span>
                <span>·</span>
                <span>Voice Interactive</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ASU Round 1 Mock Placement Interview
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Practice essential first-round questions: personal introduction, technical skills, coursework experience, and problem-solving with Sarah Lin.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setViewMode('session');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8C1D40] hover:bg-[#721532] text-white font-bold text-sm shadow-md transition-all cursor-pointer shrink-0"
            >
              <Mic className="w-4 h-4 text-[#FFC627]" />
              <span>Start Voice Interview</span>
            </button>
          </div>
        )}

        {/* First-Time Interview Preparation Guide */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Questions Covered in This Session</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Beginner-Friendly Sequence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {MOCK_INTERVIEW_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500 font-mono">Question {idx + 1}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                    {q.type}
                  </span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white">{q.prompt}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{q.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: DETAILED COMPREHENSIVE PERFORMANCE REPORT
  // ========================================================
  if (viewMode === 'report' && completedReport) {
    return (
      <div className="space-y-6">
        {/* Top Action Bar with Back Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setViewMode('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
              title="Return to Interview Hub"
            >
              <ArrowLeft className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Interview Hub</span>
            </button>

            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Return to Main Dashboard"
              >
                <span>Dashboard</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Download text report"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>

            <button
              type="button"
              onClick={handleRetakeSession}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C1D40] hover:bg-[#721532] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FFC627]" />
              <span>Retake Interview</span>
            </button>
          </div>
        </div>

        {/* Master Report Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Interview Finished
                </span>
                <span>·</span>
                <span className="font-mono">Completed: {completedReport.date} at {completedReport.completedAt}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Detailed Mock Interview Performance Report
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Evaluated by <strong>Sarah Lin</strong> (Senior Staff Engineer, ASU Fulton Alum) against campus recruitment benchmarks for Amazon, Intel, and Google software engineering internships.
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shrink-0">
              <div className="text-right">
                <div className="text-[11px] font-mono uppercase text-slate-400">Readiness Score</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {completedReport.verdict.split('/')[0].trim()}
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#8C1D40] text-white flex flex-col items-center justify-center font-mono shadow-xs">
                <span className="text-2xl font-black">{completedReport.overallScore}%</span>
                <span className="text-[9px] uppercase tracking-wider text-[#FFC627] font-bold">Grade A</span>
              </div>
            </div>
          </div>

          {/* Recruiter Verbal Summary Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/70 to-slate-50 dark:from-indigo-950/30 dark:to-slate-800/50 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/avatar_interviewer_1793904634140.jpg"
                alt="Sarah Lin"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Sarah Lin's Verbal Feedback Summary</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  "Devin demonstrated strong composure. Your self-introduction in Question 1 was confident, and your technical skills overview in Question 2 showed a solid grasp of foundational programming."
                </p>
              </div>
            </div>

            {voiceSupported && (
              <button
                type="button"
                onClick={() => {
                  const summaryText = `Hello Devin, your mock interview has concluded with an overall score of ${completedReport.overallScore} percent. You gave an articulate introduction and structured your technical skills cleanly. Your delivery averaged ${completedReport.averagePacingWpm} words per minute. Take a look at your question breakdown.`;
                  speakText(summaryText);
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen to Summary</span>
              </button>
            )}
          </div>

          {/* 6 Core Placement Performance Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">Clarity &amp; Poise</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                {completedReport.clarityAverageScore}%
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">High Articulation</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">Technical Depth</div>
              <div className="text-lg font-bold font-mono text-[#8C1D40] dark:text-[#FFC627] tabular-nums mt-0.5">
                {completedReport.technicalAverageScore}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Languages &amp; Tools</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">Delivery Cadence</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                {completedReport.averagePacingWpm} <span className="text-xs font-normal text-slate-500">wpm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Optimal (130-160)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">Verbal Fillers</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                {completedReport.totalFillerWords}
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Minimal Occurrences</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">STAR Structure</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                {completedReport.starAverageScore}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Behavioral Logic</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-400 font-sans">Confidence Index</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-0.5">
                {completedReport.confidenceScore}%
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5 font-semibold">Interview Ready</div>
            </div>
          </div>
        </div>

        {/* Master Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Key Strengths Observed</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc list-inside">
              {completedReport.masterFeedback.strengths.map((str, idx) => (
                <li key={idx}>{str}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Priority Improvement Action Plan</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed list-disc list-inside">
              {completedReport.masterFeedback.improvements.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question-by-Question Deep Analysis */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
                <span>Question-by-Question Deep Rubric Breakdown</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed audit of what you spoke via voice and how each response was scored.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              {completedReport.responses.length} Evaluated Responses
            </span>
          </div>

          <div className="space-y-4">
            {completedReport.responses.map((resp, idx) => (
              <div
                key={resp.questionId || idx}
                className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-4"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#8C1D40] text-white font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {resp.questionPrompt}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {resp.questionType}
                  </span>
                </div>

                {/* Candidate's Spoken Transcript */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-rose-500" />
                    <span>Your Spoken Voice Transcript:</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                    "{resp.transcript}"
                  </div>
                </div>

                {/* Specific Rubric Scores */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 font-sans block">Clarity Score</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{resp.evaluation.clarityScore}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 font-sans block">Technical Score</span>
                    <span className="font-bold text-[#8C1D40] dark:text-[#FFC627] mt-0.5 block">{resp.evaluation.technicalDepthScore}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 font-sans block">Pacing</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{resp.evaluation.pacingWpm} wpm</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 font-sans block">Fillers</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{resp.evaluation.fillerWordCount}</span>
                  </div>
                </div>

                {/* Question Feedback */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-1">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px]">
                      Demonstrated Strengths:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-900 dark:text-emerald-200">
                      {resp.evaluation.strengths.map((s, si) => (
                        <li key={si}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-1">
                    <div className="font-bold text-amber-800 dark:text-amber-300 text-[11px]">
                      Targeted Improvement:
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-900 dark:text-amber-200">
                      {resp.evaluation.weaknesses.map((w, wi) => (
                        <li key={wi}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Return Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setViewMode('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs shadow-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Interview Hub (Shows Interview Finished)</span>
          </button>

          <button
            type="button"
            onClick={handleRetakeSession}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Session</span>
          </button>
        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 3: ACTIVE LIVE INTERVIEW SESSION
  // ========================================================
  return (
    <div className="space-y-4">
      {/* Top Corner Action Bar with Back and END INTERVIEW Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBackToDashboard && (
            <button
              type="button"
              onClick={() => {
                stopAiVoice();
                stopUserRecording();
                onBackToDashboard();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
              title="Return to Home Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              stopAiVoice();
              stopUserRecording();
              setViewMode('hub');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Interview Hub"
          >
            <span>Interview Hub</span>
          </button>
        </div>

        {/* PROMINENT END INTERVIEW BUTTON */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowEndModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="End Interview and generate comprehensive evaluation report"
          >
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>End Interview</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Ending Interview */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  End Interview Session?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your spoken responses will be evaluated to generate your detailed placement report.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ending will conclude your session with Sarah Lin and generate a comprehensive performance analysis report covering communication clarity, WPM cadence, technical depth, and hiring verdict.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowEndModal(false)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Keep Practicing
              </button>
              <button
                type="button"
                onClick={handleEndInterview}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                End Interview &amp; Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">
              {activeQuestion.role}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Round 1 Placement Simulation</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#8C1D40] dark:text-[#FFC627] font-medium">
              {activeQuestion.type}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Question {currentQuestionIndex + 1} of {MOCK_INTERVIEW_QUESTIONS.length}: {activeQuestion.prompt}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={loadSampleAnswer}
            className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium cursor-pointer"
            title="Insert a high-scoring sample response"
          >
            Insert Sample Answer
          </button>
          <button
            type="button"
            onClick={handleRetakeSession}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Assistant Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-4 shadow-sm border border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isAiSpeaking ? 'bg-amber-400 animate-ping' : isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
            <div className={`w-3 h-3 rounded-full absolute inset-0 ${isAiSpeaking ? 'bg-amber-400' : isRecording ? 'bg-rose-500' : 'bg-emerald-400'}`} />
          </div>

          <div className="space-y-0.5">
            <div className="font-bold flex items-center gap-2">
              <span>Voice Interaction Status:</span>
              {isAiSpeaking ? (
                <span className="text-amber-300 flex items-center gap-1 font-mono">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  AI Assistant is speaking question aloud...
                </span>
              ) : isRecording ? (
                <span className="text-rose-400 flex items-center gap-1 font-mono">
                  <Mic className="w-3.5 h-3.5 animate-bounce" />
                  Candidate is speaking reply via microphone...
                </span>
              ) : transcript ? (
                <span className="text-emerald-300 flex items-center gap-1 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  Response captured · Ready for AI Evaluation
                </span>
              ) : (
                <span className="text-slate-300 font-mono">
                  AI Ready · Listening for your response
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              The AI interviewer asks questions via voice. Reply by speaking through your microphone.
            </p>
          </div>
        </div>

        {/* Voice Toggles */}
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={autoPlayAiVoice}
              onChange={(e) => setAutoPlayAiVoice(e.target.checked)}
              className="rounded text-[#8C1D40] focus:ring-0"
            />
            <span className="text-[11px]">Auto-Speak Questions</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white select-none">
            <input
              type="checkbox"
              checked={autoListenAfterAi}
              onChange={(e) => setAutoListenAfterAi(e.target.checked)}
              className="rounded text-[#8C1D40] focus:ring-0"
            />
            <span className="text-[11px]">Auto-Listen After AI</span>
          </label>
        </div>
      </div>

      {/* Video feeds grid: AI Interviewer (Voice) + Candidate (Voice) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: AI INTERVIEWER AVATAR & VOICE SPEAKER */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 shadow-md group">
          <img
            src="/src/assets/images/avatar_interviewer_1793904634140.jpg"
            alt="Interviewer Sarah Lin"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-300 ${
              isAiSpeaking ? 'opacity-95 scale-102 ring-4 ring-amber-400/40' : 'opacity-85'
            }`}
          />

          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1.5 border border-white/10">
            <Bot className="w-3.5 h-3.5 text-[#FFC627]" />
            <span className="font-semibold">Sarah Lin (AI Interviewer)</span>
            <span className="text-slate-300 hidden sm:inline">· Senior Staff Engineer</span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            {isAiSpeaking ? (
              <button
                type="button"
                onClick={stopAiVoice}
                className="px-2.5 py-1 rounded-lg bg-amber-500/90 hover:bg-amber-600 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                title="Pause or stop AI voice"
              >
                <Square className="w-3 h-3 fill-white" />
                <span>Stop Speaking</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={askQuestionWithAiVoice}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/90 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                title="AI reads question aloud using voice"
              >
                <Volume2 className="w-3 h-3" />
                <span>Speak Question</span>
              </button>
            )}
          </div>

          {isAiSpeaking && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none">
              <div className="flex items-center gap-1.5 h-10 px-4 py-2 rounded-full bg-black/60 border border-amber-400/50 shadow-lg">
                {[40, 75, 95, 60, 85, 100, 70, 90, 50, 80, 65, 45].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-amber-400 rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(6, (aiAudioLevel * h) / 100)}px`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 mt-2 px-3 py-0.5 rounded-full bg-black/70">
                Sarah Lin is speaking question...
              </span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white text-xs">
            <div className="flex items-center justify-between text-[#FFC627] font-semibold text-[11px] mb-1">
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Interviewer Prompt (Voice Output)</span>
              </div>
              <span className="text-[10px] text-slate-300 font-mono">
                {isAiSpeaking ? 'Speaking...' : 'Ready'}
              </span>
            </div>
            <p className="line-clamp-2 text-slate-200 leading-snug">{activeQuestion.prompt}</p>
          </div>
        </div>

        {/* RIGHT: CANDIDATE VIDEO FEED & MICROPHONE INPUT */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-800 shadow-md">
          {cameraActive && mediaStreamRef.current ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="relative">
                <img
                  src="/src/assets/images/avatar_student_1793904634702.jpg"
                  alt="Candidate Devin Chen"
                  referrerPolicy="no-referrer"
                  className={`w-24 h-24 rounded-full object-cover border-2 mb-3 shadow-md transition-all ${
                    isRecording ? 'border-rose-500 ring-4 ring-rose-500/30' : 'border-slate-700'
                  }`}
                />
                {isRecording && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px]">
                    <Mic className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold text-white">Devin Chen (Candidate)</div>
              <div className="text-xs text-slate-400 mt-0.5">Arizona State University · CSE</div>
            </div>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleCamera}
              className={`p-2 rounded-lg backdrop-blur-md text-xs transition-colors border cursor-pointer ${
                cameraActive
                  ? 'bg-black/60 text-white border-white/10 hover:bg-black/80'
                  : 'bg-rose-900/80 text-white border-rose-700/50 hover:bg-rose-800'
              }`}
              title={cameraActive ? 'Turn off camera' : 'Turn on camera'}
            >
              {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
          </div>

          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1.5 border border-white/10">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold">Candidate Audio</span>
            <span className="text-slate-300">
              {isRecording ? '· Mic Active (Speaking)' : '· Mic Idle'}
            </span>
          </div>

          {isRecording && (
            <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-rose-500/40 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 h-4">
                  {[20, 60, 90, 45, 80, 100, 65, 85, 30].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-rose-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(4, (candidateAudioLevel * h) / 100)}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-rose-300 font-semibold">
                  Listening to your voice reply...
                </span>
              </div>

              <button
                type="button"
                onClick={stopUserRecording}
                className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-white" />
                <span>Finish Speaking</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* USER VOICE REPLY & REAL-TIME TRANSCRIPT AREA */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 uppercase">
              Step 2
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-rose-500" />
              Your Voice Reply to AI Interviewer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleRecording}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Reply with Voice</span>
                </>
              )}
            </button>

            {transcript && (
              <button
                type="button"
                onClick={() => setTranscript('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Clear transcript"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={4}
            placeholder={
              isRecording
                ? 'Listening to your voice... Speak clearly into your microphone...'
                : 'Click "Reply with Voice" above and speak your response to Sarah Lin, or type your answer here...'
            }
            className={`w-full p-4 rounded-xl text-sm leading-relaxed resize-none transition-all border ${
              isRecording
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-slate-900 dark:text-white focus:outline-none ring-2 ring-rose-500/20'
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#8C1D40]'
            }`}
          />

          {isRecording && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Transcribing Voice</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-3 font-mono tabular-nums">
            <span>{transcript.trim() ? transcript.trim().split(/\s+/).length : 0} words spoken</span>
            <span aria-hidden="true">·</span>
            <span>Recommended: 120–250 words</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={evaluating || !transcript.trim()}
              onClick={handleEvaluate}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#8C1D40] hover:bg-[#721532] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFC627]" />
              <span>{evaluating ? 'Evaluating Voice Reply...' : 'Submit to AI for Evaluation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Interview Evaluation Report Card */}
      {evaluation && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Question {currentQuestionIndex + 1} Rubric Scorecard
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluated by Sarah Lin against ASU Fulton Placement Assessment standards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {voiceSupported && (
                <button
                  type="button"
                  onClick={() => {
                    const verdict = `Your STAR structure scored ${evaluation.starStructureScore} percent. You delivered at ${evaluation.pacingWpm} words per minute with ${evaluation.fillerWordCount} filler occurrences.`;
                    speakText(verdict);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  title="Listen to verbal critique"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Replay Voice Verdict</span>
                </button>
              )}

              {currentQuestionIndex < MOCK_INTERVIEW_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEndInterview}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finish &amp; View Detailed Report</span>
                </button>
              )}
            </div>
          </div>

          {/* Metric KPI Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">STAR Structure</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-1">
                {evaluation.starStructureScore}%
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">Situation & Action Validated</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Speaking Cadence</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-1">
                {evaluation.pacingWpm} <span className="text-xs font-normal text-slate-500">wpm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Ideal range: 130–160</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Filler Words</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums mt-1">
                {evaluation.fillerWordCount}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">"like", "basically", "um"</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Technical Depth</div>
              <div className="text-xl font-bold font-mono text-[#8C1D40] dark:text-[#FFC627] tabular-nums mt-1">
                {evaluation.technicalDepthScore}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Engineering terms verified</div>
            </div>
          </div>

          {/* Feedback Points: Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200/90 leading-relaxed list-disc list-inside">
                {evaluation.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Targeted Improvements</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed list-disc list-inside">
                {evaluation.weaknesses.map((weak, idx) => (
                  <li key={idx}>{weak}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Model Answer */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              <Eye className="w-4 h-4 text-[#8C1D40] dark:text-[#FFC627]" />
              <span>Recommended Gold Standard Response</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {evaluation.suggestedAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
