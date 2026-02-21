import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Film, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const UploadTrailer = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (['video/mp4', 'video/quicktime', 'video/x-msvideo'].includes(selectedFile.type)) {
                setFile(selectedFile);
                setError('');
            } else {
                setFile(null);
                setError('Please select a valid video file (.mp4, .mov, .avi)');
            }
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        setUploading(true);
        setProgress(0);
        setError('');

        try {
            // Simulated upload progress since local to local is instant
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev + 10;
                    if (newProgress >= 90) clearInterval(progressInterval);
                    return newProgress > 90 ? 90 : newProgress;
                });
            }, 500);

            // Send to Express Backend
            const response = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            clearInterval(progressInterval);
            setProgress(100);

            // Navigate to the analysis page, passing the mock AI results via state
            setTimeout(() => {
                navigate('/analysis/latest', { state: { analysisData: response.data } });
            }, 1000);

        } catch (err) {
            setError(err.response?.data?.error || 'Error uploading file and contacting AI engine.');
            setUploading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="bento-card" style={{ gridColumn: 'span 12', padding: '48px 32px' }}>
                    <div className="text-center" style={{ marginBottom: '32px' }}>
                        <h2 className="section-title" style={{ fontSize: '2rem' }}>Analyze <span className="text-gradient">Trailer</span></h2>
                        <p className="text-muted">Upload your MP4 to generate audience personas.</p>
                    </div>

                    <form onSubmit={handleUpload}>
                        <div
                            style={{
                                border: `2px dashed ${file ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)'}`,
                                borderRadius: 'var(--radius-md)',
                                padding: '40px',
                                textAlign: 'center',
                                background: file ? 'rgba(0, 112, 243, 0.05)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative'
                            }}
                            onClick={() => document.getElementById('video-upload').click()}
                        >
                            <input
                                type="file"
                                id="video-upload"
                                accept=".mp4,.mov,.avi"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />

                            {file ? (
                                <div>
                                    <Film size={48} color="var(--accent-blue)" style={{ margin: '0 auto 16px' }} />
                                    <h4 style={{ color: '#fff' }}>{file.name}</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div>
                                    <Upload size={48} color="var(--text-secondary)" style={{ margin: '0 auto 16px' }} />
                                    <h4 style={{ color: '#fff', marginBottom: '8px' }}>Click to Upload or Drag and Drop</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>MP4, MOV, or AVI (Max 500MB)</p>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div style={{ marginTop: '16px', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '8px' }}>
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        {uploading && (
                            <div style={{ marginTop: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {progress === 100 ? 'Analysis Complete!' : 'Processing AI Embeddings...'}
                                    </span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{progress}%</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gradient-primary)', transition: 'width 0.3s ease' }}></div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '32px', padding: '16px' }}
                            disabled={!file || uploading}
                        >
                            {uploading ? 'Analyzing...' : 'Start Analysis'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadTrailer;
