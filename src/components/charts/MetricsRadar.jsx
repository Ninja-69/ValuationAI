import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const MetricsRadar = ({ metrics }) => {
    const data = [
        { metric: 'Growth', value: Math.min(metrics.growthRate / 3, 100), fullMark: 100 },
        { metric: 'Margin', value: metrics.grossMargin, fullMark: 100 },
        { metric: 'NRR', value: Math.min(metrics.netRevenueRetention, 150), fullMark: 150 },
        { metric: 'LTV:CAC', value: Math.min((metrics.ltv / metrics.cac) * 10, 100), fullMark: 100 },
        { metric: 'Efficiency', value: Math.max(100 - (metrics.burnRate / metrics.arr * 100), 0), fullMark: 100 },
    ];

    return (
        <div className="chart-container">
            <h3 className="chart-title">Metrics Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="metric"
                        stroke="#888"
                        style={{ fontSize: '12px' }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        stroke="#888"
                    />
                    <Radar
                        name="Your Startup"
                        dataKey="value"
                        stroke="#E65100"
                        fill="#E65100"
                        fillOpacity={0.6}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricsRadar;
