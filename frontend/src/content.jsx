import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function ContentApp() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    const fetchRootInfo = async () => {
        setIsOpen(true);
        if (summary) return;

        setLoading(true);
        setError(null);
        try {
            // NOTE: For this to work in an extension, ensure CORS is handled in the backend
            // if not allowed natively. Chrome extension manifests permit host permissions.
            const res = await fetch('http://localhost:8000/api/root-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ headline: 'Dummy Headline for Chrome Extension' })
            });
            if (!res.ok) throw new Error(`Network error: ${res.status}`);
            const data = await res.json();
            setSummary(data.summary);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[2147483647] font-sans antialiased text-base">
            {isOpen && (
                <div className="mb-4 bg-white/70 backdrop-blur-xl border border-white/40 text-slate-800 rounded-2xl shadow-zinc-800/10 shadow-2xl w-80 overflow-hidden flex flex-col transform transition-all pointer-events-auto">
                    <div className="bg-slate-900/90 backdrop-blur-lg px-5 py-4 flex justify-between items-center shadow-inner">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Root Info Summary
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-5 max-h-[400px] overflow-y-auto custom-scrollbar pointer-events-auto">
                        {loading && (
                            <div className="flex flex-col items-center justify-center space-y-3 py-6 text-slate-500">
                                <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <div className="text-sm font-medium animate-pulse">Analyzing context...</div>
                            </div>
                        )}
                        {error && (
                            <div className="text-red-600 text-sm bg-red-50/80 p-3 rounded-xl border border-red-100 flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>{error}</span>
                            </div>
                        )}
                        {summary && (
                            <div className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-medium">
                                {summary}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <button
                onClick={fetchRootInfo}
                className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ml-auto pointer-events-auto"
                aria-label="Root Info"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
}

// Ensure the container survives single page application route changes if needed
// by placing it early in body execution
let rootDiv = document.getElementById('root-info-extension-container');
if (!rootDiv) {
    rootDiv = document.createElement('div');
    rootDiv.id = 'root-info-extension-container';
    document.body.appendChild(rootDiv);

    const root = createRoot(rootDiv);
    root.render(<ContentApp />);
}
