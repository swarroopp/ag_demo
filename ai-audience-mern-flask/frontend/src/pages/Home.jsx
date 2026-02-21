import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UploadCloud, Cpu, Users, PieChart, Clapperboard, Target, Tv } from 'lucide-react';
import '../index.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-glow primary-glow"></div>
                    <div className="hero-glow secondary-glow"></div>
                    <div className="hero-grid"></div>
                </div>

                <div className="hero-content">
                    <div className="badge">
                        <span className="badge-dot pulse"></span>
                        <span>AI-Powered Audience Intelligence</span>
                    </div>

                    <h1 className="hero-title">
                        Know Exactly Where<br />
                        Your <span className="text-gradient">Audience</span> Lives.
                    </h1>

                    <p className="hero-subtitle">
                        Analyze your movie trailers using CLIP vectors. Compare against thousands of films, map digital communities, and target marketing with unprecedented precision.
                    </p>

                    <div className="hero-actions">
                        <Link to="/upload" className="btn btn-primary btn-lg">
                            Analyze Your Trailer
                            <ArrowRight className="icon-sm" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">From Trailer to <span className="text-gradient">Target Audience</span></h2>
                        <p className="section-subtitle">A seamless, AI-driven workflow designed for precision.</p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-icon-wrapper"><UploadCloud /></div>
                            <h3 className="step-title">1. Upload Trailer</h3>
                            <p className="step-desc">Upload your movie trailer in MP4 format. Our system processes visual and audio data.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-wrapper" style={{ color: 'var(--accent-purple)', background: 'rgba(121, 40, 202, 0.1)' }}><Cpu /></div>
                            <h3 className="step-title">2. AI Embedding</h3>
                            <p className="step-desc">We convert your trailer into CLIP vectors and compare it against existing films.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-wrapper" style={{ color: 'var(--accent-neon-blue)', background: 'rgba(0, 240, 255, 0.1)' }}><Users /></div>
                            <h3 className="step-title">3. Persona Generation</h3>
                            <p className="step-desc">By scraping discussions, we cluster audiences into living, breathing personas.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon-wrapper" style={{ color: 'var(--accent-neon-purple)', background: 'rgba(176, 38, 255, 0.1)' }}><PieChart /></div>
                            <h3 className="step-title">4. Platform Insights</h3>
                            <p className="step-desc">Get data on exactly which digital platforms your audience is most active on.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
