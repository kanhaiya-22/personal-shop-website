import { locale } from "@/i18n";

/**
 * Animated phone: call waves pulse around it while a short WhatsApp chat
 * plays out. Pure SVG + CSS; static (fully shown) for reduced-motion users.
 */
export function ChatIllustration({ className }: { className?: string }) {
  const msgs =
    locale === "hi"
      ? { q: "नमस्ते! सीमेंट उपलब्ध है?", a: "जी हाँ! जानकारी भेज रहे हैं 👍", q2: "धन्यवाद 🙏" }
      : { q: "Namaste! Is cement available?", a: "Yes! Sending details 👍", q2: "Thank you 🙏" };
  return (
    <svg viewBox="0 0 260 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="chat-phone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4EFF3" />
        </linearGradient>
        <linearGradient id="chat-wa" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3DDC84" />
          <stop offset="1" stopColor="#168A45" />
        </linearGradient>
      </defs>

      {/* call waves */}
      {[0, 1, 2].map((i) => (
        <circle key={i} className="skt-ring" cx="130" cy="150" r="96" fill="none" stroke="#F6B994" strokeWidth="3" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}

      {/* phone */}
      <g className="skt-phone">
        <rect x="70" y="30" width="120" height="240" rx="24" fill="#132429" />
        <rect x="78" y="42" width="104" height="216" rx="16" fill="url(#chat-phone)" />
        <rect x="112" y="48" width="36" height="6" rx="3" fill="#132429" opacity="0.8" />
        {/* chat header */}
        <rect x="78" y="58" width="104" height="30" fill="url(#chat-wa)" />
        <circle cx="94" cy="73" r="8" fill="#FFFFFF" opacity="0.9" />
        <text x="94" y="77" textAnchor="middle" fontSize="8" fontWeight="700" fill="#168A45">
          SKT
        </text>
        <rect x="108" y="68" width="50" height="5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
        <rect x="108" y="77" width="30" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />

        {/* messages */}
        <g className="skt-msg" style={{ animationDelay: "0.2s" }}>
          <rect x="86" y="100" width="88" height="30" rx="10" fill="#FFFFFF" stroke="#E4EBE9" />
          <text x="92" y="119" fontSize="7.5" fill="#1D2B30">
            {msgs.q}
          </text>
        </g>
        <g className="skt-typing">
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={148 + i * 8} cy="148" r="2.6" fill="#168A45" style={{ animationDelay: `${i * 0.15}s` }} className="skt-dot" />
          ))}
        </g>
        <g className="skt-msg" style={{ animationDelay: "2.2s" }}>
          <rect x="86" y="138" width="88" height="30" rx="10" fill="#DCF8C6" />
          <text x="92" y="157" fontSize="7.5" fill="#1D2B30">
            {msgs.a}
          </text>
        </g>
        <g className="skt-msg" style={{ animationDelay: "3.4s" }}>
          <rect x="120" y="176" width="54" height="24" rx="10" fill="#FFFFFF" stroke="#E4EBE9" />
          <text x="127" y="192" fontSize="7.5" fill="#1D2B30">
            {msgs.q2}
          </text>
        </g>
        {/* input bar */}
        <rect x="86" y="228" width="72" height="18" rx="9" fill="#FFFFFF" stroke="#E4EBE9" />
        <circle cx="168" cy="237" r="9" fill="url(#chat-wa)" />
        <path d="M164.5 237h7m-3-3 3 3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* floating call + whatsapp badges */}
      <g className="skt-float-a">
        <circle cx="42" cy="92" r="22" fill="#F09F72" />
        <path d="M34 86c0 9 7 16 16 16l3-4-5-3-3 2c-3-1-5-3-6-6l2-3-3-5Z" fill="#fff" />
      </g>
      <g className="skt-float-b">
        <circle cx="220" cy="210" r="22" fill="url(#chat-wa)" />
        <path d="M211 219l2-6a9 9 0 1 1 4 4Z" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
