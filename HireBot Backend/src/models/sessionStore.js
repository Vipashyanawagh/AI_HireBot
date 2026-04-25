const sessions = new Map();

function createSessionId() {
  return `session_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function getDefaultSessionState() {
  return {
    user: {
      fullName: "",
      email: "",
      phone: "",
    },
    stage: "WELCOME_NAME",
    mode: null,
    interview: {
      stack: "",
      level: "",
      years: "",
      ready: false,
      questionIndex: 0,
      answers: [],
      askedQuestions: [],
      questionSet: [],
    },
  };
}

function createSession() {
  const sessionId = createSessionId();
  sessions.set(sessionId, getDefaultSessionState());
  return { sessionId, state: sessions.get(sessionId) };
}

function getSession(sessionId) {
  return sessions.get(sessionId);
}

function updateSession(sessionId, nextState) {
  sessions.set(sessionId, nextState);
  return sessions.get(sessionId);
}

module.exports = {
  createSession,
  getSession,
  updateSession,
};
