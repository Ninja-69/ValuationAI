import React, { useState } from 'react';
import './CurrencySelector.css';

const CURRENCIES = {
    USD: { symbol: '$', name: 'US Dollar', rate: 1 },
    EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
    GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
    JPY: { symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
    AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
    CHF: { symbol: 'CHF', name: 'Swiss Franc', rate: 0.88 },
    CNY: { symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
    INR: { symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
};

const CurrencySelector = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currency, setCurrency] = useState('USD');

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
        setIsOpen(false);

        // Convert value to new currency
        const oldRate = CURRENCIES[currency].rate;
        const newRate = CURRENCIES[newCurrency].rate;
        const convertedValue = (value / oldRate) * newRate;

        if (onChange) {
            onChange(convertedValue, newCurrency);
        }
    };

    const formatValue = (val) => {
        const currencyData = CURRENCIES[currency];
        return `${currencyData.symbol}${(val / 1000000).toFixed(2)}M`;
    };

    return (
        <div className="currency-selector">
            <button
                className="currency-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Change currency"
            >
                {CURRENCIES[currency].symbol} {currency}
            </button>

            {isOpen && (
                <div className="currency-dropdown">
                    {Object.entries(CURRENCIES).map(([code, data]) => (
                        <button
                            key={code}
                            className={`currency-option ${code === currency ? 'active' : ''}`}
                            onClick={() => handleCurrencyChange(code)}
                        >
                            <span className="currency-symbol">{data.symbol}</span>
                            <span className="currency-code">{code}</span>
                            <span className="currency-name">{data.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelector;
