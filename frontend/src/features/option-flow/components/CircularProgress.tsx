import React from 'react';

interface CircularProgressProps {
  color: string | any;
  percentage: number | any;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  color,
  percentage,
}) => {
  const strokeWidth = 6;
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (!percentage ? 0 : percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg
        className="circular-progress"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <circle
          className="circular-progress-background"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circular-progress-foreground"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 30 30 )`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[14px] font-bold text-white">
          {!percentage ? 0 : percentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
