import React from 'react';
import './Page.css';

const About = () => {
    return (
        <div className="page-container animate-fade-in">
            <div className="page-header">
                <h2>About Valuation.AI</h2>
                <p>Democratizing institutional-grade valuation modeling.</p>
            </div>

            <div className="page-content">
                <p>Valuation.AI was built to give founders a realistic, data-driven look at their startup's potential worth without the need for expensive consultants.</p>
                <p>Our algorithms are constantly updated with the latest market data from public markets and private VC rounds.</p>

                <div className="highlight-box">
                    <h4>Disclaimer</h4>
                    <p>This tool is for educational purposes only. Actual valuations are determined by negotiation between founders and investors.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
