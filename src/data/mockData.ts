import {
  StudentProfile,
  PillarScore,
  PracticeQuestion,
  MockInterviewQuestion,
  PeerCodingProblem,
  StudyTrack,
  PlanItem,
} from '../types';
import studentAvatar from '../assets/images/avatar_student_1793904634702.jpg';

export const CURRENT_STUDENT: StudentProfile = {
  name: 'Devin Chen',
  email: 'devin.chen@asu.edu',
  phone: '+1 (480) 555-0192',
  password: 'password123',
  asuId: '1228490192',
  college: 'Ira A. Fulton Schools of Engineering',
  degree: 'B.S. Computer Science (Honors)',
  semester: 'Semester 1 (Freshman)',
  gpa: 3.88,
  targetRole: 'Software Development Engineer Intern',
  targetCompany: 'Amazon / Intel / Google',
  placementCycle: 'Summer 2027 Internship & On-Campus Placement',
  avatarUrl: studentAvatar,
};


export const PILLAR_SCORES: PillarScore[] = [
  {
    name: 'Aptitude & Reasoning',
    key: 'aptitude',
    score: 82,
    benchmark: 75,
    testsCompleted: 14,
    status: 'Strong',
    trend: '+6% this month',
    topWeakness: 'Probability & Permutations',
  },
  {
    name: 'Coding & Data Structures',
    key: 'coding',
    score: 74,
    benchmark: 80,
    testsCompleted: 26,
    status: 'Needs Focus',
    trend: '+12% this month',
    topWeakness: 'Dynamic Programming & Graph Traversal',
  },
  {
    name: 'Communication & Behavioral',
    key: 'communication',
    score: 86,
    benchmark: 70,
    testsCompleted: 9,
    status: 'Strong',
    trend: '+4% this month',
    topWeakness: 'Quantifying Impact in STAR Results',
  },
  {
    name: 'Technical & CS Core',
    key: 'technical',
    score: 71,
    benchmark: 78,
    testsCompleted: 11,
    status: 'Needs Focus',
    trend: '+8% this month',
    topWeakness: 'OS Virtual Memory & SQL Indexing',
  },
];

export const RADAR_DATA = [
  { subject: 'Quantitative Aptitude', student: 84, benchmark: 72 },
  { subject: 'Data Structures & Algorithms', student: 74, benchmark: 80 },
  { subject: 'Communication (STAR Method)', student: 86, benchmark: 70 },
  { subject: 'Computer Systems & OS', student: 71, benchmark: 78 },
  { subject: 'Database & SQL Design', student: 78, benchmark: 75 },
  { subject: 'Logical Reasoning', student: 80, benchmark: 76 },
];

