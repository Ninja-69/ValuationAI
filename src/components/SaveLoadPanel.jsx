import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { toast } from 'react-hot-toast';
import './SaveLoadPanel.css';

const SaveLoadPanel = ({ onLoad, currentMetrics, currentResult }) => {
    const [isOpen, setIsOpen] = useState(false);
    const savedCalculations = useAppStore((state) => state.savedCalculations);
    const saveCalculation = useAppStore((state) => state.saveCalculation);
    const deleteCalculation = useAppStore((state) => state.deleteCalculation);
    const renameCalculation = useAppStore((state) => state.renameCalculation);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const handleSave = () => {
        if (!currentMetrics || !currentResult) {
            toast.error('No calculation to save');
            return;
        }

        saveCalculation(currentMetrics, currentResult);
        toast.success('Calculation saved!');
    };

    const handleLoad = (calc) => {
        onLoad(calc.metrics, calc.result);
        setIsOpen(false);
        toast.success('Calculation loaded!');
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        deleteCalculation(id);
        toast.success('Calculation deleted');
    };

    const startRename = (id, currentName, e) => {
        e.stopPropagation();
        setEditingId(id);
        setEditName(currentName);
    };

    const finishRename = (id) => {
        if (editName.trim()) {
            renameCalculation(id, editName.trim());
            toast.success('Renamed!');
        }
        setEditingId(null);
        setEditName('');
    };

    return (
        <div className="save-load-panel">
            <button className="save-btn" onClick={handleSave} title="Save (Ctrl+S)">
                💾 Save
            </button>

            <div className="load-dropdown">
                <button
                    className="load-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    title="Load saved calculation"
                >
                    📂 Load {savedCalculations.length > 0 && `(${savedCalculations.length})`}
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <h4>Saved Calculations</h4>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                        </div>

                        {savedCalculations.length === 0 ? (
                            <div className="empty-state">
                                <p>No saved calculations yet</p>
                                <small>Save your first calculation to see it here</small>
                            </div>
                        ) : (
                            <div className="calculations-list">
                                {savedCalculations.map((calc) => (
                                    <div key={calc.id} className="calculation-item" onClick={() => handleLoad(calc)}>
                                        {editingId === calc.id ? (
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onBlur={() => finishRename(calc.id)}
                                                onKeyDown={(e) => e.key === 'Enter' && finishRename(calc.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                autoFocus
                                                className="rename-input"
                                            />
                                        ) : (
                                            <>
                                                <div className="calc-info">
                                                    <div className="calc-name">{calc.name}</div>
                                                    <div className="calc-details">
                                                        <span className="calc-value">
                                                            ${(calc.result.valuation / 1000000).toFixed(2)}M
                                                        </span>
                                                        <span className="calc-date">
                                                            {new Date(calc.timestamp).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="calc-actions">
                                                    <button
                                                        className="action-btn"
                                                        onClick={(e) => startRename(calc.id, calc.name, e)}
                                                        title="Rename"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={(e) => handleDelete(calc.id, e)}
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaveLoadPanel;
