import React from 'react';

interface GreenCircularProgressProps {
  className?: string;
}
const GreenCircularProgress: React.FC<GreenCircularProgressProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="118"
      height="119"
      viewBox="0 0 118 119"
      fill="none"
      className={props.className}
    >
      <g filter="url(#filter0_d_253_247)">
        <path
          d="M26.5696 67.6262C28.2377 73.6975 31.655 79.1596 36.4062 83.3488C41.1575 87.538 47.0381 90.2739 53.3337 91.2242C59.6293 92.1744 66.0687 91.2981 71.8696 88.7016C77.6705 86.1051 82.5832 81.9003 86.0106 76.5981C89.4381 71.2959 91.2328 65.1245 91.1767 58.8337C91.1207 52.543 89.2162 46.4038 85.6948 41.1619C82.1734 35.9201 77.1866 31.8014 71.3403 29.3063C65.494 26.8111 59.0399 26.0469 52.7623 27.1064L52.8476 27.5998C59.0285 26.5565 65.3831 27.309 71.1393 29.7657C76.8955 32.2224 81.8055 36.2776 85.2726 41.4387C88.7398 46.5997 90.6149 52.6443 90.6701 58.8381C90.7253 65.0319 88.9582 71.1082 85.5836 76.3288C82.209 81.5493 77.372 85.6893 71.6605 88.2457C65.949 90.8022 59.6088 91.665 53.4102 90.7294C47.2117 89.7938 41.4216 87.1001 36.7436 82.9754C32.0656 78.8508 28.701 73.4729 27.0586 67.4951L26.5696 67.6262Z"
          stroke="#4E9B47"
          strokeWidth="7"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_253_247"
          x="0.0502014"
          y="0.161072"
          width="117.646"
          height="117.917"
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
            values="0 0 0 0 0.305882 0 0 0 0 0.607843 0 0 0 0 0.278431 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_253_247"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_253_247"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default GreenCircularProgress;
