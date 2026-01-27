import React from 'react';

const EggBackground = () => {
  return (
    <svg
      className="egg-background"
      viewBox="0 0 1200 1200"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="1200" height="1200" fill="#fff9e6" />

      {/* Large yellow blob top left */}
      <circle cx="150" cy="150" r="120" fill="#ffc857" opacity="0.4" />

      {/* Large yellow blob bottom right */}
      <circle cx="1050" cy="1050" r="140" fill="#ffc857" opacity="0.35" />

      {/* Yellow blob top right */}
      <circle cx="1100" cy="200" r="100" fill="#ffd966" opacity="0.3" />

      {/* Yellow blob bottom left */}
      <circle cx="100" cy="900" r="110" fill="#ffb700" opacity="0.35" />

      {/* Decorative egg 1 - Top center */}
      <g transform="translate(300, 200)">
        <ellipse cx="0" cy="0" rx="80" ry="95" fill="#ffffff" stroke="#333333" strokeWidth="6" />
        <circle cx="0" cy="-20" r="40" fill="#ffc857" stroke="#333333" strokeWidth="5" />
        <circle cx="-8" cy="-35" r="6" fill="#333333" />
        <path d="M 5 -10 Q 15 -5 20 5" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Decorative egg 2 - Center right */}
      <g transform="translate(900, 400)">
        <ellipse cx="0" cy="0" rx="85" ry="100" fill="#ffffff" stroke="#333333" strokeWidth="6" />
        <circle cx="0" cy="-25" r="45" fill="#ffc857" stroke="#333333" strokeWidth="5" />
        <circle cx="-10" cy="-42" r="6" fill="#333333" />
        <path d="M 5 -12 Q 18 -6 25 8" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Decorative egg 3 - Bottom left */}
      <g transform="translate(250, 850)">
        <ellipse cx="0" cy="0" rx="75" ry="90" fill="#ffffff" stroke="#333333" strokeWidth="6" />
        <circle cx="0" cy="-18" r="38" fill="#ffc857" stroke="#333333" strokeWidth="5" />
        <circle cx="-7" cy="-32" r="6" fill="#333333" />
        <path d="M 3 -8 Q 12 -3 18 5" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Decorative egg 4 - Bottom right */}
      <g transform="translate(950, 900)">
        <ellipse cx="0" cy="0" rx="80" ry="95" fill="#ffffff" stroke="#333333" strokeWidth="6" />
        <circle cx="0" cy="-20" r="40" fill="#ffc857" stroke="#333333" strokeWidth="5" />
        <circle cx="-8" cy="-35" r="6" fill="#333333" />
        <path d="M 5 -10 Q 15 -5 20 5" fill="none" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Wavy lines connecting eggs */}
      <path d="M 0 300 Q 150 250 350 350 T 650 400 T 950 350" fill="none" stroke="#333333" strokeWidth="5" opacity="0.3" />
      <path d="M 50 800 Q 200 750 300 850 T 600 900 T 950 800" fill="none" stroke="#333333" strokeWidth="5" opacity="0.3" />
    </svg>
  );
};

export default EggBackground;
