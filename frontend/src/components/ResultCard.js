import React from "react";

export default function ResultCard({ result }) {
  const { prediction, probability_raw, confidence, threshold } = result;
  const isDanger = prediction === "Melanoma";

  return (
    <div className={`result ${isDanger ? "danger" : "safe"}`}>
      <h2>{isDanger ? "⚠️ Melanoma Suspected" : "✅ Non-Melanoma"}</h2>
      <p className="big">
        Confidence: <strong>{(confidence * 100).toFixed(1)}%</strong>
      </p>

      <div className="details">
        <div><strong>Raw probability:</strong> {probability_raw.toFixed(4)}</div>
        <div><strong>Threshold used:</strong> {threshold}</div>
      </div>

      <div className="advice">
        {isDanger ? (
          <p>
            The model flags this image as potentially malignant. <strong>Seek medical evaluation</strong>.
          </p>
        ) : (
          <p>
            Low likelihood of melanoma according to the model, but if you are concerned, please see a clinician.
          </p>
        )}
      </div>
    </div>
  );
}
