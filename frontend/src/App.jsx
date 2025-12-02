import React, { useState } from 'react';
import { Link, Copy, BarChart2, History } from 'lucide-react';
import { shortenUrl } from './api';

function App() {
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setLoading(true);

        try {
            const data = await shortenUrl(url, alias);
            setResult(data);
            setHistory(prev => [data, ...prev]);
            setUrl('');
            setAlias('');
        } catch (err) {
            setError(err.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-blue-500 mb-2 flex items-center justify-center gap-2">
                    <Link className="w-8 h-8" /> URL Shortener
                </h1>
                <p className="text-gray-400">Professional & Fast Link Shortening</p>
            </header>

            <main className="w-full max-w-lg space-y-8">
                {/* Shortener Form */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Original URL</label>
                            <input
                                type="url"
                                required
                                placeholder="https://example.com/very-long-url"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Custom Alias (Optional)</label>
                            <input
                                type="text"
                                placeholder="my-custom-link"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Shortening...' : 'Shorten URL'}
                        </button>
                    </form>
                </div>

                {/* Result Card */}
                {result && (
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-green-500/50 animate-fade-in">
                        <h3 className="text-lg font-semibold text-green-400 mb-2">Success! Here's your short link:</h3>
                        <div className="flex items-center gap-2 bg-gray-900 p-3 rounded-lg border border-gray-700">
                            <span className="text-blue-400 truncate flex-1">{`http://localhost:5000/${result.short_code}`}</span>
                            <button
                                onClick={() => copyToClipboard(`http://localhost:5000/${result.short_code}`)}
                                className="p-2 hover:bg-gray-700 rounded-md transition text-gray-300"
                                title="Copy"
                            >
                                <Copy size={20} />
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-400 flex justify-between">
                            <span>Original: <span className="text-gray-500 truncate max-w-[200px] inline-block align-bottom">{result.original_url}</span></span>
                            <span className="flex items-center gap-1"><BarChart2 size={14} /> 0 clicks</span>
                        </div>
                    </div>
                )}

                {/* Recent History */}
                {history.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                            <History size={20} /> Recent Links
                        </h3>
                        <div className="space-y-3">
                            {history.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-blue-400 font-medium">{item.short_code}</span>
                                        <span className="text-xs text-gray-500 truncate">{item.original_url}</span>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(`http://localhost:5000/${item.short_code}`)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
