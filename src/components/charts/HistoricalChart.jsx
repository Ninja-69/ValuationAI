import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import useAppStore from '../../store/useAppStore';

const HistoricalChart = () => {
    const history = useAppStore((state) => state.getHistory());

    if (history.length === 0) {
        return (
            <div className="chart-container">
                <h3 className="chart-title">Historical Valuations</h3>
                <p className="chart-empty">No historical data yet. Complete more calculations to see trends!</p>
            </div>
        );
    }

    return (
        <div className="chart-container">
            <h3 className="chart-title">Historical Valuations</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={history}>
                    <defs>
                        <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E65100" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#E65100" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="date"
                        stroke="#888"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#888"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(20, 20, 20, 0.95)',
                            border: '1px solid rgba(230, 81, 0, 0.3)',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, 'Valuation']}
                    />
                    <Area
                        type="monotone"
                        dataKey="valuation"
                        stroke="#E65100"
                        fillOpacity={1}
                        fill="url(#colorValuation)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoricalChart;
