import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import AdvancedInputForm from './components/AdvancedInputForm';
import ValuationDisplay from './components/ValuationDisplay';
import ProcessingOverlay from './components/ProcessingOverlay';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import SaveLoadPanel from './components/SaveLoadPanel';
import Methodology from './pages/Methodology';
import About from './pages/About';
import { calculateValuation } from './utils/valuationAlgorithm';
import { triggerConfetti } from './utils/confetti';
import { playClick, playSuccess } from './utils/sounds';
import { exportToPDF } from './utils/pdfExport';
import { generateShareableLink, copyToClipboard } from './utils/shareUtils';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import useAppStore from './store/useAppStore';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('predictor');
  const [viewState, setViewState] = useState('input');
  const saveCalculation = useAppStore((state) => state.saveCalculation);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewState]);

  const [metrics, setMetrics] = useState({
    arr: 1000000,
    growthRate: 85,
    netRevenueRetention: 105,
    grossMargin: 75,
    churnRate: 1.5,
    burnRate: 50000,
    cac: 5000,
    ltv: 25000,
    teamSize: 12,
    fundingStage: 'Seed',
    industry: 'SaaS'
  });

  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setMetrics(prev => ({ ...prev, [name]: value }));
    playClick();
  };

  const handleCalculate = () => {
    setViewState('processing');
    playClick();
  };

  const handleProcessingComplete = () => {
    const val = calculateValuation(metrics);
    setResult(val);
    setViewState('result');

    setTimeout(() => {
      triggerConfetti();
      playSuccess();
      toast.success('Valuation calculated successfully!', {
        duration: 4000,
        style: {
          background: 'rgba(20, 20, 20, 0.95)',
          color: '#fff',
          border: '1px solid rgba(230, 81, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        },
        iconTheme: {
          primary: '#E65100',
          secondary: '#fff',
        },
      });
    }, 500);
  };

  const handleReset = () => {
    setViewState('input');
    setResult(null);
    playClick();
  };

  const handleSave = () => {
    if (result && metrics) {
      saveCalculation(metrics, result);
      toast.success('Calculation saved!');
      playSuccess();
    }
  };

  const handleExport = async () => {
    if (result && metrics) {
      try {
        await exportToPDF(metrics, result);
        toast.success('PDF exported!');
        playSuccess();
      } catch (err) {
        toast.error('Export failed');
      }
    }
  };

  const handleShare = async () => {
    if (result && metrics) {
      try {
        const url = generateShareableLink(metrics, result);
        await copyToClipboard(url);
        toast.success('Link copied!');
        playSuccess();
      } catch (err) {
        toast.error('Share failed');
      }
    }
  };

  const handleLoadCalculation = (loadedMetrics, loadedResult) => {
    setMetrics(loadedMetrics);
    setResult(loadedResult);
    setViewState('result');
    playSuccess();
  };

  useKeyboardShortcuts({
    onSave: handleSave,
    onCalculate: viewState === 'input' ? handleCalculate : null,
    onReset: handleReset,
    onExport: handleExport,
    onShare: handleShare,
  });

  const renderContent = () => {
    if (activeTab === 'methodology') return <Methodology />;
    if (activeTab === 'about') return <About />;

    return (
      <div className="content-grid">
        {viewState === 'processing' && (
          <ProcessingOverlay onComplete={handleProcessingComplete} />
        )}

        {viewState === 'input' && (
          <>
            <div className="left-panel">
              <div className="hero-text">
                <h1>Know Your <br /><span className="text-gradient">Startup's Worth</span></h1>
                <p>Advanced valuation modeling using revenue multiples, growth trajectories, and unit economics.</p>
              </div>
              <AdvancedInputForm
                metrics={metrics}
                onChange={handleChange}
                onCalculate={handleCalculate}
              />
            </div>

            <div className="right-panel">
              <div className="placeholder-panel">
                <div className="decorative-circle"></div>
              </div>
            </div>
          </>
        )}

        {viewState === 'result' && result && (
          <>
            <div className="left-panel">
              <ValuationDisplay result={result} metrics={metrics} />
            </div>
            <div className="right-panel">
              <div className="result-actions">
                <button className="reset-btn" onClick={handleReset}>
                  ← New Calculation
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <ParticleBackground />
      <CustomCursor />
      <Toaster position="top-right" />

      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            Valuation<span className="accent-text">.AI</span>
          </div>
          <div className="header-actions">
            {viewState === 'result' && result && (
              <SaveLoadPanel
                onLoad={handleLoadCalculation}
                currentMetrics={metrics}
                currentResult={result}
              />
            )}
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
