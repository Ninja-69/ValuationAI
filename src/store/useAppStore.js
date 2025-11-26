import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
    persist(
        (set, get) => ({
            // Saved calculations
            savedCalculations: [],

            // Current calculation
            currentCalculation: null,

            // Save a calculation
            saveCalculation: (metrics, result) => {
                const calculation = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    metrics,
                    result,
                    name: `Valuation ${new Date().toLocaleDateString()}`,
                };

                set((state) => ({
                    savedCalculations: [calculation, ...state.savedCalculations].slice(0, 50), // Keep last 50
                    currentCalculation: calculation,
                }));

                return calculation;
            },

            // Delete a calculation
            deleteCalculation: (id) => {
                set((state) => ({
                    savedCalculations: state.savedCalculations.filter((calc) => calc.id !== id),
                }));
            },

            // Load a calculation
            loadCalculation: (id) => {
                const calculation = get().savedCalculations.find((calc) => calc.id === id);
                if (calculation) {
                    set({ currentCalculation: calculation });
                }
                return calculation;
            },

            // Rename a calculation
            renameCalculation: (id, newName) => {
                set((state) => ({
                    savedCalculations: state.savedCalculations.map((calc) =>
                        calc.id === id ? { ...calc, name: newName } : calc
                    ),
                }));
            },

            // Clear all calculations
            clearAllCalculations: () => {
                set({ savedCalculations: [], currentCalculation: null });
            },

            // Get calculation history (for charts)
            getHistory: () => {
                return get().savedCalculations.map((calc) => ({
                    date: new Date(calc.timestamp).toLocaleDateString(),
                    valuation: calc.result.valuation,
                    arr: calc.metrics.arr,
                    growthRate: calc.metrics.growthRate,
                }));
            },
        }),
        {
            name: 'valuation-storage',
        }
    )
);

export default useAppStore;
