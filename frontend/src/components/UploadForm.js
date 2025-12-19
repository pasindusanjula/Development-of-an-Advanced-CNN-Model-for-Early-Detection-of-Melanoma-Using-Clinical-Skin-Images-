import React, { useRef, useState } from "react";

export default function UploadForm({ onSubmit, loading }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    if (!file) return alert("Please select an image.");
    onSubmit(file);
  };

  const clearPreview = () => {
    setPreview(null);
    fileRef.current.value = null;
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <label className="file-label">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>

      {preview ? (
        <div className="preview">
          <img src={preview} alt="preview" />
          <div className="preview-actions">
            <button type="button" onClick={clearPreview} className="btn ghost">
              Remove
            </button>
            <button type="submit" className="btn primary" disabled={loading}>
              Analyze Image
            </button>
          </div>
        </div>
      ) : (
        <div className="placeholder">
          <p>Choose an image of the lesion (jpg/png). Try to crop close to the lesion.</p>
          <button type="submit" className="btn primary" disabled={loading}>
            Analyze (no preview)
          </button>
        </div>
      )}
    </form>
  );
}
