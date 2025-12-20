import React from 'react';

const OfficerDashboard = () => {
    const card = 'bg-white rounded-lg shadow p-6';
    const btn = 'w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium';

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">D</div>
                    <div>
                        <h1 className="text-2xl font-semibold">Village Officer</h1>
                        <p className="text-sm text-gray-500">Data entry panel for field reporting</p>
                    </div>
                </div>
                <div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${card}`}>
                    <h2 className="text-lg font-semibold mb-4">Quick Report</h2>
                    <p className="text-sm text-gray-600 mb-4">Select the incident type below to start a concise data-entry form.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className={`${btn} bg-indigo-600`}>
                            Animal Loss
                        </button>
                        <button className={`${btn} bg-green-600`}>
                            Human Loss
                        </button>
                        <button className={`${btn} bg-yellow-500`} style={{ color: '#1f2937' }}>
                            House Damage
                        </button>
                        <button className={`${btn} bg-emerald-600`}>
                            Crop Loss
                        </button>
                    </div>
                </div>

                <div className={`${card}`}>
                    <h2 className="text-lg font-semibold mb-4">Report Preview</h2>
                    <p className="text-sm text-gray-600">Fill fields after selecting a report type. This panel will show the form and quick summary.</p>

                    <div className="mt-4 border border-dashed border-gray-200 rounded p-4 h-48 flex items-center justify-center text-gray-400">
                        No report selected
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;