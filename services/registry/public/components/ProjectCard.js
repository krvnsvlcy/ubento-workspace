import React from 'react';

export default function ProjectCard({ title, tag, tagColor, bg, progress }) {
  return React.createElement('div', {
    style: {
      background: bg || '#1e1b4b',
      borderRadius: '24px',
      padding: '24px',
      height: '180px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid rgba(255,255,255,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, [
    React.createElement('div', { key: 'top' }, [
      React.createElement('div', { 
        key: 'tag', 
        style: { 
          color: tagColor || '#818cf8', 
          fontSize: '10px', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          letterSpacing: '0.5px' 
        } 
      }, tag),
      React.createElement('div', { 
        key: 'title', 
        style: { color: 'white', fontSize: '20px', fontWeight: '700', marginTop: '4px' } 
      }, title),
    ]),
    React.createElement('div', { key: 'bottom' }, [
      React.createElement('div', { 
        key: 'progress-bg', 
        style: { height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' } 
      }, [
        React.createElement('div', { 
          key: 'progress-val', 
          style: { height: '100%', width: `${progress || 0}%`, background: 'white', borderRadius: '2px' } 
        })
      ]),
      React.createElement('div', { 
        key: 'progress-label', 
        style: { color: 'rgba(255,255,255,0.6)', fontSize: '10px', marginTop: '8px', textAlign: 'right' } 
      }, `${progress || 0}% Completed`)
    ])
  ]);
}
