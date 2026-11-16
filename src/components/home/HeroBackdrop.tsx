/**
 * Vector decoration behind the hero: soft map lines, mountain shapes, two location pins joined
 * by a dotted route. Purely decorative (hidden from assistive tech), no photos.
 */
export function HeroBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef4fa" />
        </linearGradient>
      </defs>
      <rect width="1440" height="620" fill="url(#hero-sky)" />

      {/* Soft map lines */}
      <g stroke="#dde6ef" strokeWidth="2" opacity="0.9">
        <path d="M760 40 L1000 160 L1180 60 L1440 150" />
        <path d="M820 0 L900 220 L1120 300 L1440 230" />
        <path d="M980 20 L1060 240 L1300 330" />
        <path d="M700 120 L1000 300 L1440 340" />
        <path d="M1240 0 L1180 170 L1440 80" />
      </g>

      {/* Mountains */}
      <path
        d="M0 470 L120 400 L230 450 L370 330 L500 440 L630 370 L790 470 L930 350 L1060 430 L1200 320 L1320 400 L1440 350 L1440 620 L0 620 Z"
        fill="#e4edf5"
      />
      <path
        d="M0 520 L170 450 L310 500 L480 420 L640 505 L820 440 L990 520 L1150 450 L1300 505 L1440 470 L1440 620 L0 620 Z"
        fill="#f0f5fa"
      />

      {/* Route and pins */}
      <path
        d="M913 150 C 1000 185 1070 190 1150 165 S 1260 120 1275 108"
        stroke="#3ca500"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 8"
      />
      <g transform="translate(897 118)">
        <path d="M16 38C16 38 3 24 3 15a13 13 0 0 1 26 0c0 9-13 23-13 23Z" fill="#00306c" />
        <circle cx="16" cy="15" r="5" fill="#ffffff" />
      </g>
      <g transform="translate(1258 70)">
        <path d="M16 38C16 38 3 24 3 15a13 13 0 0 1 26 0c0 9-13 23-13 23Z" fill="#3ca500" />
        <circle cx="16" cy="15" r="5" fill="#ffffff" />
      </g>
    </svg>
  );
}

/** Navy and green swoosh along the bottom edge of the hero. */
export function HeroSwoosh() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-36 lg:h-44"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path d="M880 180 C 1080 150 1280 70 1440 0 L1440 38 C 1290 110 1090 178 880 206 Z" fill="#3ca500" />
      <path
        d="M0 70 C 260 150 620 160 960 120 C 1140 98 1300 70 1440 30 L1440 180 L0 180 Z"
        fill="#002048"
      />
    </svg>
  );
}
