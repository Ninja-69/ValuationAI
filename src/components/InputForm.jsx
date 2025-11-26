import React from 'react';
import './InputForm.css';

const InputForm = ({ metrics, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        onChange(name, Number(value));
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="input-form-container animate-fade-in delay-1">
            <div className="form-header">
                <h3>Company Metrics</h3>
                <p>Input your current traction to generate a valuation model.</p>
            </div>

            <div className="input-group">
                <label>Annual Recurring Revenue (ARR)</label>
                <div className="currency-input-wrapper">
                    <span className="currency-symbol">$</span>
                    <input
                        type="number"
                        name="arr"
                        value={metrics.arr}
                        onChange={handleChange}
                        className="text-input"
                        placeholder="1,000,000"
                    />
                </div>
                <div className="helper-text">{formatCurrency(metrics.arr)}</div>
            </div>

            <div className="input-group">
                <label>YoY Growth Rate: <span className="highlight">{metrics.growthRate}%</span></label>
                <input
                    type="range"
                    name="growthRate"
                    min="0"
                    max="300"
                    value={metrics.growthRate}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <div className="slider-labels">
                    <span>0%</span>
                    <span>150%</span>
                    <span>300%+</span>
                </div>
            </div>

            <div className="row">
                <div className="input-group half">
                    <label>Team Size</label>
                    <input
                        type="number"
                        name="teamSize"
                        value={metrics.teamSize}
                        onChange={handleChange}
                        className="text-input"
                    />
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
    );
};

export default InputForm;
