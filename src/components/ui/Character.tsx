import { cn } from "@/lib/utils";

/**
 * Friendly flat-style characters used across the site (hero, empty states, 404…).
 * Pure SVG — no image files, crisp at any size, and themed with the site palette.
 */

export type CharacterVariant = "builder" | "painter" | "shopkeeper" | "helper";

const skin = "#E7B28C";
const skinShade = "#D39A74";
const hair = "#2E2A2B";

function Head({ variant }: { variant: CharacterVariant }) {
  return (
    <g>
      {/* neck */}
      <rect x="92" y="84" width="16" height="16" rx="6" fill={skinShade} />
      {/* ears */}
      <circle cx="70" cy="64" r="6" fill={skinShade} />
      <circle cx="130" cy="64" r="6" fill={skinShade} />
      {/* face */}
      <circle cx="100" cy="62" r="30" fill={skin} />
      {/* hair */}
      {variant === "shopkeeper" ? (
        <path d="M71 58c0-20 13-30 29-30s29 10 29 30c-5-9-10-12-14-12-6 4-24 4-30 0-4 0-9 3-14 12Z" fill="#8C8C8C" />
      ) : (
        <path d="M70 60c0-20 12-32 30-32s30 12 30 32c-6-10-14-15-30-15S76 50 70 60Z" fill={hair} />
      )}
      {/* eyes */}
      <circle cx="89" cy="63" r="3.2" fill={hair} />
      <circle cx="111" cy="63" r="3.2" fill={hair} />
      <circle cx="90" cy="62" r="1" fill="#fff" />
      <circle cx="112" cy="62" r="1" fill="#fff" />
      {/* brows */}
      <path d="M84 55q5-3 10 0M106 55q5-3 10 0" stroke={hair} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* cheeks */}
      <circle cx="82" cy="72" r="4.5" fill="#F09F72" opacity="0.35" />
      <circle cx="118" cy="72" r="4.5" fill="#F09F72" opacity="0.35" />
      {/* nose + smile */}
      <path d="M100 64v6" stroke={skinShade} strokeWidth="2.5" strokeLinecap="round" />
      {variant === "shopkeeper" && <path d="M89 76c4-3 8-3 11-1 3-2 7-2 11 1" stroke="#6B6B6B" strokeWidth="4" strokeLinecap="round" fill="none" />}
      <path d="M91 79q9 7 18 0" stroke="#8A4B3A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {variant === "shopkeeper" && (
        <>
          {/* tilak + glasses */}
          <path d="M100 42v6" stroke="#E5845A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="89" cy="63" r="7.5" stroke="#3C4A4F" strokeWidth="2" fill="none" />
          <circle cx="111" cy="63" r="7.5" stroke="#3C4A4F" strokeWidth="2" fill="none" />
          <path d="M96.5 63h7" stroke="#3C4A4F" strokeWidth="2" />
        </>
      )}
    </g>
  );
}

function HardHat() {
  return (
    <g>
      <path d="M68 50c0-19 14-30 32-30s32 11 32 30Z" fill="#F09F72" />
      <path d="M96 20h8v28h-8z" fill="#F6B994" />
      <rect x="62" y="46" width="76" height="8" rx="4" fill="#E5845A" />
    </g>
  );
}

function Cap() {
  return (
    <g>
      <path d="M70 48c0-16 13-26 30-26s30 10 30 26Z" fill="#9CC2C5" />
      <path d="M100 44c16 0 34 2 44 8-8 2-26 2-44-2Z" fill="#4E8189" />
      <circle cx="100" cy="23" r="3" fill="#4E8189" />
    </g>
  );
}

const arm = (d: string, color: string) => <path d={d} stroke={color} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
const hand = (x: number, y: number) => <circle cx={x} cy={y} r="8.5" fill={skin} />;

