import { calculateValuation } from './src/utils/valuationAlgorithm.js';

const testCases = [
    {
        name: "Standard SaaS Seed",
        input: {
            arr: 1000000,
            growthRate: 150, // 150% -> 1.5x
            teamSize: 10, // 100k/emp -> 1.0x
            fundingStage: 'Seed', // 1.0x
            industry: 'SaaS' // 10x
        },
        expectedBase: 10000000,
        expectedValuation: 15000000 // 10m * 1.5 * 1.0 * 1.0
    },
    {
        name: "High Growth AI",
        input: {
            arr: 2000000,
            growthRate: 250, // >200% -> 2.0x
            teamSize: 5, // 400k/emp -> 1.2x efficiency
            fundingStage: 'Series A', // 1.1x
            industry: 'AI' // 20x
        },
        expectedBase: 40000000, // 2m * 20
        expectedValuation: 105600000 // 40m * 2.0 * 1.2 * 1.1 = 105.6m
    }
];

testCases.forEach(tc => {
    const result = calculateValuation(tc.input);
    console.log(`Test: ${tc.name}`);
    console.log(`  Expected: ${tc.expectedValuation}`);
    console.log(`  Actual:   ${result.valuation}`);

    // Allow small rounding diffs
    if (Math.abs(result.valuation - tc.expectedValuation) < 100) {
        console.log("  PASS");
    } else {
        console.error("  FAIL");
    }
});
