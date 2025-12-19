import React, { useState } from "react";
import { uploadImage } from "./api";
import ResultCard from "./components/ResultCard";
import UploadForm from "./components/UploadForm";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSubmit = async (file) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await uploadImage(file);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="inner">
          <h1>Melanoma Detector</h1>
          <p className="tagline">
            Upload a skin lesion photo — get a prediction (Melanoma / Non-Melanoma).
          </p>
        </div>
      </header>

      <main className="container">
        <section className="card upload-card">
          <UploadForm onSubmit={handleFileSubmit} loading={loading} />
        </section>

        {loading && (
          <section className="card">
            <div className="center">Analyzing image… Please wait.</div>
          </section>
        )}

        {error && (
          <section className="card error">
            <div>{error}</div>
          </section>
        )}

        {result && (
          <section className="card">
            <ResultCard result={result} />
          </section>
        )}

        <section className="card info">
          <h3>Notes</h3>
          <ul>
            <li>This is a demo — always consult a clinician for diagnosis.</li>
            <li>Confidence is not a substitute for medical advice.</li>
            <li>
              To improve results, ensure the image is well-lit, in-focus, and the lesion fills most of the frame.
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div>Built with ❤️ — Model by your training pipeline</div>
      </footer>
    </div>
  );
}
