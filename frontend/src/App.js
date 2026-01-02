import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/ProgramPage";
import TentangPage from "./pages/TentangPage";
import GaleriPage from "./pages/GaleriPage";
import KontakPage from "./pages/KontakPage";
import PendaftaranPage from "./pages/PendaftaranPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/pendaftaran" element={<PendaftaranPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
