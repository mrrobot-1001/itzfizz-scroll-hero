/** Top-down sports car, facing right. Pure SVG so it stays crisp at any size. */

// Tyres sit under the wheel-arch flares; only their outer shoulder peeks out.
const TYRES = [
  { x: 80, y: 13 }, // rear, top
  { x: 80, y: 159 }, // rear, bottom
  { x: 305, y: 14 }, // front, top
  { x: 305, y: 160 }, // front, bottom
];
const TYRE_LENGTH = 64;
const TYRE_WIDTH = 27;
const TREAD_STEP = 7;

function Tyre({ x, y, id }: { x: number; y: number; id: string }) {
  const treads = [];
  for (let tx = x + 4; tx < x + TYRE_LENGTH - 2; tx += TREAD_STEP) treads.push(tx);

  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={TYRE_LENGTH} height={TYRE_WIDTH} rx="9" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={TYRE_LENGTH} height={TYRE_WIDTH} fill="url(#car-tyre)" />
        {treads.map((tx) => (
          <line key={tx} x1={tx} y1={y} x2={tx} y2={y + TYRE_WIDTH} stroke="#000" strokeOpacity="0.45" strokeWidth="2" />
        ))}
      </g>
    </g>
  );
}

export default function Car({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 200" className={className} role="img" aria-label="Sports car seen from above">
      <defs>
        {/* Darker at the flanks, lit along the spine: reads as a rounded body. */}
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b82304" />
          <stop offset="0.16" stopColor="#f2401a" />
          <stop offset="0.5" stopColor="#ff6b3e" />
          <stop offset="0.84" stopColor="#f2401a" />
          <stop offset="1" stopColor="#b82304" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0d12" />
          <stop offset="1" stopColor="#2a3240" />
        </linearGradient>
        {/* Rubber is rounded across its width, so shade it like a cylinder. */}
        <linearGradient id="car-tyre" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a0a" />
          <stop offset="0.45" stopColor="#2b2b2b" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <filter id="car-shadow" x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* soft ground shadow */}
      <rect x="30" y="22" width="404" height="156" rx="70" fill="#000" opacity="0.5" filter="url(#car-shadow)" />

      {TYRES.map((t, i) => (
        <Tyre key={i} x={t.x} y={t.y} id={`car-tyre-clip-${i}`} />
      ))}

      {/* body, with flared arches over each axle and a narrower waist at the doors */}
      <path
        d="M22 100C22 62 26 44 40 34C50 26 64 20 84 19L140 19C152 19 160 26 172 27L284 27C296 27 302 21 314 20L368 20C390 21 408 30 420 44C430 56 434 76 434 100C434 124 430 144 420 156C408 170 390 179 368 180L314 180C302 179 296 173 284 173L172 173C160 174 152 181 140 181L84 181C64 180 50 174 40 166C26 156 22 138 22 100Z"
        fill="url(#car-body)"
      />
      {/* body highlight */}
      <path d="M70 44C140 37 290 35 362 42" stroke="#fff" strokeOpacity="0.22" strokeWidth="3" fill="none" />

      {/* racing stripes on hood and boot */}
      <g fill="#111" opacity="0.85">
        <rect x="300" y="88" width="132" height="8" rx="2" />
        <rect x="300" y="104" width="132" height="8" rx="2" />
        <rect x="26" y="88" width="114" height="8" rx="2" />
        <rect x="26" y="104" width="114" height="8" rx="2" />
      </g>

      {/* hood vents */}
      <g stroke="#7a1300" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <path d="M352 58L382 62" />
        <path d="M352 142L382 138" />
      </g>

      {/* windscreen, roof, rear window */}
      <path d="M302 44C318 70 318 130 302 156L254 146C262 120 262 80 254 54Z" fill="url(#car-glass)" />
      <rect x="166" y="50" width="92" height="100" rx="16" fill="#c52404" />
      <rect x="176" y="60" width="72" height="80" rx="12" fill="#e2330c" />
      <path d="M168 56L138 63C129 86 129 114 138 137L168 144Z" fill="url(#car-glass)" />

      {/* side mirrors on the door line */}
      <ellipse cx="262" cy="25" rx="11" ry="6" fill="#c52404" />
      <ellipse cx="262" cy="175" rx="11" ry="6" fill="#c52404" />

      {/* headlights */}
      <g fill="#fff6d6">
        <path d="M398 32C414 40 424 52 430 66L418 66C413 54 406 46 394 39Z" />
        <path d="M398 168C414 160 424 148 430 134L418 134C413 146 406 154 394 161Z" />
      </g>

      {/* tail lights */}
      <g fill="#ff1a1a">
        <rect x="27" y="46" width="9" height="22" rx="3" />
        <rect x="27" y="132" width="9" height="22" rx="3" />
      </g>
    </svg>
  );
}
