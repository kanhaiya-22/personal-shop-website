import Image from "next/image";
import { icon3dKeys } from "@/data/icon-registry";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./Icon";

/**
 * Colourful 3D icon (Microsoft Fluent Emoji, MIT) from /public/icons/3d.
 * Falls back to the line icon when a 3D version isn't available.
 */
export function Icon3D({ name, fallback, size = 48, className }: { name: string; fallback?: string; size?: number; className?: string }) {
  if (icon3dKeys.has(name)) {
    return (
      <Image
        src={`/icons/3d/${name}.png`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        sizes={`${size}px`}
        className={cn("pointer-events-none object-contain drop-shadow-[0_6px_10px_rgba(19,36,41,0.18)] select-none", className)}
      />
    );
  }
  return <CategoryIcon name={fallback ?? name} className={className} style={{ width: size * 0.6, height: size * 0.6 }} strokeWidth={1.6} />;
}
