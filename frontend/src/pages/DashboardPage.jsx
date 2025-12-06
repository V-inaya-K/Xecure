import React, { useState } from "react";
import UploadForm from "../components/UploadForm.jsx";
import ResultCard from "../components/ResultCard.jsx";

function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Image Fraud Detection Dashboard</h1>
        <p className="text-sm text-slate-400">
          Upload an image (damaged product, ID card, etc.) and get an AI-based
          authenticity and fraud risk analysis.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <UploadForm onResult={setAnalysisResult} />
        <ResultCard result={analysisResult} />
      </div>
    </div>
  );
}

export default DashboardPage;
