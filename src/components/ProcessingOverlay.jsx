import React, { useEffect, useState } from 'react';
import './ProcessingOverlay.css';

const ProcessingOverlay = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const steps = [
        "Analyzing Revenue Metrics...",
        "Benchmarking Growth Trajectory...",
        "Evaluating Unit Economics...",
        "Calculating Market Multiples...",
        "Finalizing Valuation Model..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return prev;
                }
                return prev + 1;
            });
        }, 800); // 800ms per step

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="processing-overlay">
            <div className="processing-content">
                <div className="spinner"></div>
                <h3>AI Analysis in Progress</h3>
                <div className="step-container">
                    <p className="current-step">{steps[step]}</p>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingOverlay;
