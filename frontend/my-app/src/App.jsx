import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TestForms from "./pages/TestForms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test-forms" element={<TestForms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
