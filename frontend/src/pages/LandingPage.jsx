import React from "react";

function LandingPage({ goDashboard }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="px-8 py-5 flex justify-between items-center border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
          Xecure
        </h1>

        <button
          onClick={goDashboard}
          className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 transition font-semibold text-sm"
        >
          Open Dashboard
        </button>
      </header>

      <section className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Prevent Fraud with{" "}
          <span className="text-sky-500">AI-Powered</span> Image Analysis
        </h2>

        <p className="max-w-2xl text-slate-300 text-lg mb-8">
          Detect AI-generated pictures, fake refund claims, image manipulation,
          and reused images using intelligent forensic technology.
        </p>

        <button
          onClick={goDashboard}
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 font-semibold text-lg"
        >
          Try It Now
        </button>
      </section>

      <footer className="py-4 text-center text-slate-500 text-sm border-t border-slate-800">
        © {new Date().getFullYear()} Xecure
      </footer>
    </div>
  );
}

export default LandingPage;