export const PERFORMANCE_HISTORY = [
  { week: 'W1', aptitude: 68, coding: 58, technical: 54, overall: 60 },
  { week: 'W2', aptitude: 72, coding: 61, technical: 60, overall: 64 },
  { week: 'W3', aptitude: 75, coding: 65, technical: 63, overall: 67 },
  { week: 'W4', aptitude: 76, coding: 68, technical: 66, overall: 70 },
  { week: 'W5', aptitude: 79, coding: 70, technical: 69, overall: 72 },
  { week: 'W6', aptitude: 82, coding: 74, technical: 71, overall: 78 },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'apt-1',
    category: 'Aptitude',
    subTopic: 'Time, Speed & Distance',
    difficulty: 'Medium',
    question: 'An ASU campus shuttle travels from Tempe to the Polytechnic campus at 40 mph and returns along the same route at 60 mph. What is the average speed for the entire round trip?',
    options: ['48 mph', '50 mph', '52 mph', '45 mph'],
    correctIndex: 0,
    explanation: 'Average speed for equal distances is given by Harmonic Mean: 2 * (v1 * v2) / (v1 + v2) = 2 * (40 * 60) / (40 + 60) = 4800 / 100 = 48 mph. Arithmetic mean (50) is a common trap.',
    companyTags: ['Amazon', 'Deloitte', 'TCS'],
  },
  {
    id: 'apt-2',
    category: 'Aptitude',
    subTopic: 'Probability & Combinatorics',
    difficulty: 'Hard',
    question: 'A tech firm has 5 SWE intern seats and 12 eligible ASU applicants (7 CS majors, 5 Data Science majors). What is the probability that at least 3 CS majors are selected?',
    options: ['35/77', '91/132', '56/99', '21/44'],
    correctIndex: 1,
    explanation: 'Total ways = C(12, 5) = 792. Desired combinations = C(7,3)*C(5,2) + C(7,4)*C(5,1) + C(7,5)*C(5,0) = (35*10) + (35*5) + (21*1) = 350 + 175 + 21 = 546. 546 / 792 simplifies to 91/132 (~68.9%).',
    companyTags: ['Goldman Sachs', 'Intel'],
  },
  {
    id: 'cod-1',
    category: 'Coding',
    subTopic: 'Arrays & Two Pointers',
    difficulty: 'Easy',
    question: 'Given an array of integers `nums` and an integer `target`, what is the time complexity of the optimal Hash Map approach to find two numbers that sum to target?',
    codeSnippet: 'function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
    options: ['O(N) time and O(N) space', 'O(N log N) time and O(1) space', 'O(N^2) time and O(1) space', 'O(1) time and O(N) space'],
    correctIndex: 0,
    explanation: 'A single pass with hash lookup provides O(1) average lookup per element, giving O(N) linear time and O(N) auxiliary memory for the map.',
    companyTags: ['Google', 'Meta', 'Amazon'],
  },
  {
    id: 'cod-2',
    category: 'Coding',
    subTopic: 'Trees & Recursion',
    difficulty: 'Medium',
    question: 'In a Binary Search Tree (BST), what traversal sequence produces values in strictly sorted ascending order?',
    options: ['In-order (Left, Root, Right)', 'Pre-order (Root, Left, Right)', 'Post-order (Left, Right, Root)', 'Level-order (BFS Breadth First)'],
    correctIndex: 0,
    explanation: 'By BST invariant properties, every node in left subtree is smaller than root, and every node in right is greater. Traversing Left -> Root -> Right (In-order) visits nodes in non-decreasing order.',
    companyTags: ['Microsoft', 'Apple'],
  },
  {
    id: 'tech-1',
    category: 'Technical',
    subTopic: 'Operating Systems & Concurrency',
    difficulty: 'Medium',
    question: 'Which of the following conditions is NOT one of the 4 Coffman conditions required for a deadlock to occur?',
    options: ['Preemptive Scheduling', 'Mutual Exclusion', 'Hold and Wait', 'Circular Wait'],
    correctIndex: 0,
    explanation: 'The 4 Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If the OS supports Preemptive Scheduling, deadlock can be prevented.',
    companyTags: ['Intel', 'Qualcomm', 'AMD'],
  },
  {
    id: 'tech-2',
    category: 'Technical',
    subTopic: 'Database Systems & Indexing',
    difficulty: 'Hard',
    question: 'Why do relational databases (PostgreSQL, MySQL) typically use B+ Trees rather than standard Binary Search Trees or Hash tables for disk-based table indexes?',
    options: ['High branching factor minimizes disk I/O and supports fast range queries', 'B+ Trees have O(1) average lookup on all keys', 'B+ Trees consume zero disk storage space', 'BSTs cannot store string values'],
    correctIndex: 0,
    explanation: 'B+ trees have large node capacities (high fan-out), keeping tree depth small (typically 3-4 levels for millions of rows), drastically minimizing disk block reads. Linked leaves also allow efficient range scans (BETWEEN / inequalities).',
    companyTags: ['Amazon', 'Oracle', 'Snowflake'],
  },
  {
    id: 'comm-1',
    category: 'Communication',
    subTopic: 'Behavioral & STAR Structure',
    difficulty: 'Medium',
    question: 'When asked "Tell me about a time you had a disagreement with a team member during an ASU group project", what is the most effective STAR strategy?',
    options: [
      'Focus on objective project goals, data-driven compromise, and measurable project outcome',
      'Explain in detail why the team member was mistaken and you were right',
      'Say you never have disagreements because you always agree with everyone',
      'Complain about how difficult freshman engineering group assignments are'
    ],
    correctIndex: 0,
    explanation: 'Recruiters look for emotional maturity, listening skills, consensus building, and focus on team results over individual ego using concrete Situation, Task, Action, and Result.',
    companyTags: ['Google', 'Amazon', 'McKinsey'],
  },
];

