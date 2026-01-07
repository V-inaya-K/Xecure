import React, { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page === "landing" && (
        <LandingPage goDashboard={() => setPage("dashboard")} />
      )}

      {page === "dashboard" && (
        <DashboardPage goLanding={() => setPage("landing")} />
      )}
    </>
  );
}

export default App;
