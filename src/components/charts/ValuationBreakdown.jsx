import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ValuationBreakdown = ({ result }) => {
    const data = [
        { name: 'Base Multiple', value: result.details.baseMultiple },
        { name: 'Growth Factor', value: result.details.growthFactor },
        { name: 'Rule of 40', value: result.details.ruleOf40Score / 10 },
    ];

    const COLORS = ['#E65100', '#FF6F00', '#FF9100'];

    return (
        <div className="chart-container">
            <h3 className="chart-title">Valuation Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(20, 20, 20, 0.95)',
                            border: '1px solid rgba(230, 81, 0, 0.3)',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ValuationBreakdown;
