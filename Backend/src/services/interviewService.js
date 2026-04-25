const QUESTION_BANK = {
  python: [
    {
      level: "fresher",
      type: "single",
      question: "Which of these is an immutable Python data type?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      answer: "Tuple",
      explanation: "Tuple is immutable, while list, set, and dictionary are mutable.",
    },
    {
      level: "fresher",
      type: "multiple",
      question: "Select all valid Python web frameworks:",
      options: ["Django", "Flask", "Spring Boot", "FastAPI"],
      answer: ["Django", "Flask", "FastAPI"],
      explanation: "Django, Flask, and FastAPI are Python frameworks.",
    },
    {
      level: "fresher",
      type: "text",
      question: "What is the purpose of Python virtual environments?",
      keywords: ["dependency", "isolation", "project"],
      explanation:
        "Virtual environments isolate dependencies for each project to avoid conflicts.",
    },
    {
      level: "fresher",
      type: "single",
      question: "What is the output type of `range(5)` in Python 3?",
      options: ["List", "Tuple", "Range object", "Generator"],
      answer: "Range object",
      explanation: "`range()` returns a range object in Python 3.",
    },
    {
      level: "intermediate",
      type: "text",
      question: "How do list comprehensions improve code readability and performance?",
      keywords: ["compact", "readable", "loop", "faster"],
      explanation:
        "List comprehensions provide concise syntax and can be optimized over manual loops.",
    },
    {
      level: "intermediate",
      type: "single",
      question: "Which statement about Python decorators is correct?",
      options: [
        "They can modify function behavior",
        "They are only used for classes",
        "They replace inheritance entirely",
        "They cannot take arguments",
      ],
      answer: "They can modify function behavior",
      explanation: "Decorators wrap functions to extend behavior without changing core logic.",
    },
    {
      level: "intermediate",
      type: "multiple",
      question: "Select valid Python exception-handling keywords:",
      options: ["try", "catch", "except", "finally"],
      answer: ["try", "except", "finally"],
      explanation: "Python uses try/except/finally (not catch).",
    },
    {
      level: "advanced",
      type: "text",
      question: "Explain GIL and when it becomes a bottleneck.",
      keywords: ["global interpreter lock", "threads", "cpu", "parallel"],
      explanation:
        "GIL allows one thread to execute Python bytecode at a time and can limit CPU-bound threading.",
    },
    {
      level: "advanced",
      type: "single",
      question: "Which approach is generally better for CPU-bound Python tasks?",
      options: ["Threading", "Multiprocessing", "Async/await only", "Recursion only"],
      answer: "Multiprocessing",
      explanation:
        "Multiprocessing bypasses GIL limitations for CPU-heavy workloads.",
    },
    {
      level: "advanced",
      type: "text",
      question: "How would you design a scalable Python API service?",
      keywords: ["caching", "database", "queue", "load", "monitoring"],
      explanation:
        "A scalable API usually involves caching, efficient DB access, async/background tasks, and monitoring.",
    },
  ],
  mern: [
    {
      level: "fresher",
      type: "single",
      question: "In MERN, which part is primarily responsible for stateful UI rendering?",
      options: ["MongoDB", "Express", "React", "Node.js"],
      answer: "React",
      explanation: "React handles component-based UI and stateful rendering.",
    },
    {
      level: "fresher",
      type: "multiple",
      question: "Which of the following are typically backend responsibilities in MERN?",
      options: ["API routes", "DB schema design", "DOM animation", "Auth middleware"],
      answer: ["API routes", "DB schema design", "Auth middleware"],
      explanation:
        "Backend commonly handles routes, schema, and auth, not browser DOM animation.",
    },
    {
      level: "fresher",
      type: "text",
      question: "Explain one benefit of using MongoDB in a MERN project.",
      keywords: ["document", "json", "flexible", "schema"],
      explanation:
        "MongoDB stores JSON-like documents and is flexible for evolving app data models.",
    },
    {
      level: "fresher",
      type: "single",
      question: "Which HTTP method is commonly used to update an existing resource?",
      options: ["GET", "POST", "PUT", "OPTIONS"],
      answer: "PUT",
      explanation: "PUT (or PATCH) is used for updating an existing resource.",
    },
    {
      level: "intermediate",
      type: "text",
      question: "How do you secure JWT-based authentication in a MERN app?",
      keywords: ["http-only", "refresh", "expiry", "secret", "middleware"],
      explanation:
        "Use short-lived access tokens, secure refresh strategy, strong secrets, and middleware validation.",
    },
    {
      level: "intermediate",
      type: "multiple",
      question: "Which practices improve React performance?",
      options: ["Memoization", "Code splitting", "Huge unoptimized rerenders", "Lazy loading"],
      answer: ["Memoization", "Code splitting", "Lazy loading"],
      explanation:
        "Memoization, code splitting, and lazy loading help reduce unnecessary work.",
    },
    {
      level: "intermediate",
      type: "single",
      question: "What does Express middleware primarily do?",
      options: [
        "Render React components",
        "Process request/response pipeline",
        "Replace MongoDB indexes",
        "Compile TypeScript automatically",
      ],
      answer: "Process request/response pipeline",
      explanation:
        "Express middleware intercepts and handles request/response flow.",
    },
    {
      level: "advanced",
      type: "text",
      question: "How would you design a rate-limited, production-ready MERN API?",
      keywords: ["redis", "rate limit", "logging", "retry", "monitoring"],
      explanation:
        "Production APIs use rate-limiting, caching/stores like Redis, observability, and robust error handling.",
    },
    {
      level: "advanced",
      type: "single",
      question: "Best place to store long-lived sensitive secrets in production?",
      options: ["Frontend .env", "Git repository", "Secrets manager", "Browser localStorage"],
      answer: "Secrets manager",
      explanation:
        "Use secrets managers to protect sensitive values instead of client-side or git storage.",
    },
    {
      level: "advanced",
      type: "text",
      question: "How do you avoid N+1 query patterns with MongoDB/Mongoose?",
      keywords: ["populate", "aggregation", "index", "batch"],
      explanation:
        "Use proper schema design, indexes, aggregation pipelines, and carefully controlled population.",
    },
  ],
  java: [
    {
      level: "fresher",
      type: "single",
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      answer: "extends",
      explanation: "Java uses `extends` for class inheritance.",
    },
    {
      level: "fresher",
      type: "multiple",
      question: "Select all Java access modifiers:",
      options: ["public", "private", "protected", "internal"],
      answer: ["public", "private", "protected"],
      explanation:
        "`public`, `private`, and `protected` are standard Java access modifiers.",
    },
    {
      level: "fresher",
      type: "text",
      question: "What is JVM and why is it useful?",
      keywords: ["virtual machine", "bytecode", "platform"],
      explanation:
        "JVM executes Java bytecode and enables platform-independent execution.",
    },
    {
      level: "fresher",
      type: "single",
      question: "Which collection in Java does not allow duplicate elements?",
      options: ["List", "Map", "Set", "Queue"],
      answer: "Set",
      explanation: "Set implementations enforce uniqueness of elements.",
    },
    {
      level: "intermediate",
      type: "multiple",
      question: "Which are checked exceptions in Java?",
      options: ["IOException", "SQLException", "NullPointerException", "RuntimeException"],
      answer: ["IOException", "SQLException"],
      explanation:
        "Checked exceptions must be handled/declared; runtime exceptions are unchecked.",
    },
    {
      level: "intermediate",
      type: "single",
      question: "What is the main benefit of using interfaces in Java?",
      options: [
        "Direct memory management",
        "Multiple behavior contracts",
        "Faster bytecode always",
        "Avoid all inheritance",
      ],
      answer: "Multiple behavior contracts",
      explanation:
        "Interfaces define contracts and support flexible, decoupled designs.",
    },
    {
      level: "intermediate",
      type: "text",
      question: "Explain the difference between `HashMap` and `ConcurrentHashMap`.",
      keywords: ["thread", "concurrent", "synchronization", "performance"],
      explanation:
        "ConcurrentHashMap supports safer concurrent access with better scalability than synchronized maps.",
    },
    {
      level: "advanced",
      type: "text",
      question: "How would you optimize JVM performance in a high-throughput service?",
      keywords: ["heap", "gc", "profiling", "threads", "monitoring"],
      explanation:
        "Tune heap/GC, profile hotspots, optimize thread usage, and monitor runtime metrics.",
    },
    {
      level: "advanced",
      type: "single",
      question: "Which Spring concept helps separate cross-cutting concerns like logging?",
      options: ["AOP", "JPA", "Servlet", "JDBC Template"],
      answer: "AOP",
      explanation:
        "AOP is used for cross-cutting concerns such as logging, security, and transactions.",
    },
    {
      level: "advanced",
      type: "text",
      question: "How do you design fault-tolerant microservices in Java?",
      keywords: ["circuit breaker", "retry", "timeout", "fallback", "observability"],
      explanation:
        "Use resilience patterns like retries, circuit breakers, timeouts, and strong observability.",
    },
  ],
};

