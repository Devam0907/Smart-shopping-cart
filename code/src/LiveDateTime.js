import React, { useEffect, useState } from 'react';

const LiveDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString();
  };

  return (
    <div className="live-date-time">
      {formatDateTime(currentDateTime)}
    </div>
  );
};

export default LiveDateTime;
