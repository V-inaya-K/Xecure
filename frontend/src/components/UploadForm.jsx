import React, { useState } from "react";
import client from "../api/client";

function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return alert("Select an image first");

    setLoading(true);
    try {
      const imageBase64 = await toBase64(file);

      const response = await client.post("/cases/analyze", {
        title,
        imageBase64,
      });

      onResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-slate-900 rounded-xl border border-slate-800"
    >
      <h2 className="text-lg font-semibold">Upload image for analysis</h2>

      <input
        type="text"
        placeholder="Case title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-sky-500 file:text-white hover:file:bg-sky-600"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-sm font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </form>
  );
}

export default UploadForm;
