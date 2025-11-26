export const validateMetrics = (metrics) => {
    const errors = {};
    const warnings = {};

    // ARR Validation
    if (metrics.arr <= 0) {
        errors.arr = 'ARR must be greater than 0';
    } else if (metrics.arr < 100000) {
        warnings.arr = 'ARR seems low for a typical startup';
    } else if (metrics.arr > 100000000) {
        warnings.arr = 'ARR is very high - ensure this is accurate';
    }

    // Growth Rate Validation
    if (metrics.growthRate < 0) {
        errors.growthRate = 'Growth rate cannot be negative';
    } else if (metrics.growthRate > 300) {
        warnings.growthRate = 'Growth rate over 300% is exceptional - verify data';
    } else if (metrics.growthRate < 20) {
        warnings.growthRate = 'Low growth rate may impact valuation';
    }

    // Gross Margin Validation
    if (metrics.grossMargin < 0 || metrics.grossMargin > 100) {
        errors.grossMargin = 'Gross margin must be between 0% and 100%';
    } else if (metrics.grossMargin < 50) {
        warnings.grossMargin = 'Low gross margin for SaaS - typical is 70%+';
    }

    // NRR Validation
    if (metrics.netRevenueRetention < 0) {
        errors.netRevenueRetention = 'NRR cannot be negative';
    } else if (metrics.netRevenueRetention < 90) {
        warnings.netRevenueRetention = 'NRR below 90% indicates high churn';
    } else if (metrics.netRevenueRetention > 150) {
        warnings.netRevenueRetention = 'NRR over 150% is exceptional!';
    }

    // Churn Rate Validation
    if (metrics.churnRate < 0) {
        errors.churnRate = 'Churn rate cannot be negative';
    } else if (metrics.churnRate > 10) {
        warnings.churnRate = 'High churn rate will significantly impact valuation';
    }

    // LTV:CAC Validation
    const ltvCacRatio = metrics.ltv / metrics.cac;
    if (ltvCacRatio < 1) {
        errors.ltv = 'LTV must be greater than CAC';
    } else if (ltvCacRatio < 3) {
        warnings.ltv = 'LTV:CAC ratio below 3:1 is concerning';
    }

    // Burn Rate Validation
    if (metrics.burnRate < 0) {
        errors.burnRate = 'Burn rate cannot be negative';
    } else if (metrics.burnRate > metrics.arr / 12) {
        warnings.burnRate = 'Burn rate exceeds monthly revenue - runway concern';
    }

    return { errors, warnings, isValid: Object.keys(errors).length === 0 };
};

export const getFieldSuggestion = (fieldName, value, metrics) => {
    switch (fieldName) {
        case 'grossMargin':
            if (value < 70 && metrics.industry === 'SaaS') {
                return 'SaaS companies typically have 70-85% gross margins';
            }
            break;
        case 'netRevenueRetention':
            if (value < 100) {
                return 'Best-in-class SaaS companies have NRR of 120%+';
            }
            break;
        case 'growthRate':
            if (value < 40 && metrics.fundingStage === 'Seed') {
                return 'Seed stage companies typically grow 100%+ YoY';
            }
            break;
        case 'churnRate':
            if (value > 5) {
                return 'Monthly churn above 5% is high - focus on retention';
            }
            break;
        default:
            return null;
    }
    return null;
};
