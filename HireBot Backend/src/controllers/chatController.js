const {
  createSession,
  getSession,
  updateSession,
} = require("../models/sessionStore");
const {
  getQuestionSetForStack,
  evaluateAnswer,
  buildFinalReport,
} = require("../services/interviewService");

function baseResponse(reply, extra = {}) {
  return { reply, ...extra };
}

function createSessionController(_req, res) {
  const { sessionId, state } = createSession();
  updateSession(sessionId, state);

  res.status(201).json({
    sessionId,
    ...baseResponse("Hello 👋 Welcome to HireBot! How are you today?"),
  });
}

function messageController(req, res) {
  const { sessionId, message } = req.body || {};

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required." });
  }

  const state = getSession(sessionId);
  if (!state) {
    return res.status(404).json({ error: "Session not found." });
  }

  const input = String(message || "").trim();

  if (state.stage === "WELCOME_NAME") {
    state.stage = "GET_NAME";
    updateSession(sessionId, state);
    return res.json(baseResponse("Please share your Full Name."));
  }

  if (state.stage === "GET_NAME") {
    state.user.fullName = input;
    state.stage = "GET_EMAIL";
    updateSession(sessionId, state);
    return res.json(baseResponse("Great! Please share your Email Address."));
  }

  if (state.stage === "GET_EMAIL") {
    state.user.email = input;
    state.stage = "GET_PHONE";
    updateSession(sessionId, state);
    return res.json(baseResponse("Thanks! Please share your Contact Number."));
  }

  if (state.stage === "GET_PHONE") {
    state.user.phone = input;
    state.stage = "CHOOSE_INTENT";
    updateSession(sessionId, state);
    return res.json(
      baseResponse("What would you like to do today?", {
        options: ["सामान्य चैट (Normal Chat / Query Help)", "Mock Interview"],
      })
    );
  }

  if (state.stage === "CHOOSE_INTENT") {
    if (input.toLowerCase().includes("mock")) {
      state.mode = "mock";
      state.stage = "INTERVIEW_STACK";
      updateSession(sessionId, state);
      return res.json(
        baseResponse(
          "Which technology stack do you want to be interviewed on? (e.g., Python, MERN, Java)"
        )
      );
    }

    state.mode = "chat";
    state.stage = "CHAT_MODE";
    updateSession(sessionId, state);
    return res.json(
      baseResponse(
        "You are in सामान्य चैट mode now. Ask me any query and I will help you clearly and friendly 😊"
      )
    );
  }

  if (state.stage === "CHAT_MODE") {
    return res.json(
      baseResponse(`Helpful answer: "${input}" is a great question. Let's break it down simply.`)
    );
  }

  if (state.stage === "INTERVIEW_STACK") {
    state.interview.stack = input;
    state.stage = "INTERVIEW_LEVEL";
    updateSession(sessionId, state);
    return res.json(
      baseResponse("What is your experience level? (Fresher / 1-2 years / 3+ years)")
    );
  }

  if (state.stage === "INTERVIEW_LEVEL") {
    state.interview.level = input;
    state.stage = "INTERVIEW_YEARS";
    updateSession(sessionId, state);
    return res.json(
      baseResponse("How many years of experience should the interview be based on?")
    );
  }

  if (state.stage === "INTERVIEW_YEARS") {
    state.interview.years = input;
    state.stage = "INTERVIEW_READY";
    updateSession(sessionId, state);
    return res.json(baseResponse("Ready to start your interview? (Yes/No)"));
  }

  if (state.stage === "INTERVIEW_READY") {
    if (!input.toLowerCase().startsWith("y")) {
      return res.json(baseResponse("No problem. Say 'Yes' whenever you are ready."));
    }

    state.interview.ready = true;
    state.interview.questionSet = getQuestionSetForStack(
      state.interview.stack,
      state.interview.level
    );
    state.interview.questionIndex = 0;
    state.stage = "INTERVIEW_ASKING";

    const firstQuestion = state.interview.questionSet[state.interview.questionIndex];
    state.interview.askedQuestions.push(firstQuestion.question);
    updateSession(sessionId, state);

    return res.json(
      baseResponse(`Interview started 🚀\nQ1. ${firstQuestion.question}`, {
        questionType: firstQuestion.type,
        options: firstQuestion.options || [],
      })
    );
  }

  if (state.stage === "INTERVIEW_ASKING") {
    const currentQuestion = state.interview.questionSet[state.interview.questionIndex];
    const result = evaluateAnswer(currentQuestion, input);

    state.interview.answers.push({
      question: currentQuestion.question,
      userAnswer: input,
      evaluation: result.status,
      feedback: result.feedback,
    });

    state.interview.questionIndex += 1;

    if (state.interview.questionIndex >= state.interview.questionSet.length) {
      state.stage = "INTERVIEW_COMPLETE";
      const report = buildFinalReport(state.interview);
      updateSession(sessionId, state);

      return res.json(
        baseResponse(
          `Interview completed ✅\n\nThank you for attending the interview session. 😊
Your feedback report will be shared soon via:
Email: ${state.user.email}
Contact: ${state.user.phone}
Please confirm if these details are correct.`,
          { feedback: result.feedback, report }
        )
      );
    }

    const nextQuestion = state.interview.questionSet[state.interview.questionIndex];
    state.interview.askedQuestions.push(nextQuestion.question);
    updateSession(sessionId, state);

    return res.json(
      baseResponse(`${result.feedback}\n\nQ${state.interview.questionIndex + 1}. ${nextQuestion.question}`, {
        questionType: nextQuestion.type,
        options: nextQuestion.options || [],
      })
    );
  }

  updateSession(sessionId, state);
  return res.json(baseResponse("Let's continue. Tell me how I can help."));
}

module.exports = {
  createSessionController,
  messageController,
};
