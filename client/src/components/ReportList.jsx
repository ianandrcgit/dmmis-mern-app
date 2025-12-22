import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get('/reports/all');
        if (res.data.success) setReports(res.data.reports);
      } catch (err) { console.error("Error fetching reports", err); }
    };
    fetchReports();
  }, []);

  return (
    <div style={{ marginTop: '20px', background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h3>Submitted Incident Reports</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Beneficiary</th>
            <th style={cellStyle}>Type</th>
            <th style={cellStyle}>Count/Area</th>
            <th style={cellStyle}>Location (Village/Taluka)</th>
            <th style={cellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={cellStyle}>{new Date(report.dateOfIncident).toLocaleDateString()}</td>
              <td style={cellStyle}>{report.beneficiaryName}</td>
              <td style={cellStyle}><b>{report.type.toUpperCase()}</b></td>
              <td style={cellStyle}>{report.count}</td>
              <td style={cellStyle}>{report.village}, {report.taluka}</td>
              <td style={cellStyle}><span style={statusBadge}>{report.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = { padding: '12px', fontSize: '0.9rem' };
const statusBadge = { background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' };

export default ReportList;