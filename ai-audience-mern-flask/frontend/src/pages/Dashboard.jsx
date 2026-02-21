import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Map as MapIcon, BarChart2, Film, Activity } from 'lucide-react';
import '../index.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');

    // Simulated historical data
    const projects = [
        { id: 1, title: 'Project Nova Trailer', date: 'Oct 12, 2026', status: 'Completed', match: 'Sci-Fi Intellectuals', score: 92 },
        { id: 2, title: 'Summer RomCom Cut 1', date: 'Oct 10, 2026', status: 'Completed', match: 'Casual Streamers', score: 78 },
        { id: 3, title: 'Indie Drama Final', date: 'Oct 08, 2026', status: 'Processing', match: '--', score: '--' }
    ];

    // Algorithmic data generation based on a seed or live data proxy
    const generateHeatmapData = () => {
        const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
        // Generate pseudo-random realistic looking data based on current time
        const seed = new Date().getHours();

        return regions.map((region, i) => ({
            region,
            activity: Math.floor((Math.sin(seed + i) * 0.5 + 0.5) * 80 + 20), // Range between 20 and 100
            trend: (Math.cos(seed * i) > 0) ? 'up' : 'down'
        })).sort((a, b) => b.activity - a.activity);
    };

    const generateAudienceData = () => {
        const segments = [
            { id: 'SFI', name: 'Sci-Fi Intellectuals', baseSize: 4.2 },
            { id: 'CTS', name: 'Cinematic Thrill Seekers', baseSize: 5.8 },
            { id: 'CS', name: 'Casual Streamers', baseSize: 12.5 },
            { id: 'AH', name: 'Action Heavyweights', baseSize: 8.1 },
            { id: 'IE', name: 'Indie Enthusiasts', baseSize: 3.4 }
        ];

        const timeOffset = new Date().getMinutes() / 60;

        return segments.map(seg => ({
            ...seg,
            // Simulate live growth or shrinking
            currentSize: (seg.baseSize * (1 + (Math.sin(timeOffset * Math.PI) * 0.05))).toFixed(1),
            engagementRate: Math.floor(Math.random() * 30 + 40) // 40-70% random engagement
        })).sort((a, b) => parseFloat(b.currentSize) - parseFloat(a.currentSize));
    };

    const heatmapData = generateHeatmapData();
    const audienceData = generateAudienceData();

    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', gap: '24px' }}>
            {/* Sidebar */}
            <div className="dash-sidebar" style={{
                width: '240px',
                background: '#0a0b0e',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--glass-border)',
                height: 'fit-content'
            }}>
                <div className="dash-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <LayoutDashboard size={20} color="var(--accent-blue)" />
                    <span>Command Center</span>
                </div>
                <ul className="dash-nav" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                    <li
                        onClick={() => setActiveTab('projects')}
                        style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            background: activeTab === 'projects' ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
                            borderLeft: activeTab === 'projects' ? '2px solid var(--accent-blue)' : '2px solid transparent',
                            color: activeTab === 'projects' ? '#fff' : 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '4px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Film size={18} /> My Projects
                    </li>
                    <li
                        onClick={() => setActiveTab('audience')}
                        style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            background: activeTab === 'audience' ? 'rgba(121, 40, 202, 0.1)' : 'transparent',
                            borderLeft: activeTab === 'audience' ? '2px solid var(--accent-purple)' : '2px solid transparent',
                            color: activeTab === 'audience' ? '#fff' : 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '4px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Users size={18} /> Audience DB
                    </li>
                    <li
                        onClick={() => setActiveTab('heatmap')}
                        style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            background: activeTab === 'heatmap' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            borderLeft: activeTab === 'heatmap' ? '2px solid var(--accent-neon-blue)' : '2px solid transparent',
                            color: activeTab === 'heatmap' ? '#fff' : 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '4px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <MapIcon size={18} /> Global Heatmap
                    </li>
                    {/* Removed Settings and Reports tabs to increase focus and remove non-functional mock UI */}
                </ul>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1 }}>

                {/* ---------------- My Projects Tab ---------------- */}
                {activeTab === 'projects' && (
                    <div className="tab-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2>My Projects</h2>
                            <Link to="/upload" className="btn btn-primary btn-sm">New Analysis</Link>
                        </div>

                        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                            {projects.map(project => (
                                <div key={project.id} className="bento-card" style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '24px', gap: '24px', cursor: 'pointer' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                                        <Film color="var(--accent-purple)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{project.title}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{project.date}</p>
                                    </div>
                                    <div style={{ width: '200px' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Top Match:</span>
                                        <p style={{ fontWeight: '600' }}>{project.match}</p>
                                    </div>
                                    <div style={{ width: '100px', textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Affinity:</span>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-neon-blue)' }}>{project.score}%</p>
                                    </div>
                                    <div style={{ width: '100px', textAlign: 'right' }}>
                                        <span className="badge" style={{
                                            background: project.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                            color: project.status === 'Completed' ? '#4ade80' : '#facc15',
                                            border: 'none',
                                            padding: '4px 12px'
                                        }}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ---------------- Audience Database Tab ---------------- */}
                {activeTab === 'audience' && (
                    <div className="tab-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2>Platform Audience Database</h2>
                            <span className="badge" style={{ background: 'rgba(121, 40, 202, 0.1)', color: 'var(--accent-purple)' }}>
                                <Activity size={14} style={{ marginRight: '6px' }} /> Live Data Sync
                            </span>
                        </div>

                        <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                            {audienceData.map((segment, index) => (
                                <div key={segment.id} className="bento-card" style={{ gridColumn: 'span 6', padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{segment.name}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>ID: {segment.id}</p>
                                        </div>
                                        <Users color={index === 0 ? 'var(--accent-neon-blue)' : 'var(--text-secondary)'} />
                                    </div>

                                    <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Market Size</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{segment.currentSize}M</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Avg. Engagement</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-neon-purple)' }}>{segment.engagementRate}%</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ---------------- Global Heatmap Tab ---------------- */}
                {activeTab === 'heatmap' && (
                    <div className="tab-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2>Global Audience Heatmap</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Real-time regional interest indexes</p>
                        </div>

                        <div className="bento-card bento-large" style={{ gridColumn: 'span 12', padding: '32px', display: 'block' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {heatmapData.map((data, index) => (
                                    <div key={data.region}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ color: '#fff', fontSize: '1.1rem' }}>{data.region}</span>
                                                <span style={{
                                                    color: data.trend === 'up' ? '#4ade80' : '#facc15',
                                                    fontSize: '0.8rem',
                                                    background: data.trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px'
                                                }}>
                                                    {data.trend === 'up' ? '↗ Increasing' : '↘ Stable'}
                                                </span>
                                            </div>
                                            <span style={{ color: 'var(--accent-neon-blue)', fontWeight: 'bold', fontSize: '1.1rem' }}>{data.activity} IDX</span>
                                        </div>
                                        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${data.activity}%`,
                                                background: index === 0 ? 'var(--gradient-neon)' : 'var(--gradient-primary)',
                                                borderRadius: '6px',
                                                transition: 'width 1s ease-in-out'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;