function normalizeStack(stack = "") {
  const lower = stack.toLowerCase().trim();
  if (lower.includes("mern")) return "mern";
  if (lower.includes("python")) return "python";
  if (lower.includes("java")) return "java";
  return "python";
}

function normalizeLevel(level = "") {
  const lower = level.toLowerCase().trim();
  if (lower.includes("fresher")) return "fresher";
  if (lower.includes("1-2")) return "intermediate";
  if (lower.includes("3+")) return "advanced";
  return "fresher";
}

function getQuestionSetForStack(stack, level) {
  const key = normalizeStack(stack);
  const normalizedLevel = normalizeLevel(level);
  const questions = QUESTION_BANK[key] || [];
  const exactLevel = questions.filter((question) => question.level === normalizedLevel);

  if (exactLevel.length >= 10) {
    return exactLevel.slice(0, 10);
  }

  const mixed = [
    ...exactLevel,
    ...questions.filter((question) => question.level !== normalizedLevel),
  ];

  return mixed.slice(0, 10);
}

function evaluateAnswer(question, userAnswerRaw) {
  const userAnswer = String(userAnswerRaw || "").trim();

  if (question.type === "single") {
    const isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
    return {
      status: isCorrect ? "correct" : "incorrect",
      feedback: isCorrect
        ? "Good answer 👍"
        : `Incorrect, here’s the correct explanation: ${question.explanation}`,
    };
  }

  if (question.type === "multiple") {
    const provided = userAnswer
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
      .sort();
    const expected = [...question.answer].map((item) => item.toLowerCase()).sort();

    const isCorrect =
      provided.length === expected.length &&
      provided.every((value, index) => value === expected[index]);

    return {
      status: isCorrect ? "correct" : "average",
      feedback: isCorrect
        ? "Good answer 👍"
        : `Fair, but you can improve. ${question.explanation}`,
    };
  }

  const normalized = userAnswer.toLowerCase();
  const matches = question.keywords.filter((keyword) => normalized.includes(keyword)).length;

  if (matches >= 2) {
    return { status: "correct", feedback: "Good answer 👍" };
  }
  if (matches === 1) {
    return {
      status: "average",
      feedback: `Fair, but you can improve. ${question.explanation}`,
    };
  }
  return {
    status: "incorrect",
    feedback: `Incorrect, here’s the correct explanation: ${question.explanation}`,
  };
}

function buildFinalReport(interviewState) {
  const total = interviewState.answers.length;
  const correct = interviewState.answers.filter((entry) => entry.evaluation === "correct").length;
  const incorrect = interviewState.answers.filter(
    (entry) => entry.evaluation === "incorrect"
  ).length;
  const average = interviewState.answers.filter((entry) => entry.evaluation === "average").length;

  return {
    totalQuestions: total,
    correct,
    incorrect,
    average,
    qaSummary: interviewState.answers.map((entry, index) => ({
      no: index + 1,
      question: entry.question,
      userAnswer: entry.userAnswer,
      evaluation: entry.evaluation,
      feedback: entry.feedback,
    })),
  };
}

module.exports = {
  getQuestionSetForStack,
  evaluateAnswer,
  buildFinalReport,
};
