import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UploadTrailer from './pages/UploadTrailer';
import ProjectAnalysis from './pages/ProjectAnalysis';
import { Film } from 'lucide-react';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                {/* Global Navbar */}
                <nav className="navbar">
                    <div className="nav-container">
                        <Link to="/" className="logo">
                            <Film className="logo-icon" size={24} />
                            <span>Audience<span className="text-gradient">AI</span></span>
                        </Link>
                        <div className="nav-links">
                            <Link to="/upload">New Analysis</Link>
                            <Link to="/dashboard">Dashboard</Link>
                        </div>
                    </div>
                </nav>

                {/* Dynamic Page Content */}
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/upload" element={<UploadTrailer />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/analysis/:id" element={<ProjectAnalysis />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
