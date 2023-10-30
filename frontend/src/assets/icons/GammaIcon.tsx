import { SVGProps } from 'react';

const GammaIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="pink"
      strokeWidth="0"
      role="img"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title></title>
      <path d="M18.302 0H22v.003L10.674 24H7.662L2 12h3.727l3.449 7.337z"></path>
    </svg>
  );
};

export default GammaIcon;
