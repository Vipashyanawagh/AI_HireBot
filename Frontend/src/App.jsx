import { useEffect, useMemo, useState } from "react";
const API_BASE = "/api/chat";

function MessageBubble({ item }) {
  const isUser = item.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "border-violet-400/45 bg-violet-500/15"
            : "border-blue-400/45 bg-blue-500/15"
        }`}
      >
        <p>{item.text}</p>
        {!!item.options?.length && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.options.map((option) => (
              <span
                key={option}
                className="rounded-full border border-white/30 px-2.5 py-1 text-[11px] text-slate-100"
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeOptions, setActiveOptions] = useState([]);
  const [report, setReport] = useState(null);
  const [bootError, setBootError] = useState("");

  const initializeSession = async () => {
    try {
      const response = await fetch(`${API_BASE}/session`, { method: "POST" });
      if (!response.ok) {
        throw new Error(`Session init failed: ${response.status}`);
      }
      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages([{ role: "bot", text: data.reply, options: data.options || [] }]);
      setBootError("");
      return data.sessionId;
    } catch (_error) {
      setBootError("Unable to connect to backend. Please make sure backend is running on port 5050.");
      return "";
    }
  };

  useEffect(() => {
    initializeSession();
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    let activeSessionId = sessionId;
    if (!activeSessionId) {
      activeSessionId = await initializeSession();
    }
    if (!activeSessionId) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setInput("");
    setActiveOptions([]);

    try {
      const response = await fetch(`${API_BASE}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: activeSessionId, message: messageText }),
      });
      if (!response.ok) {
        throw new Error(`Message failed: ${response.status}`);
      }
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply,
          options: data.options || [],
          questionType: data.questionType || "",
        },
      ]);
      if (data.options?.length) setActiveOptions(data.options);
      if (data.report) setReport(data.report);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong while sending your message. Please retry." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-[1.35fr_0.8fr]">
        <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
          <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h1 className="text-xl font-semibold">HireBot</h1>
              <p className="text-sm text-slate-300">Smart interview assistant with meaningful feedback</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs ${loading ? "border-indigo-300/40 bg-indigo-400/10 text-indigo-200" : "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"}`}>
              {loading ? "Typing..." : "Online"}
            </span>
          </header>

          {bootError && (
            <div className="mx-4 mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {bootError}
            </div>
          )}

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <MessageBubble key={`${item.role}-${index}`} item={item} />
            ))}
          </div>

          {!!activeOptions.length && (
            <div className="sticky bottom-16 z-10 flex flex-wrap gap-2 border-t border-slate-800 bg-slate-900/95 px-4 py-3 backdrop-blur">
              {activeOptions.map((option) => (
                <button
                  key={option}
                  className="rounded-full border border-indigo-400/50 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-100 transition hover:bg-indigo-500/20"
                  onClick={() => sendMessage(option)}
                  disabled={loading}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="sticky bottom-0 z-20 flex gap-2 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer or question..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm outline-none ring-indigo-500/50 placeholder:text-slate-400 focus:ring-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && canSend) sendMessage(input);
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!canSend}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </section>

        <aside className="h-full overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl backdrop-blur">
          <h2 className="text-lg font-semibold">Interview Report</h2>
          {!report && <p className="mt-2 text-sm text-slate-400">Your final report appears here after the mock interview.</p>}
          {report && (
            <div className="mt-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
                  <span className="text-xs text-slate-400">Total</span>
                  <strong className="block text-xl">{report.totalQuestions}</strong>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
                  <span className="text-xs text-slate-400">Correct</span>
                  <strong className="block text-xl">{report.correct}</strong>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
                  <span className="text-xs text-slate-400">Average</span>
                  <strong className="block text-xl">{report.average}</strong>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
                  <span className="text-xs text-slate-400">Incorrect</span>
                  <strong className="block text-xl">{report.incorrect}</strong>
                </div>
              </div>
              <div className="mt-3 grid gap-2">
                {report.qaSummary.map((item) => (
                  <article key={item.no} className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 text-sm">
                    <h3 className="font-medium">Q{item.no}. {item.question}</h3>
                    <p className="mt-1"><b>Your Answer:</b> {item.userAnswer}</p>
                    <p><b>Evaluation:</b> {item.evaluation}</p>
                    <p className="text-slate-300">{item.feedback}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
