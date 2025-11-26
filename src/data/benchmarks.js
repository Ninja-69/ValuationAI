export const industryBenchmarks = {
    SaaS: {
        name: 'SaaS',
        metrics: {
            grossMargin: { min: 70, median: 75, max: 85 },
            growthRate: { min: 30, median: 50, max: 100 },
            netRevenueRetention: { min: 100, median: 110, max: 130 },
            churnRate: { min: 0.5, median: 2, max: 5 },
            ltvCacRatio: { min: 3, median: 4, max: 6 },
            burnMultiple: { min: 1, median: 1.5, max: 2 },
        },
        valuation: {
            revenueMultiple: { min: 5, median: 8, max: 15 },
        },
    },
    AI: {
        name: 'Artificial Intelligence',
        metrics: {
            grossMargin: { min: 60, median: 70, max: 80 },
            growthRate: { min: 50, median: 100, max: 200 },
            netRevenueRetention: { min: 100, median: 115, max: 140 },
            churnRate: { min: 1, median: 3, max: 7 },
            ltvCacRatio: { min: 2.5, median: 3.5, max: 5 },
            burnMultiple: { min: 1.5, median: 2, max: 3 },
        },
        valuation: {
            revenueMultiple: { min: 10, median: 15, max: 25 },
        },
    },
    Fintech: {
        name: 'Fintech',
        metrics: {
            grossMargin: { min: 50, median: 60, max: 75 },
            growthRate: { min: 40, median: 60, max: 120 },
            netRevenueRetention: { min: 95, median: 105, max: 120 },
            churnRate: { min: 1, median: 3, max: 6 },
            ltvCacRatio: { min: 3, median: 4, max: 5 },
            burnMultiple: { min: 1, median: 1.5, max: 2.5 },
        },
        valuation: {
            revenueMultiple: { min: 6, median: 10, max: 18 },
        },
    },
    ECommerce: {
        name: 'E-Commerce',
        metrics: {
            grossMargin: { min: 30, median: 45, max: 60 },
            growthRate: { min: 30, median: 50, max: 100 },
            netRevenueRetention: { min: 90, median: 100, max: 115 },
            churnRate: { min: 2, median: 5, max: 10 },
            ltvCacRatio: { min: 2, median: 3, max: 4 },
            burnMultiple: { min: 1, median: 2, max: 3 },
        },
        valuation: {
            revenueMultiple: { min: 2, median: 4, max: 8 },
        },
    },
    HealthTech: {
        name: 'HealthTech',
        metrics: {
            grossMargin: { min: 60, median: 70, max: 80 },
            growthRate: { min: 35, median: 55, max: 110 },
            netRevenueRetention: { min: 100, median: 110, max: 125 },
            churnRate: { min: 1, median: 2.5, max: 5 },
            ltvCacRatio: { min: 3, median: 4.5, max: 6 },
            burnMultiple: { min: 1, median: 1.5, max: 2 },
        },
        valuation: {
            revenueMultiple: { min: 7, median: 11, max: 20 },
        },
    },
    EdTech: {
        name: 'EdTech',
        metrics: {
            grossMargin: { min: 65, median: 75, max: 85 },
            growthRate: { min: 40, median: 65, max: 130 },
            netRevenueRetention: { min: 95, median: 105, max: 120 },
            churnRate: { min: 2, median: 4, max: 8 },
            ltvCacRatio: { min: 2.5, median: 3.5, max: 5 },
            burnMultiple: { min: 1.5, median: 2, max: 3 },
        },
        valuation: {
            revenueMultiple: { min: 5, median: 8, max: 15 },
        },
    },
};

export const getBenchmark = (industry, metric) => {
    const industryData = industryBenchmarks[industry];
    if (!industryData || !industryData.metrics[metric]) {
        return null;
    }
    return industryData.metrics[metric];
};

export const compareToIndustry = (metrics) => {
    const benchmark = industryBenchmarks[metrics.industry];
    if (!benchmark) return null;

    const comparisons = {};

    // Compare each metric
    Object.keys(benchmark.metrics).forEach((key) => {
        const metricValue = getMetricValue(metrics, key);
        if (metricValue !== null) {
            const bench = benchmark.metrics[key];
            let status = 'average';

            if (metricValue >= bench.max) status = 'excellent';
            else if (metricValue >= bench.median) status = 'good';
            else if (metricValue >= bench.min) status = 'average';
            else status = 'below';

            comparisons[key] = {
                value: metricValue,
                benchmark: bench,
                status,
                percentile: calculatePercentile(metricValue, bench),
            };
        }
    });

    return comparisons;
};

const getMetricValue = (metrics, key) => {
    const mapping = {
        grossMargin: metrics.grossMargin,
        growthRate: metrics.growthRate,
        netRevenueRetention: metrics.netRevenueRetention,
        churnRate: metrics.churnRate,
        ltvCacRatio: metrics.ltv / metrics.cac,
        burnMultiple: (metrics.burnRate * 12) / metrics.arr,
    };
    return mapping[key] || null;
};

const calculatePercentile = (value, benchmark) => {
    const range = benchmark.max - benchmark.min;
    const position = value - benchmark.min;
    return Math.min(100, Math.max(0, (position / range) * 100));
};
