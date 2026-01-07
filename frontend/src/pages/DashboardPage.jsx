import React, { useState } from "react";
import UploadForm from "../components/UploadForm.jsx";
import ResultCard from "../components/ResultCard.jsx";

function DashboardPage({ goLanding }) {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="px-6 py-4 flex justify-between items-center border-b border-slate-800">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <button
          onClick={goLanding}
          className="px-3 py-1 text-sm rounded-md bg-slate-800 hover:bg-slate-700"
        >
          ← Back
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <UploadForm onResult={setAnalysisResult} />
          <ResultCard result={analysisResult} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
