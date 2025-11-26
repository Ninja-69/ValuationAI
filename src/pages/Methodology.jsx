import React from 'react';
import './Page.css';

const Methodology = () => {
    return (
        <div className="page-container animate-fade-in">
            <div className="page-header">
                <h2>Our Methodology</h2>
                <p>How the "Genius" Algorithm calculates your worth.</p>
            </div>

            <div className="page-content">
                <section>
                    <h3>1. Revenue Multiples</h3>
                    <p>We start with a base valuation derived from current public market multiples for your specific industry (e.g., SaaS, AI, Fintech). This provides a market-grounded baseline.</p>
                </section>

                <section>
                    <h3>2. The "Rule of 40" Adjustment</h3>
                    <p>We analyze your Efficiency Score (Growth Rate + Profit Margin). Companies exceeding the "Rule of 40" receive a significant valuation premium, while those burning cash without growth are penalized.</p>
                </section>

                <section>
                    <h3>3. Unit Economics &amp; Retention</h3>
                    <p>Revenue quality matters. We factor in Net Revenue Retention (NRR) and LTV:CAC ratios. High retention (&gt;110%) and efficient acquisition (LTV:CAC &gt; 3:1) act as multipliers on your base valuation.</p>
                </section>

                <section>
                    <h3>4. Growth Trajectory</h3>
                    <p>Growth is non-linear. Our model applies an exponential curve to your YoY growth rate, rewarding "hyper-growth" startups significantly more than linear growth companies.</p>
                </section>
            </div>
        </div>
    );
};

export default Methodology;