export function Character({ variant, className, title, animated }: { variant: CharacterVariant; className?: string; title?: string; animated?: boolean }) {
  const shirt = { builder: "#4E8189", painter: "#FBF6EF", shopkeeper: "#F6B994", helper: "#9CC2C5" }[variant];
  const pants = { builder: "#27444B", painter: "#4E8189", shopkeeper: "#D9C7B2", helper: "#27444B" }[variant];

  return (
    <svg viewBox="0 0 200 270" className={cn("overflow-visible", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {/* shadow */}
      <ellipse cx="100" cy="258" rx="54" ry="8" fill="#132429" opacity="0.12" />

      <g className={animated ? "skt-bob" : undefined}>
      {/* legs + shoes */}
      <rect x="75" y="176" width="21" height="72" rx="10" fill={pants} />
      <rect x="104" y="176" width="21" height="72" rx="10" fill={pants} />
      <ellipse cx="84" cy="250" rx="16" ry="8" fill="#3C4A4F" />
      <ellipse cx="116" cy="250" rx="16" ry="8" fill="#3C4A4F" />

      {/* back arm (behind body) */}
      {variant === "builder" && (
        <>
          {arm("M74 112 62 146 68 176", shirt)}
          {hand(68, 180)}
        </>
      )}
      {variant === "painter" && (
        <>
          {arm("M74 112 60 144 70 170", shirt)}
          {hand(70, 174)}
          {/* paint bucket */}
          <path d="M52 176h36l-4 34H56Z" fill="#F09F72" />
          <ellipse cx="70" cy="176" rx="18" ry="5" fill="#E5845A" />
          <path d="M54 176q16-22 32 0" stroke="#3C4A4F" strokeWidth="2.5" fill="none" />
        </>
      )}
      {variant === "helper" && (
        <>
          {arm("M74 112 62 146 68 176", shirt)}
          {hand(68, 180)}
        </>
      )}

      {/* body */}
      {variant === "shopkeeper" ? (
        <path d="M70 110c0-8 6-12 14-12h32c8 0 14 4 14 12l6 96H64Z" fill={shirt} />
      ) : (
        <path d="M70 110c0-8 6-12 14-12h32c8 0 14 4 14 12l4 76H66Z" fill={shirt} />
      )}
      {variant === "shopkeeper" && (
        <>
          <path d="M100 98v42" stroke="#E5845A" strokeWidth="2" />
          {[110, 122, 134].map((y) => (
            <circle key={y} cx="100" cy={y} r="2" fill="#A95433" />
          ))}
        </>
      )}
      {variant === "builder" && (
        <>
          {/* hi-vis vest */}
          <path d="M78 102h14l-2 84H72Z M108 102h14l6 84h-18Z" fill="#F09F72" />
          <path d="M73 150h19M108 150h20" stroke="#FFF6F0" strokeWidth="4" />
        </>
      )}
      {variant === "painter" && (
        <>
          {/* overalls with paint splashes */}
          <path d="M80 124h40l6 62H74Z" fill="#4E8189" />
          <path d="M84 124 80 100M116 124l4-24" stroke="#4E8189" strokeWidth="5" strokeLinecap="round" />
          <circle cx="92" cy="146" r="4" fill="#F09F72" />
          <circle cx="110" cy="164" r="3" fill="#F6B994" />
          <circle cx="104" cy="138" r="2.5" fill="#E8A5A0" />
        </>
      )}
      {variant === "helper" && <path d="M86 98h28l-14 18Z" fill="#fff" opacity="0.8" />}

      {/* front arm + props */}
      {variant === "builder" && (
        <g className={animated ? "skt-wave" : undefined} style={{ transformOrigin: "126px 112px" }}>
          {arm("M126 112 146 132 152 102", shirt)}
          {hand(153, 96)}
          {/* thumbs up */}
          <rect x="150" y="80" width="6" height="12" rx="3" fill={skin} />
        </g>
      )}
      {variant === "painter" && (
        <g className={animated ? "skt-paint" : undefined} style={{ transformOrigin: "126px 112px" }}>
          {arm("M126 112 146 134 150 104", shirt)}
          {hand(150, 100)}
          {/* roller */}
          <path d="M150 100 150 60 176 60 176 44" stroke="#3C4A4F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="140" y="30" width="54" height="16" rx="8" fill="#F09F72" />
          <rect x="140" y="30" width="54" height="6" rx="3" fill="#F6B994" />
        </g>
      )}
      {variant === "shopkeeper" && (
        <>
          {/* namaste */}
          {arm("M74 112 82 142 96 132", shirt)}
          {arm("M126 112 118 142 104 132", shirt)}
          <path d="M94 138c0-12 3-20 6-24 3 4 6 12 6 24Z" fill={skin} />
        </>
      )}
      {variant === "helper" && (
        <>
          {arm("M126 112 150 140 162 122", shirt)}
          {hand(163, 118)}
          {/* magnifier */}
          <path d="M166 112 176 96" stroke="#3C4A4F" strokeWidth="6" strokeLinecap="round" />
          <circle cx="184" cy="82" r="17" fill="#E4EFF3" opacity="0.8" stroke="#3C4A4F" strokeWidth="5" />
          <path d="M176 76q4-6 10-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      <Head variant={variant} />
      {variant === "builder" && <HardHat />}
      {variant === "painter" && <Cap />}
      </g>
    </svg>
  );
}
