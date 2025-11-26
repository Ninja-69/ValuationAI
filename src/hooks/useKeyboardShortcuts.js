import { useEffect } from 'react';

const useKeyboardShortcuts = (callbacks) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl/Cmd + S: Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                callbacks.onSave?.();
            }

            // Ctrl/Cmd + Enter: Calculate
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                callbacks.onCalculate?.();
            }

            // Escape: Reset/Close
            if (e.key === 'Escape') {
                e.preventDefault();
                callbacks.onReset?.();
            }

            // Ctrl/Cmd + P: Export PDF
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                callbacks.onExport?.();
            }

            // Ctrl/Cmd + K: Share
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                callbacks.onShare?.();
            }

            // ?: Show help
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                callbacks.onHelp?.();
            }

            // Ctrl/Cmd + H: History
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                callbacks.onHistory?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callbacks]);
};

export default useKeyboardShortcuts;

export const KEYBOARD_SHORTCUTS = [
    { keys: ['Ctrl', 'S'], description: 'Save calculation', mac: ['⌘', 'S'] },
    { keys: ['Ctrl', 'Enter'], description: 'Calculate valuation', mac: ['⌘', '↵'] },
    { keys: ['Esc'], description: 'Reset form', mac: ['Esc'] },
    { keys: ['Ctrl', 'P'], description: 'Export to PDF', mac: ['⌘', 'P'] },
    { keys: ['Ctrl', 'K'], description: 'Share results', mac: ['⌘', 'K'] },
    { keys: ['Ctrl', 'H'], description: 'View history', mac: ['⌘', 'H'] },
    { keys: ['?'], description: 'Show shortcuts', mac: ['?'] },
];
