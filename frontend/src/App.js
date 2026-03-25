import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,   // ✅ FIXED (ADDED IMPORT)
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement   // ✅ REQUIRED FOR PIE
);
const emotions = {
  happy: { emoji: "😄", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Happy" },
  sad: { emoji: "😢", color: "#60a5fa", bg: "rgba(96,165,250,0.12)", label: "Sad" },
  angry: { emoji: "😠", color: "#f87171", bg: "rgba(248,113,113,0.12)", label: "Angry" },
  anxious: { emoji: "😰", color: "#a78bfa", bg: "rgba(167,139,250,0.12)", label: "Anxious" },
  calm: { emoji: "😌", color: "#34d399", bg: "rgba(52,211,153,0.12)", label: "Calm" },
  excited: { emoji: "🤩", color: "#fb923c", bg: "rgba(251,146,60,0.12)", label: "Excited" },
};

const pulseRing = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  body {
    background: #0a0a0f;
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
  }
 
  .app-bg {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 80%, rgba(236,72,153,0.1) 0%, transparent 60%),
                #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
 
  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 480px;
    backdrop-filter: blur(20px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
  }
 
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(236,72,153,0.6), transparent);
  }
 
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.7rem;
    font-family: 'DM Mono', monospace;
    color: #818cf8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
 
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #818cf8;
    animation: blink 1.6s ease-in-out infinite;
  }
 
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
 
  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #f8fafc;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }
 
  h1 span {
    background: linear-gradient(135deg, #818cf8, #e879f9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
 
  .subtitle {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.35);
    margin-bottom: 2.5rem;
    font-weight: 400;
    letter-spacing: 0.01em;
  }
 
  .input-group {
    margin-bottom: 1.25rem;
  }
 
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-family: 'DM Mono', monospace;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.6rem;
  }
 
  .label-icon {
    font-size: 0.9rem;
  }
 
  input[type="number"] {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 0.875rem 1.25rem;
    font-size: 1.1rem;
    font-family: 'DM Mono', monospace;
    color: #f1f5f9;
    outline: none;
    transition: all 0.2s ease;
    -moz-appearance: textfield;
  }
 
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
 
  input[type="number"]:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.06);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }
 
  input[type="number"]::placeholder { color: rgba(255,255,255,0.18); }
 
  .range-hint {
    font-size: 0.68rem;
    font-family: 'DM Mono', monospace;
    color: rgba(255,255,255,0.2);
    margin-top: 0.4rem;
    padding-left: 2px;
  }
 
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    margin: 1.75rem 0;
  }
 
  .submit-btn {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
 
  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s ease;
  }
 
  .submit-btn:hover:not(:disabled)::after { background: rgba(255,255,255,0.08); }
  .submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
 
  .loader {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
 
  .loader-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: white;
    animation: bounce 0.8s ease-in-out infinite;
  }
 
  .loader-dot:nth-child(2) { animation-delay: 0.15s; }
  .loader-dot:nth-child(3) { animation-delay: 0.3s; }
 
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
    40% { transform: translateY(-6px); opacity: 1; }
  }
 
  .result-card {
    margin-top: 2rem;
    border-radius: 18px;
    padding: 1.75rem;
    border: 1px solid;
    animation: fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
 
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
 
  .result-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
 
  .result-emoji {
    font-size: 3rem;
    line-height: 1;
    filter: drop-shadow(0 4px 16px currentColor);
    animation: floatEmoji 3s ease-in-out infinite;
  }
 
  @keyframes floatEmoji {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
 
  .result-label-wrap {}
 
  .result-tag {
    font-size: 0.65rem;
    font-family: 'DM Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.6;
    margin-bottom: 4px;
  }
 
  .result-emotion {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
 
  .result-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
 
  .meta-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-family: 'DM Mono', monospace;
    color: rgba(255,255,255,0.55);
  }
 
  .meta-chip strong { color: rgba(255,255,255,0.85); }
 
  .error-box {
    margin-top: 1.5rem;
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.25);
    border-radius: 14px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    animation: fadeSlideUp 0.3s ease both;
  }
 
  .error-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
 
  .error-text {
    font-size: 0.82rem;
    color: #fca5a5;
    line-height: 1.5;
  }
 
  .error-text strong {
    display: block;
    font-size: 0.875rem;
    color: #f87171;
    margin-bottom: 2px;
  }
 
  @media (max-width: 500px) {
    .card { padding: 2rem 1.5rem; }
    h1 { font-size: 1.6rem; }
  }
`;

export default function EmotionPredictor() {
  const [heartRate, setHeartRate] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = pulseRing;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSubmit = async () => {
    if (!heartRate || !age) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Dynamic import of axios
      const axios = (await import("https://cdn.skypack.dev/axios")).default;
      const response = await axios.post("http://127.0.0.1:8000/predict", null, {
        params: { heart_rate: Number(heartRate), age: Number(age) },
      });

      const data = response.data;
      console.log("API RESPONSE:", data);
      setResult(data);
      setHistory((prev) => [
        ...prev,
        {
          emotion: data.predicted_emotion,
          confidence: data.confidence,
        },
      ]);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to reach prediction server.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const emotionKey = result?.predicted_emotion?.toLowerCase();
  const emotionData = emotions[emotionKey] || {
    emoji: "🤖",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    label: result?.predicted_emotion || "Unknown",
  };

  const isValid = heartRate !== "" && age !== "" && Number(heartRate) > 0 && Number(age) > 0;
  const chartData = {
    labels: ["Heart Rate", "Age"],
    datasets: [
      {
        label: "User Input",
        data: [Number(heartRate), Number(age)],
      },
    ],
  };
  const historyChartData = {
    labels: history.map((item, index) => `${index + 1} - ${item.emotion}`),
    datasets: [
      {
        label: "Confidence %",
        data: history.map((item) =>
          (item.confidence * 100).toFixed(1)
        ),
      },
    ],
  };
  const emotionCount = {};

  history.forEach((item) => {
    emotionCount[item.emotion] = (emotionCount[item.emotion] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(emotionCount),
    datasets: [
      {
        data: Object.values(emotionCount),
        backgroundColor: [
          "#f59e0b", // happy
          "#60a5fa", // sad
          "#f87171", // angry
          "#a78bfa", // anxious
          "#34d399", // calm
          "#fb923c", // excited
        ],
      },
    ],
  };

  return (
    <div className="app-bg">
      <div className="card">
        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" />
          Neural Model v2.1
        </div>

        {/* Heading */}
        <h1>
          AI <span>Emotion</span>
          <br />Prediction System
        </h1>
        <p className="subtitle">
          Biometric analysis powered by machine learning
        </p>

        {/* Heart Rate */}
        <div className="input-group">
          <label>
            <span className="label-icon">💓</span>
            Heart Rate
          </label>
          <input
            type="number"
            placeholder="e.g. 72"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            min={30}
            max={220}
          />
          <div className="range-hint">Normal range: 60–100 bpm</div>
        </div>

        {/* Age */}
        <div className="input-group">
          <label>
            <span className="label-icon">🧬</span>
            Age
          </label>
          <input
            type="number"
            placeholder="e.g. 28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
            max={120}
          />
          <div className="range-hint">Accepted range: 1–120 years</div>
        </div>

        <div className="divider" />

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading || !isValid}
        >
          {loading ? (
            <span className="loader">
              <span className="loader-dot" />
              <span className="loader-dot" />
              <span className="loader-dot" />
            </span>
          ) : (
            "Analyze Emotion →"
          )}
        </button>

        {/* Result */}
        {result && (
          <div
            className="result-card"
            style={{
              background: emotionData.bg,
              borderColor: `${emotionData.color}40`,
            }}
          >
            <div className="result-top">
              <div className="result-emoji">{emotionData.emoji}</div>
              <div className="result-label-wrap">
                <div className="result-tag" style={{ color: emotionData.color }}>
                  Predicted Emotion
                </div>
                <div className="result-emotion" style={{ color: emotionData.color }}>
                  {emotionData.label}
                </div>
              </div>
            </div>

            <div className="result-meta">
              <div className="meta-chip">
                💓 Heart Rate: <strong>{heartRate} bpm</strong>
              </div>
              <div className="meta-chip">
                🧬 Age: <strong>{age} yrs</strong>
              </div>
              {result.confidence && (
                <div className="meta-chip">
                  📊 Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong>
                </div>
              )}
            </div>
            <div style={{ marginTop: "20px" }}>
              <Bar data={chartData} height={200} />
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "white", marginBottom: "10px" }}>
              📈 Prediction History
            </h3>

            <Bar data={historyChartData} height={200} />
          </div>
        )}
        {history.length > 0 && pieData.labels.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "white", marginBottom: "10px" }}>
              🧠 Emotion Distribution
            </h3>

            <Pie data={pieData} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-box">
            <span className="error-icon">⚠️</span>
            <div className="error-text">
              <strong>Prediction Failed</strong>
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}