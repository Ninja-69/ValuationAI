import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'predictor', label: 'Predictor' },
        { id: 'methodology', label: 'Methodology' },
        { id: 'about', label: 'About' }
    ];

    return (
        <nav className="main-nav">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
};

export default Navigation;
