import * as React from "react";
const Logo = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={300}
    height={200}
    viewBox="0 0 600 400"
    {...props}
  >
    <rect width="100%" height="100%" fill="none" />
    {/* <path fill="#f4b000" d="M90 100h70l-30 15h30l-30 15h30l-50 15z" /> */}
    <path 
  fill="#f4b000" 
  d="M90 100h70l-30 15h30l-30 15h30l-50 15z" 
  transform="rotate(180 125 122.5)" 
/>
    <text
      x={180}
      y={130}
      fill="#fff"
      fontFamily="Arial, sans-serif"
      fontSize={64}
      fontWeight="bold"
    >
      {"S.H"}
    </text>
    <text
      x={180}
      y={180}
      fill="#fff"
      fontFamily="Arial, sans-serif"
      fontSize={48}
      fontWeight="bold"
      letterSpacing={3}
    >
      {"CARGO"}
    </text>
    <text
      x={180}
      y={230}
      fill="#f4b000"
      fontFamily="Arial, sans-serif"
      fontSize={36}
      fontWeight="bold"
      letterSpacing={4}
    >
      {"FAST ,TRUST"}
    </text>
  </svg>
);
export default Logo;
