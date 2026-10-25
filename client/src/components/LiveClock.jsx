import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [istTime, setIstTime] = useState('');
  const [istDate, setIstDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format IST Time
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      // Format IST Date
      const dateStr = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      setIstTime(timeStr);
      setIstDate(dateStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="live-clock-badge d-flex align-items-center gap-2 px-3 py-1 rounded-pill">
      <span className="live-pulse"></span>
      <div className="d-flex flex-column text-start lh-1">
        <div className="d-flex align-items-center gap-1">
          <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-1 py-0 fw-bold" style={{ fontSize: '0.65rem' }}>
            LIVE IST
          </span>
          <span className="font-monospace fw-semibold text-warning" style={{ fontSize: '0.82rem' }}>
            {istTime}
          </span>
        </div>
        <span className="text-secondary" style={{ fontSize: '0.7rem' }}>
          {istDate} (UTC+05:30)
        </span>
      </div>
    </div>
  );
};

export default LiveClock;
