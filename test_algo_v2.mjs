import { calculateValuation } from './src/utils/valuationAlgorithm.js';

const testCases = [
    {
        name: "Standard SaaS Seed (V2)",
        input: {
            arr: 1000000,
            growthRate: 85, // 1.3x
            netRevenueRetention: 100, // Neutral
            grossMargin: 75, // Neutral
            churnRate: 1.5, // Neutral
            burnRate: 50000,
            cac: 5000,
            ltv: 25000, // 5x -> +0.15
            teamSize: 10,
            fundingStage: 'Seed', // 1.0x
            industry: 'SaaS' // 10x
        },
        // Rule of 40: 85 + 75 = 160 (>60) -> +0.3 efficiency
        // Base: 10x
        // Growth: 1.3x
        // Efficiency: 1.0 + 0.3 = 1.3x
        // Retention: 1.0
        // Unit Econ: 1.0 + 0.15 = 1.15x
        // Stage: 1.0x
        // Total Multiple: 10 * 1.3 * 1.3 * 1.0 * 1.15 * 1.0 = 19.435
        expectedValuation: 19435000
    },
    {
        name: "High Churn Penalty",
        input: {
            arr: 1000000,
            growthRate: 30, // 1.0x
            netRevenueRetention: 80, // <90 -> -0.2
            grossMargin: 60,
            churnRate: 4.0, // >3 -> -0.15
            burnRate: 100000,
            cac: 10000,
            ltv: 12000, // 1.2x -> -0.1
            teamSize: 20,
            fundingStage: 'Series A', // 1.15x
            industry: 'SaaS' // 10x
        },
        // Rule of 40: 30 + 60 = 90 (>60) -> +0.3
        // Base: 10x
        // Growth: 1.0x
        // Efficiency: 1.3x
        // Retention: 1.0 - 0.2 - 0.15 = 0.65x
        // Unit Econ: 1.0 - 0.1 = 0.9x
        // Stage: 1.15x
        // Total: 10 * 1.0 * 1.3 * 0.65 * 0.9 * 1.15 = 8.74
        expectedValuation: 8745750
    }
];

testCases.forEach(tc => {
    const result = calculateValuation(tc.input);
    console.log(`Test: ${tc.name}`);
    console.log(`  Expected: ${tc.expectedValuation}`);
    console.log(`  Actual:   ${result.valuation}`);

    // Allow 5% margin of error due to floating point math
    const diff = Math.abs(result.valuation - tc.expectedValuation);
    const margin = tc.expectedValuation * 0.05;

    if (diff < margin) {
        console.log("  PASS");
    } else {
        console.error("  FAIL");
        console.log("Details:", result.details);
    }
});
