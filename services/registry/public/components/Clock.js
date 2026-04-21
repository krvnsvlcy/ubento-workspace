import React, { useState, useEffect } from 'react';

export default function Clock(props) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return React.createElement('div', {
    style: {
      padding: '12px 20px',
      background: props.bg || '#171717',
      borderRadius: '12px',
      color: 'white',
      fontFamily: 'monospace',
      textAlign: 'center',
      border: '1px solid #262626'
    }
  }, [
    React.createElement('div', { key: 'label', style: { fontSize: '10px', opacity: 0.5, fontWeight: 'bold', marginBottom: '2px' } }, props.label || 'SYSTEM TIME'),
    React.createElement('div', { key: 'time', style: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' } }, time)
  ]);
}
