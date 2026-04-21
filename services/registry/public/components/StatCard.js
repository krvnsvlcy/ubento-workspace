import React from 'react';

export default function StatCard({ label, value, color, trend }) {
  return React.createElement('div', {
    style: {
      background: '#171717',
      borderRadius: '16px',
      padding: '20px',
      minWidth: '180px',
      border: '1px solid #262626',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  }, [
    React.createElement('div', { key: 'label', style: { color: '#a3a3a3', fontSize: '12px', fontWeight: '600' } }, label),
    React.createElement('div', { key: 'val-row', style: { display: 'flex', alignItems: 'baseline', gap: '8px' } }, [
      React.createElement('div', { key: 'val', style: { color: color || '#ffffff', fontSize: '28px', fontWeight: '700' } }, value),
      trend && React.createElement('div', { key: 'trend', style: { color: trend.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '11px', fontWeight: 'bold' } }, trend)
    ])
  ]);
}
