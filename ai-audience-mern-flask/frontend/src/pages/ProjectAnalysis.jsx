import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart2, Map, Users, ArrowLeft } from 'lucide-react';
import '../index.css';

const ProjectAnalysis = () => {
    const location = useLocation();
    const { analysisData } = location.state || {};

    if (!analysisData) {
        return (
            <div className="section text-center">
                <h2>No analysis data found.</h2>
                <Link to="/upload" className="btn btn-primary" style={{ marginTop: '24px' }}>Start New Analysis</Link>
            </div>
        );
    }

    const { analysis, filename } = analysisData;

    return (
        <div className="section" style={{ paddingTop: '120px' }}>
            <div className="container">
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}><ArrowLeft /></Link>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '4px' }}>Analysis: {filename}</h2>
                        <span className="badge">Status: Complete</span>
                    </div>
                </div>

                <div className="bento-grid">
                    {/* Top Personas */}
                    <div className="bento-card bento-large" style={{ gridColumn: 'span 8', alignItems: 'flex-start' }}>
                        <div className="bento-content" style={{ width: '100%' }}>
                            <h3 className="bento-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users color="var(--accent-purple)" />
                                Dominant Audience Personas
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                                {analysis.topPersonas.map((persona, index) => (
                                    <div key={index} style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>{persona.name}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Active on: {persona.platforms.join(', ')}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '2rem', fontWeight: '800', color: index === 0 ? 'var(--accent-neon-blue)' : '#fff' }}>
                                                {persona.affinity}%
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Affinity Score</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Community Heatmap */}
                    <div className="bento-card" style={{ gridColumn: 'span 4' }}>
                        <h3 className="bento-title" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
                            <Map color="var(--accent-blue)" />
                            Platform Heatmap
                        </h3>

                        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {Object.entries(analysis.communityHeatmap).map(([platform, score]) => (
                                <div key={platform}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: '#fff' }}>{platform}</span>
                                        <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{score}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                                        <div style={{ height: '100%', width: `${score}%`, background: 'var(--gradient-primary)', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Semantic Vector Map Visualization (Static Mock Representation) */}
                    <div className="bento-card bento-large">
                        <div className="bento-content">
                            <h3 className="bento-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BarChart2 color="var(--accent-neon-purple)" />
                                Semantic Vector Map (CLIP)
                            </h3>
                            <p className="bento-desc">
                                Visualization of trailer embeddings clustered against historical success metrics and genre tropes.
                            </p>

                            <div style={{
                                width: '100%',
                                height: '300px',
                                background: 'radial-gradient(circle at center, rgba(121, 40, 202, 0.1) 0%, transparent 70%)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                position: 'relative',
                                marginTop: '24px'
                            }}>
                                {analysis.semanticVectors.map((vector, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        top: `${vector.y * 100}%`,
                                        left: `${vector.x * 100}%`,
                                        width: '12px',
                                        height: '12px',
                                        background: i === 0 ? 'var(--accent-neon-blue)' : '#fff',
                                        borderRadius: '50%',
                                        boxShadow: i === 0 ? '0 0 20px var(--accent-neon-blue)' : '0 0 10px rgba(255,255,255,0.5)',
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            top: '-25px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'rgba(0,0,0,0.8)',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            whiteSpace: 'nowrap',
                                            opacity: 0.8
                                        }}>
                                            {vector.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectAnalysis;
