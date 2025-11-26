import React from 'react';
import './InputForm.css'; // Reusing base styles + new ones

const AdvancedInputForm = ({ metrics, onChange, onCalculate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        onChange(name, Number(value));
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="input-form-container animate-fade-in delay-1">
            <div className="form-header">
                <h3>Startup Metrics</h3>
                <p>Enter detailed financial and operational data for a precise valuation.</p>
            </div>

            <div className="scrollable-form">
                {/* SECTION 1: REVENUE */}
                <div className="form-section">
                    <h4>Revenue & Financials</h4>
                    <div className="input-group">
                        <label>Annual Recurring Revenue (ARR)</label>
                        <div className="currency-input-wrapper">
                            <span className="currency-symbol">$</span>
                            <input type="number" name="arr" value={metrics.arr} onChange={handleNumberChange} className="text-input" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group half">
                            <label>Gross Margin (%)</label>
                            <input type="number" name="grossMargin" value={metrics.grossMargin} onChange={handleNumberChange} className="text-input" />
                        </div>
                        <div className="input-group half">
                            <label>Monthly Burn ($)</label>
                            <input type="number" name="burnRate" value={metrics.burnRate} onChange={handleNumberChange} className="text-input" />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: GROWTH & RETENTION */}
                <div className="form-section">
                    <h4>Growth & Efficiency</h4>
                    <div className="input-group">
                        <label>YoY Growth Rate: <span className="highlight">{metrics.growthRate}%</span></label>
                        <input type="range" name="growthRate" min="0" max="300" value={metrics.growthRate} onChange={handleNumberChange} className="slider" />
                    </div>

                    <div className="row">
                        <div className="input-group half">
                            <label>Net Revenue Retention (%)</label>
                            <input type="number" name="netRevenueRetention" value={metrics.netRevenueRetention} onChange={handleNumberChange} className="text-input" placeholder="100" />
                        </div>
                        <div className="input-group half">
                            <label>Monthly Churn (%)</label>
                            <input type="number" name="churnRate" value={metrics.churnRate} onChange={handleNumberChange} className="text-input" placeholder="1.0" />
                        </div>
                    </div>
                </div>

                {/* SECTION 3: UNIT ECONOMICS */}
                <div className="form-section">
                    <h4>Unit Economics</h4>
                    <div className="row">
                        <div className="input-group half">
                            <label>CAC ($)</label>
                            <input type="number" name="cac" value={metrics.cac} onChange={handleNumberChange} className="text-input" />
                        </div>
                        <div className="input-group half">
                            <label>LTV ($)</label>
                            <input type="number" name="ltv" value={metrics.ltv} onChange={handleNumberChange} className="text-input" />
                        </div>
                    </div>
                </div>

                {/* SECTION 4: TEAM & MARKET */}
                <div className="form-section">
                    <h4>Team & Market</h4>
                    <div className="row">
                        <div className="input-group half">
                            <label>Team Size</label>
                            <input type="number" name="teamSize" value={metrics.teamSize} onChange={handleNumberChange} className="text-input" />
                        </div>
                        <div className="input-group half">
                            <label>Industry</label>
                            <select name="industry" value={metrics.industry} onChange={handleChange} className="select-input">
                                <option value="SaaS">SaaS</option>
                                <option value="AI">Artificial Intelligence</option>
                                <option value="Fintech">Fintech</option>
                                <option value="ECommerce">E-Commerce</option>
                                <option value="HealthTech">HealthTech</option>
                                <option value="EdTech">EdTech</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Funding Stage</label>
                        <div className="radio-group">
                            {['Bootstrapped', 'Seed', 'Series A', 'Series B'].map((stage) => (
                                <button
                                    key={stage}
                                    type="button"
                                    className={`radio-btn ${metrics.fundingStage === stage ? 'active' : ''}`}
                                    onClick={() => onChange('fundingStage', stage)}
                                >
                                    {stage}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button className="calculate-btn" onClick={onCalculate}>
                    Analyze Startup
                </button>
            </div>
        </div>
    );
};

export default AdvancedInputForm;
