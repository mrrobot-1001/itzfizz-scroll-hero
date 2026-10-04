/** Top-down sports car, facing right. Pure SVG so it stays crisp at any size. */
export default function Car({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 200"
      className={className}
      role="img"
      aria-label="Sports car seen from above"
    >
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6a3d" />
          <stop offset="0.5" stopColor="#ff3d14" />
          <stop offset="1" stopColor="#d92a06" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0d12" />
          <stop offset="1" stopColor="#2a3240" />
        </linearGradient>
        <filter id="car-shadow" x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* soft ground shadow */}
      <rect x="34" y="24" width="400" height="160" rx="70" fill="#000" opacity="0.55" filter="url(#car-shadow)" />

      {/* tyres peeking out from under the body */}
      <g fill="#0a0a0a">
        <rect x="78" y="10" width="64" height="24" rx="8" />
        <rect x="78" y="166" width="64" height="24" rx="8" />
        <rect x="318" y="12" width="62" height="22" rx="8" />
        <rect x="318" y="166" width="62" height="22" rx="8" />
      </g>

      {/* body */}
      <path
        d="M30 62C30 36 58 24 108 21L332 18C392 18 426 42 434 78V122C426 158 392 182 332 182L108 179C58 176 30 164 30 138Z"
        fill="url(#car-body)"
      />
      {/* body highlight line */}
      <path d="M60 40C120 30 300 26 360 34" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" fill="none" />

      {/* racing stripes on hood and boot */}
      <g fill="#111" opacity="0.85">
        <rect x="300" y="88" width="132" height="8" rx="2" />
        <rect x="300" y="104" width="132" height="8" rx="2" />
        <rect x="32" y="88" width="108" height="8" rx="2" />
        <rect x="32" y="104" width="108" height="8" rx="2" />
      </g>

      {/* hood vents */}
      <g stroke="#7a1300" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <path d="M352 56L382 60" />
        <path d="M352 144L382 140" />
      </g>

      {/* windscreen, roof, rear window */}
      <path d="M302 44C318 70 318 130 302 156L254 146C262 120 262 80 254 54Z" fill="url(#car-glass)" />
      <rect x="166" y="50" width="92" height="100" rx="16" fill="#c52404" />
      <rect x="176" y="60" width="72" height="80" rx="12" fill="#e2330c" />
      <path d="M168 56L138 63C129 86 129 114 138 137L168 144Z" fill="url(#car-glass)" />

      {/* side mirrors */}
      <ellipse cx="290" cy="22" rx="12" ry="7" fill="#c52404" />
      <ellipse cx="290" cy="178" rx="12" ry="7" fill="#c52404" />

      {/* headlights */}
      <g fill="#fff6d6">
        <path d="M402 34C418 44 427 58 431 70L418 68C413 55 406 46 396 40Z" />
        <path d="M402 166C418 156 427 142 431 130L418 132C413 145 406 154 396 160Z" />
      </g>

      {/* tail lights */}
      <g fill="#ff1a1a">
        <rect x="31" y="44" width="9" height="22" rx="3" />
        <rect x="31" y="134" width="9" height="22" rx="3" />
      </g>
    </svg>
  );
}
