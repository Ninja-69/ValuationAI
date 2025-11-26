export const INDUSTRY_MULTIPLES = {
    SaaS: 10,
    AI: 20,
    Fintech: 12,
    ECommerce: 4,
    HealthTech: 15,
    EdTech: 8,
    Other: 6
};

export const calculateValuation = (metrics) => {
    const {
        arr, // Annual Recurring Revenue
        growthRate, // %
        netRevenueRetention, // % (e.g., 110%)
        grossMargin, // %
        churnRate, // % monthly
        burnRate, // Monthly burn
        cac, // Customer Acquisition Cost
        ltv, // Lifetime Value
        teamSize,
        fundingStage,
        industry
    } = metrics;

    // 1. Base Valuation
    let multiple = INDUSTRY_MULTIPLES[industry] || INDUSTRY_MULTIPLES.Other;

    // 2. Growth Premium (Non-linear)
    // < 20%: 0.7x
    // 20-50%: 1.0x
    // 50-100%: 1.3x
    // 100-200%: 1.6x
    // > 200%: 2.2x
    let growthMultiplier = 1.0;
    if (growthRate < 20) growthMultiplier = 0.7;
    else if (growthRate < 50) growthMultiplier = 1.0;
    else if (growthRate < 100) growthMultiplier = 1.3;
    else if (growthRate < 200) growthMultiplier = 1.6;
    else growthMultiplier = 2.2;

    // 3. Margin & Efficiency (Rule of 40)
    // Rule of 40 Score = Growth Rate + Gross Margin
    const ruleOf40Score = growthRate + grossMargin;
    let efficiencyMultiplier = 1.0;

    if (ruleOf40Score > 60) efficiencyMultiplier += 0.3; // Elite
    else if (ruleOf40Score > 40) efficiencyMultiplier += 0.1; // Good
    else if (ruleOf40Score < 10) efficiencyMultiplier -= 0.2; // Burning too much with low growth

    // Gross Margin specific adjustment
    if (grossMargin > 80) efficiencyMultiplier += 0.1;
    if (grossMargin < 40) efficiencyMultiplier -= 0.1;

    // 4. Retention & Churn
    let retentionMultiplier = 1.0;
    if (netRevenueRetention > 120) retentionMultiplier += 0.2; // Best in class
    else if (netRevenueRetention < 90) retentionMultiplier -= 0.2; // Leaky bucket

    if (churnRate > 3) retentionMultiplier -= 0.15; // High churn alert

    // 5. Unit Economics (LTV:CAC)
    let unitEconMultiplier = 1.0;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    if (ltvCacRatio >= 5) unitEconMultiplier += 0.15;
    else if (ltvCacRatio < 1.5 && ltvCacRatio > 0) unitEconMultiplier -= 0.1;

    // 6. Stage Premium
    const STAGE_MULTIPLIERS = {
        'Bootstrapped': 0.9,
        'Pre-Seed': 0.9,
        'Seed': 1.0,
        'Series A': 1.15,
        'Series B': 1.25,
        'Series C+': 1.35
    };
    const stageMultiplier = STAGE_MULTIPLIERS[fundingStage] || 1.0;

    // Calculate Final Multiple
    const finalMultiple = multiple * growthMultiplier * efficiencyMultiplier * retentionMultiplier * unitEconMultiplier * stageMultiplier;

    // Cap the multiple to avoid unrealistic numbers (e.g., 100x revenue)
    const cappedMultiple = Math.min(finalMultiple, 50);

    const finalValuation = arr * cappedMultiple;

    return {
        valuation: Math.round(finalValuation),
        details: {
            baseMultiple: multiple,
            finalMultiple: parseFloat(cappedMultiple.toFixed(2)),
            growthMultiplier,
            efficiencyMultiplier,
            retentionMultiplier,
            unitEconMultiplier,
            stageMultiplier,
            ruleOf40Score
        }
    };
};
