import React from "react";

function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-400">
        No result yet. Upload an image to see analysis.
      </div>
    );
  }

  const { caseId, result: aiResult } = result;

  if (!aiResult || !aiResult.success) {
    return (
      <div className="p-4 bg-slate-900 rounded-xl border border-red-500 text-sm text-red-300">
        Error analyzing image: {aiResult?.error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Analysis Result</h2>
        {caseId && (
          <span className="text-xs text-slate-400">Case ID: {caseId}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-slate-400">AI Probability</div>
          <div className="font-semibold">
            {(aiResult.ai_probability * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Manipulation Score</div>
          <div className="font-semibold">
            {(aiResult.manipulation_score * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Metadata Score</div>
          <div className="font-semibold">
            {(aiResult.metadata_score * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Similarity Score</div>
          <div className="font-semibold">
            {(aiResult.similarity_score * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="text-xs text-slate-400 mb-1">Final Risk</div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold">
            {(aiResult.final_risk_score * 100).toFixed(1)}%
          </div>
          <span className="text-xs uppercase px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
            {aiResult.label}
          </span>
        </div>
      </div>

      {aiResult.explanation && (
        <ul className="mt-3 text-xs text-slate-300 list-disc list-inside space-y-1">
          {aiResult.explanation.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultCard;