export const MOCK_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: 'mq-1',
    role: 'First-Year Student / Intern',
    type: 'Behavioral (STAR)',
    prompt: 'Please introduce yourself.',
    context: 'First-time interview icebreaker. Evaluates confidence, academic background, key interests, and enthusiasm.',
    keyEvaluationPoints: [
      'Warm greeting and clear mention of name and university major',
      'Brief academic context (first-semester CS / engineering student at ASU)',
      'Key technical interests and hands-on projects or hobbies',
      'Enthusiastic and polite delivery without verbal fillers',
    ],
    sampleModelAnswer: 'Hi Sarah, thank you for having me. My name is Devin Chen and I am a first-semester Computer Science student at Arizona State University. I am passionate about software engineering, especially web development and problem-solving with algorithms. This semester, I built a responsive web application for ASU students and have been actively practicing coding fundamentals in JavaScript and Python. I am eager to learn, contribute to engineering projects, and develop my technical skills.',
  },
  {
    id: 'mq-2',
    role: 'First-Year Student / Intern',
    type: 'Technical',
    prompt: 'What are your skills and experience?',
    context: 'Skills and Foundation Overview. Evaluates knowledge of programming languages, tools, coursework, and practical projects.',
    keyEvaluationPoints: [
      'Core programming languages (e.g., JavaScript, Python, C++)',
      'Web technologies or tools (e.g., HTML, CSS, React, Git version control)',
      'Coursework and practical project experience from school or personal interest',
      'Willingness to learn new frameworks and technologies',
    ],
    sampleModelAnswer: 'My primary programming languages are JavaScript, Python, and C++. On the web development side, I have experience with React, Tailwind CSS, and HTML5. In my first semester coursework at ASU, I have gained a solid grounding in object-oriented programming, basic data structures, and Git for version control. Practically, I have applied these skills by developing frontend interfaces for campus tools and collaborating on peer coding exercises.',
  },
  {
    id: 'mq-3',
    role: 'First-Year Student / Intern',
    type: 'Campus Specific',
    prompt: 'Why are you interested in pursuing a career in software engineering?',
    context: 'Motivation & Passion Check. Tests curiosity, problem-solving drive, and career interest.',
    keyEvaluationPoints: [
      'Curiosity about how software works and solves real problems',
      'Enjoyment of the coding and building process',
      'Long-term enthusiasm for technology and continuous learning',
    ],
    sampleModelAnswer: 'I chose software engineering because I love turning an idea into working software that solves real everyday problems. Ever since writing my first program, seeing code come to life on the screen and knowing it can help people has been deeply exciting to me. In university, I want to build a strong foundation in computer systems and algorithms so I can develop high-impact, dependable applications.',
  },
  {
    id: 'mq-4',
    role: 'First-Year Student / Intern',
    type: 'Behavioral (STAR)',
    prompt: 'Tell me about a project you worked on recently and what you learned from it.',
    context: 'Project Walkthrough. Evaluates ability to explain what was built and articulate personal takeaways.',
    keyEvaluationPoints: [
      'Clear explanation of what the project does and technologies used',
      'Your individual role and contributions',
      'Key lesson or technical takeaway learned from the experience',
    ],
    sampleModelAnswer: 'Recently in my coursework, I teamed up with classmates to build a campus study group finder. We used React for the frontend and Git for version control. My main task was building the clean user interface and search filtering. Through this project, I learned the importance of modular components and clear communication when merging code branches with teammates.',
  },
  {
    id: 'mq-5',
    role: 'First-Year Student / Intern',
    type: 'Campus Specific',
    prompt: 'What are your learning goals for this semester at ASU?',
    context: 'Goal Setting & Growth Mindset. Evaluates ambition, self-awareness, and focus.',
    keyEvaluationPoints: [
      'Specific academic and technical milestones for first semester',
      'Focus on mastering data structures and regular coding practice',
      'Engagement in student clubs, hackathons, or engineering communities',
    ],
    sampleModelAnswer: 'My top goals this semester are to maintain a strong GPA in my core programming courses, master foundational data structures like linked lists and trees, and build two full portfolio projects. I also plan to participate in my first ASU SunHacks hackathon and practice coding problems regularly on PlacePrep to prepare early for summer internship interviews.',
  },
];

