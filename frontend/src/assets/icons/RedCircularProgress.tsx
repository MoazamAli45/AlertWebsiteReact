import React from 'react';

const RedCircularProgress: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="93"
      height="114"
      viewBox="0 0 93 114"
      fill="none"
    >
      <g filter="url(#filter0_d_253_266)">
        <path
          d="M51.5774 86.5713C57.8046 82.3872 62.3888 76.2181 64.5635 69.0955C66.7381 61.973 66.3714 54.3289 63.5247 47.4415C60.6779 40.554 55.5236 34.8408 48.9238 31.2571C42.324 27.6734 34.6787 26.4365 27.2664 27.7533L27.356 28.2459C34.6541 26.9494 42.1816 28.1672 48.6798 31.6957C55.1779 35.2241 60.2527 40.8493 63.0556 47.6307C65.8585 54.412 66.2196 61.9383 64.0784 68.951C61.9372 75.9638 57.4237 82.0378 51.2925 86.1575L51.5774 86.5713Z"
          stroke="#F52203"
          strokeWidth="7"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_253_266"
          x="0.747253"
          y="0.759094"
          width="91.7352"
          height="112.294"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="11.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.960784 0 0 0 0 0.133333 0 0 0 0 0.0117647 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_253_266"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_253_266"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default RedCircularProgress;
