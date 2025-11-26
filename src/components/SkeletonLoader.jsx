import React from 'react';
import './SkeletonLoader.css';

export const FormSkeleton = () => (
    <div className="skeleton-form">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-input-group">
                <div className="skeleton skeleton-label"></div>
                <div className="skeleton skeleton-input"></div>
            </div>
        ))}
        <div className="skeleton skeleton-button"></div>
    </div>
);

export const ChartSkeleton = () => (
    <div className="skeleton-chart">
        <div className="skeleton skeleton-chart-title"></div>
        <div className="skeleton skeleton-chart-body"></div>
    </div>
);

export const ResultSkeleton = () => (
    <div className="skeleton-result">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-value"></div>
        <div className="skeleton-metrics">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton skeleton-metric"></div>
            ))}
        </div>
    </div>
);

const SkeletonLoader = ({ type = 'form' }) => {
    switch (type) {
        case 'form':
            return <FormSkeleton />;
        case 'chart':
            return <ChartSkeleton />;
        case 'result':
            return <ResultSkeleton />;
        default:
            return <FormSkeleton />;
    }
};

export default SkeletonLoader;