export const PEER_PROBLEMS: PeerCodingProblem[] = [
  {
    id: 'prob-1',
    title: 'ASU Sun Devil Shuttle Dispatch',
    difficulty: 'Medium',
    acceptanceRate: '68%',
    description: 'You are given an array of interval pairs `intervals` representing shuttle arrival and departure times at Tempe Transit Center. Determine the minimum number of shuttle bays required so that no shuttle is delayed waiting for an open dock.',
    examples: [
      {
        input: 'intervals = [[900, 930], [915, 945], [930, 1000]]',
        output: '2',
        explanation: 'At 9:20, shuttles 1 and 2 overlap, requiring 2 bays. Shuttle 1 departs at 9:30 just as shuttle 3 arrives.',
      },
      {
        input: 'intervals = [[800, 830], [835, 900]]',
        output: '1',
        explanation: 'No overlapping time slots; 1 bay is sufficient.',
      },
    ],
    starterCode: {
      javascript: `function minShuttleBays(intervals) {\n  // intervals: number[][]\n  // Return minimum number of concurrent bays needed\n  if (!intervals.length) return 0;\n  const starts = intervals.map(x => x[0]).sort((a, b) => a - b);\n  const ends = intervals.map(x => x[1]).sort((a, b) => a - b);\n  let bays = 0, maxBays = 0, endPtr = 0;\n  for (let i = 0; i < starts.length; i++) {\n    if (starts[i] < ends[endPtr]) {\n      bays++;\n      maxBays = Math.max(maxBays, bays);\n    } else {\n      endPtr++;\n    }\n  }\n  return maxBays;\n}`,
      python: `def minShuttleBays(intervals):\n    # intervals: List[List[int]]\n    # Return minimum bays needed\n    starts = sorted([x[0] for x in intervals])\n    ends = sorted([x[1] for x in intervals])\n    bays = 0\n    max_bays = 0\n    end_ptr = 0\n    for s in starts:\n        if s < ends[end_ptr]:\n            bays += 1\n            max_bays = max(max_bays, bays)\n        else:\n            end_ptr += 1\n    return max_bays`,
    },
    testCases: [
      { input: '[[900, 930], [915, 945], [930, 1000]]', expected: '2' },
      { input: '[[800, 830], [835, 900]]', expected: '1' },
      { input: '[[100, 200], [110, 210], [120, 220], [130, 230]]', expected: '4' },
    ],
  },
  {
    id: 'prob-2',
    title: 'Valid ASU Course Code Hierarchy',
    difficulty: 'Easy',
    acceptanceRate: '84%',
    description: 'Given a string containing course prerequisite groupings using parentheses `()`, brackets `[]`, and braces `{}`, verify if the prerequisite nesting syntax is balanced and valid.',
    examples: [
      {
        input: 's = "{CSE110, [MAT265]}"',
        output: 'true',
      },
      {
        input: 's = "{CSE110, [MAT265)}"',
        output: 'false',
      },
    ],
    starterCode: {
      javascript: `function isValidPrereq(s) {\n  const stack = [];\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  for (const ch of s) {\n    if (ch === '(' || ch === '[' || ch === '{') {\n      stack.push(ch);\n    } else if (pairs[ch]) {\n      if (stack.pop() !== pairs[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `def isValidPrereq(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0`,
    },
    testCases: [
      { input: '"{CSE110, [MAT265]}"', expected: 'true' },
      { input: '"{CSE110, [MAT265)}"', expected: 'false' },
      { input: '"()[]{}"', expected: 'true' },
    ],
  },
];

export const STUDY_TRACKS: StudyTrack[] = [
  {
    id: 'track-bigtech-swe',
    title: 'Big Tech Software Engineering (SDE)',
    category: 'Software Engineering',
    description: 'Targeted for Amazon, Google, Microsoft, and Meta campus hiring. Aligned with ASU CSE 110/205/310 course sequence.',
    recommendedFor: 'Freshmen & Sophomores targeting Summer 2026/2027 internships',
    totalWeeks: 12,
    completedPercent: 58,
    partnerCompanies: ['Amazon', 'Google', 'Microsoft', 'Uber'],
    modules: [
      {
        id: 'm1',
        title: 'Algorithmic Foundations & Complexity (Big-O)',
        duration: '2 Weeks',
        description: 'Time and space complexity analysis, asymptotic bounds, memory stack vs heap allocations in Java/C++.',
        topics: ['Master Theorem', 'Space Analysis', 'Sorting Runtimes', 'Recursion Trees'],
        completed: true,
        industryAlignment: 'Standard Bar Raiser baseline for Amazon SDE 1',
        resourceCount: 8,
      },
      {
        id: 'm2',
        title: 'Core Data Structures (Lists, Stacks, Queues, Hash Tables)',
        duration: '3 Weeks',
        description: 'Implement low-level hash maps, collision resolution, circular buffers, and monotonic stack patterns.',
        topics: ['HashMap collision strategies', 'Monotonic stacks', 'LRU cache principles'],
        completed: true,
        industryAlignment: 'Google Phone Screen question pattern 1',
        resourceCount: 14,
      },
      {
        id: 'm3',
        title: 'Trees, Graphs & Traversal Mastery (BFS/DFS)',
        duration: '4 Weeks',
        description: 'Binary trees, lowest common ancestor, topological sort, Dijkstra shortest path on weighted graphs.',
        topics: ['Inorder/Preorder reconstruction', 'Cycle detection', 'Bipartite matching'],
        completed: false,
        industryAlignment: 'Microsoft Onsite Technical Round core requirement',
        resourceCount: 19,
      },
      {
        id: 'm4',
        title: 'System Principles & Object-Oriented Design',
        duration: '3 Weeks',
        description: 'SOLID design principles, design patterns (Factory, Strategy, Observer), concurrency locks.',
        topics: ['Design Parking Lot', 'Deadlock avoidance', 'Thread pools'],
        completed: false,
        industryAlignment: 'Meta campus design interview',
        resourceCount: 11,
      },
    ],
  },
  {
    id: 'track-silicon-systems',
    title: 'ASU Semiconductor & Embedded Systems',
    category: 'Systems & Hardware',
    description: 'Targeted for Arizona semiconductor corridor (Intel Chandler, Microchip, Qualcomm, TSMC Phoenix).',
    recommendedFor: 'CS & Computer Systems Engineering majors interested in low-level systems',
    totalWeeks: 10,
    completedPercent: 35,
    partnerCompanies: ['Intel', 'Microchip Technology', 'Qualcomm', 'TSMC'],
    modules: [
      {
        id: 's1',
        title: 'C/C++ Memory Management & Pointers',
        duration: '2 Weeks',
        description: 'Pointer arithmetic, memory leaks, Valgrind profiling, dynamic memory allocation vs stack buffers.',
        topics: ['Double pointers', 'Memory alignment', 'Segmentation faults'],
        completed: true,
        industryAlignment: 'Intel Firmware Intern technical screening',
        resourceCount: 9,
      },
      {
        id: 's2',
        title: 'Operating System Internals & Linux Kernel',
        duration: '3 Weeks',
        description: 'Virtual memory pages, TLB misses, interrupts, POSIX pthreads, and synchronization mutexes.',
        topics: ['Page replacement algorithms', 'Spinlocks vs semaphores', 'Context switching'],
        completed: false,
        industryAlignment: 'Qualcomm Systems Intern requirement',
        resourceCount: 12,
      },
      {
        id: 's3',
        title: 'Hardware-Software Interface & Embedded Protocols',
        duration: '3 Weeks',
        description: 'UART, SPI, I2C bus communications, registers, DMA, interrupt service routines (ISR).',
        topics: ['Clock cycles', 'Bitwise masking', 'Hardware interrupts'],
        completed: false,
        industryAlignment: 'Microchip Chandler design center',
        resourceCount: 15,
      },
    ],
  },
  {
    id: 'track-ai-ml',
    title: 'Applied AI & Machine Learning Engineering',
    category: 'AI & Data Science',
    description: 'Mathematical foundations, PyTorch, feature engineering, and LLM application deployment.',
    recommendedFor: 'Students planning honors thesis or applied AI roles',
    totalWeeks: 12,
    completedPercent: 42,
    partnerCompanies: ['NVIDIA', 'Amazon AWS', 'Apple', 'OpenAI'],
    modules: [
      {
        id: 'ai1',
        title: 'Linear Algebra & Calculus for Machine Learning',
        duration: '3 Weeks',
        description: 'Matrix decompositions (SVD, Eigenvalues), gradient descent, vector calculus, and backpropagation.',
        topics: ['Chain rule', 'Jacobian matrices', 'Convex optimization'],
        completed: true,
        industryAlignment: 'Essential foundation for ML research & evaluation',
        resourceCount: 11,
      },
      {
        id: 'ai2',
        title: 'Supervised & Unsupervised Modeling',
        duration: '4 Weeks',
        description: 'Regression, Decision Trees, Random Forests, XGBoost, Clustering, and Evaluation Metrics (F1, AUC-ROC).',
        topics: ['Bias-Variance tradeoff', 'Overfitting prevention', 'Hyperparameter tuning'],
        completed: false,
        industryAlignment: 'Standard Data Science take-home assessment',
        resourceCount: 16,
      },
      {
        id: 'ai3',
        title: 'Deep Learning & Modern Generative AI',
        duration: '5 Weeks',
        description: 'Transformer architectures, Attention mechanisms, Embedding search, RAG pipelines with Vector DBs.',
        topics: ['Self-attention', 'Vector embeddings', 'Quantization'],
        completed: false,
        industryAlignment: 'Modern Big Tech GenAI engineering roles',
        resourceCount: 22,
      },
    ],
  },
];

export const PERSONALIZED_PLAN: PlanItem[] = [
  {
    id: 'plan-1',
    day: 1,
    title: 'Dynamic Programming: 1D Memoization Patterns',
    pillar: 'Coding',
    estimatedMinutes: 45,
    completed: true,
    priority: 'High',
    actionType: 'code',
  },
  {
    id: 'plan-2',
    day: 2,
    title: 'Aptitude Speed Drill: Permutations & Probability',
    pillar: 'Aptitude',
    estimatedMinutes: 30,
    completed: true,
    priority: 'High',
    actionType: 'test',
  },
  {
    id: 'plan-3',
    day: 3,
    title: 'Mock Interview Session: Behavioral STAR Response Recording',
    pillar: 'Communication',
    estimatedMinutes: 25,
    completed: false,
    priority: 'Medium',
    actionType: 'interview',
  },
  {
    id: 'plan-4',
    day: 4,
    title: 'OS Virtual Memory & Page Fault Diagnostics Review',
    pillar: 'Technical',
    estimatedMinutes: 40,
    completed: false,
    priority: 'High',
    actionType: 'read',
  },
  {
    id: 'plan-5',
    day: 5,
    title: '1v1 Peer Coding Duel: Sliding Window & Two Pointers',
    pillar: 'Coding',
    estimatedMinutes: 30,
    completed: false,
    priority: 'Medium',
    actionType: 'code',
  },
  {
    id: 'plan-6',
    day: 6,
    title: 'Resume Keyword Gap Analysis: Amazon SDE Intern Matching',
    pillar: 'Communication',
    estimatedMinutes: 20,
    completed: false,
    priority: 'Routine',
    actionType: 'read',
  },
  {
    id: 'plan-7',
    day: 7,
    title: 'Adaptive Comprehensive Placement Simulation (60 mins)',
    pillar: 'Aptitude',
    estimatedMinutes: 60,
    completed: false,
    priority: 'High',
    actionType: 'test',
  },
];

export const INITIAL_RESUME_TEXT = `DEVIN CHEN
Tempe, AZ · devin.chen@asu.edu · linkedin.com/in/devin-chen-asu · github.com/devinchen-asu

EDUCATION
Arizona State University, Barrett The Honors College — Tempe, AZ
Bachelor of Science in Computer Science | Minor in Mathematics
Expected Graduation: May 2028 | Cumulative GPA: 3.88 / 4.00
Relevant Coursework: Principles of Programming with Java, Data Structures & Algorithms (CSE 205), Calculus for Engineers I-II, Discrete Mathematics (MAT 243)

TECHNICAL SKILLS
Languages: Java, Python, TypeScript/JavaScript, C++, SQL, HTML5/CSS3
Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, JUnit, NumPy
Developer Tools: Git, GitHub, Docker, Postman, Linux/Unix CLI, VS Code

PROJECTS
ASU Campus Dining & Shuttle Tracker (Full-Stack Web App) | Sept 2026 - Nov 2026
• Built a responsive web app used by over 350 ASU freshmen to track campus shuttles in real-time.
• Implemented client-side caching mechanism that reduced server API calls by 74%.
• Created interactive maps with route markers and live schedule countdown notifications.

Algorithmic Trading Backtester | Aug 2026 - Oct 2026
• Developed a Python script to simulate moving-average crossover strategies on S&P 500 historical data.
• Processed 5 years of daily pricing data utilizing Pandas and NumPy, achieving sub-second backtest execution.
• Plotted risk-reward metrics including Sharpe Ratio, maximum drawdown, and portfolio annualized returns.

CAMPUS LEADERSHIP & ACHIEVEMENTS
• Fulton Ambassador: Represented Ira A. Fulton Schools of Engineering at Fall 2026 open houses for prospective students.
• Dean's List: Ira A. Fulton Schools of Engineering (Fall 2026)
• ASU SunHacks 2026: Top 10 Finalist among 120 collegiate project submissions.`;
