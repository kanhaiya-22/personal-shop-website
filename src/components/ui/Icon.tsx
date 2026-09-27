import {
  BrickWall,
  Brush,
  Cable,
  Construction,
  Container,
  Droplets,
  FlaskConical,
  Frame,
  Hammer,
  House,
  Layers,
  LayoutGrid,
  type LucideIcon,
  type LucideProps,
  Mountain,
  Package,
  PaintBucket,
  PaintRoller,
  Paintbrush,
  Pipette,
  Ruler,
  ShieldCheck,
  Shovel,
  Sparkles,
  SprayCan,
  Bath,
  TreePine,
  Warehouse,
  Wrench,
  Zap,
  Calculator,
} from "lucide-react";

/** Maps the `icon` keys used in data files to icons. Add new keys here. */
const icons: Record<string, LucideIcon> = {
  cement: Package,
  steel: Construction,
  bricks: BrickWall,
  sand: Mountain,
  chemicals: FlaskConical,
  waterproofing: Droplets,
  adhesives: Layers,
  plumbing: Wrench,
  pipes: Container,
  electrical: Zap,
  cable: Cable,
  hardware: Hammer,
  tools: Ruler,
  tiles: LayoutGrid,
  sanitary: Bath,
  roofing: Warehouse,
  plywood: TreePine,
  other: Shovel,
  interior: House,
  exterior: PaintBucket,
  primer: PaintRoller,
  putty: Frame,
  enamel: SprayCan,
  wood: Paintbrush,
  metal: ShieldCheck,
  texture: Sparkles,
  thinner: Pipette,
  brush: Brush,
  sealant: Pipette,
  estimate: Calculator,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name] ?? Package;
  return <Icon aria-hidden="true" {...props} />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.8.58.7 5.66.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.5l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}
