import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { exportToPDF } from '../utils/pdfExport';
import { generateShareableLink, copyToClipboard } from '../utils/shareUtils';
import useAppStore from '../store/useAppStore';
import './ValuationDisplay.css';

const ValuationDisplay = ({ result, metrics }) => {
    const [isExporting, setIsExporting] = useState(false);
    const saveCalculation = useAppStore((state) => state.saveCalculation);

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            await exportToPDF(metrics, result);
            toast.success('PDF downloaded successfully!', {
                icon: '📄',
                duration: 3000,
            });
        } catch (err) {
            console.error('PDF export error:', err);
            toast.error(`Failed to export PDF: ${err.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    const handleShare = async () => {
        try {
            const url = generateShareableLink(metrics, result);
            const copied = await copyToClipboard(url);

            if (copied) {
                toast.success('Link copied to clipboard!', {
                    icon: '🔗',
                    duration: 3000,
                });
            } else {
                toast.error('Failed to copy link');
            }
        } catch (err) {
            console.error('Share error:', err);
            toast.error('Failed to generate share link');
        }
    };

    const handleSave = () => {
        try {
            saveCalculation(metrics, result);
            toast.success('Calculation saved!', {
                icon: '💾',
                duration: 3000,
            });
        } catch (err) {
            console.error('Save error:', err);
            toast.error('Failed to save');
        }
    };

    if (!result) {
        return (
            <div className="valuation-display-container">
                <p style={{ color: 'white' }}>No results to display</p>
            </div>
        );
    }

    return (
        <div className="valuation-display-container">
            <div className="valuation-header">
                <h2>Your Startup Valuation</h2>
                <p>Based on advanced financial modeling and industry benchmarks</p>
            </div>

            <div className="valuation-hero">
                <div className="valuation-value">
                    ${(result.valuation / 1000000).toFixed(2)}M
                </div>
                <div className="valuation-subtitle">Estimated Enterprise Value</div>
            </div>

            <div className="action-buttons">
                <button className="premium-btn save-btn" onClick={handleSave} title="Save Calculation (Ctrl+S)">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Save</span>
                </button>

                <button
                    className="premium-btn export-btn"
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    title="Export to PDF (Ctrl+P)"
                >
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
                </button>

                <button className="premium-btn share-btn" onClick={handleShare} title="Share Results (Ctrl+K)">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Share</span>
                </button>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <div className="metric-label">Revenue Multiple</div>
                    <div className="metric-value">
                        {result.details?.finalMultiple?.toFixed(1) || 'N/A'}x
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                        </svg>
                    </div>
                    <div className="metric-label">Growth Factor</div>
                    <div className="metric-value">
                        {result.details?.growthFactor?.toFixed(2) || 'N/A'}x
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <div className="metric-label">Rule of 40</div>
                    <div className="metric-value">
                        {result.details?.ruleOf40Score?.toFixed(0) || 'N/A'}
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className="metric-label">Base Multiple</div>
                    <div className="metric-value">
                        {result.details?.baseMultiple?.toFixed(1) || 'N/A'}x
                    </div>
                </div>
            </div>

            <div className="disclaimer">
                This valuation is an estimate based on the provided metrics and should not be considered financial advice.
            </div>
        </div>
    );
};

export default ValuationDisplay;
