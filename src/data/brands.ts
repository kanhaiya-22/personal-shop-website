import type { Brand } from "@/types";

/**
 * SEED DATA — copied into storage/content.json on first start, then managed
 * from Admin → Brands.
 *
 * ⚠ These are SAMPLE entries (isSample: true) of brands commonly sold by
 *   Indian building-material shops. Confirm the ones you actually deal in,
 *   delete the rest, and upload logos from the admin panel.
 */
export const brands: Brand[] = [
  { id: "ultratech", logo: "/brands/ultratech.png", name: "UltraTech Cement", categories: ["cement"], isSample: true },
  { id: "acc", logo: "/brands/acc.png", name: "ACC", categories: ["cement"], isSample: true },
  { id: "tata-tiscon", logo: "/brands/tata-tiscon.png", name: "Tata Tiscon", categories: ["steel"], isSample: true },
  { id: "jsw-neosteel", logo: "/brands/jsw-neosteel.png", name: "JSW Neosteel", categories: ["steel"], isSample: true },
  { id: "asian-paints", logo: "/brands/asian-paints.png", name: "Asian Paints", categories: ["interior-paints", "exterior-paints", "enamels", "putty"], isSample: true },
  { id: "berger", logo: "/brands/berger.png", name: "Berger Paints", categories: ["interior-paints", "exterior-paints"], isSample: true },
  { id: "nerolac", logo: "/brands/nerolac.png", name: "Kansai Nerolac", categories: ["interior-paints", "enamels"], isSample: true },
  { id: "birla-white", logo: "/brands/birla-white.png", name: "Birla White", categories: ["putty", "cement"], isSample: true },
  { id: "dr-fixit", logo: "/brands/dr-fixit.png", name: "Dr. Fixit", categories: ["waterproofing", "construction-chemicals"], isSample: true },
  { id: "fevicol", logo: "/brands/fevicol.png", name: "Fevicol", categories: ["adhesives", "wood-coatings"], isSample: true },
  { id: "ambuja", logo: "/brands/ambuja.png", name: "Ambuja Cement", categories: ["cement"], isSample: true },
  { id: "shree-cement", logo: "/brands/shree-cement.png", name: "Shree Cement", categories: ["cement"], isSample: true },
  { id: "jk-lakshmi", logo: "/brands/jk-lakshmi.png", name: "JK Lakshmi Cement", categories: ["cement"], isSample: true },
  { id: "dalmia", logo: "/brands/dalmia.png", name: "Dalmia Cement", categories: ["cement"], isSample: true },
  { id: "wonder-cement", logo: "/brands/wonder-cement.png", name: "Wonder Cement", categories: ["cement"], isSample: true },
  { id: "sail", logo: "/brands/sail.png", name: "SAIL", categories: ["steel"], isSample: true },
  { id: "jindal-panther", logo: "/brands/jindal-panther.png", name: "Jindal Panther", categories: ["steel"], isSample: true },
  { id: "kamdhenu", logo: "/brands/kamdhenu.png", name: "Kamdhenu", categories: ["steel"], isSample: true },
  { id: "nippon", logo: "/brands/nippon.png", name: "Nippon Paint", categories: ["interior-paints","exterior-paints"], isSample: true },
  { id: "dulux", logo: "/brands/dulux.png", name: "Dulux", categories: ["interior-paints","exterior-paints"], isSample: true },
  { id: "indigo-paints", logo: "/brands/indigo-paints.png", name: "Indigo Paints", categories: ["interior-paints","exterior-paints"], isSample: true },
  { id: "shalimar", logo: "/brands/shalimar.png", name: "Shalimar Paints", categories: ["interior-paints","enamels"], isSample: true },
  { id: "jsw-paints", logo: "/brands/jsw-paints.png", name: "JSW Paints", categories: ["interior-paints","exterior-paints"], isSample: true },
  { id: "fosroc", logo: "/brands/fosroc.png", name: "Fosroc", categories: ["construction-chemicals","waterproofing"], isSample: true },
  { id: "sika", logo: "/brands/sika.png", name: "Sika", categories: ["construction-chemicals","waterproofing"], isSample: true },
  { id: "myk-laticrete", logo: "/brands/myk-laticrete.png", name: "MYK Laticrete", categories: ["adhesives","waterproofing"], isSample: true },
  { id: "roff", logo: "/brands/roff.png", name: "Roff", categories: ["adhesives","waterproofing"], isSample: true },
  { id: "jk-wall-putty", logo: "/brands/jk-wall-putty.png", name: "JK Wall Putty", categories: ["putty","cement"], isSample: true },
  { id: "kajaria", logo: "/brands/kajaria.png", name: "Kajaria", categories: ["tiles-flooring"], isSample: true },
  { id: "somany", logo: "/brands/somany.png", name: "Somany", categories: ["tiles-flooring"], isSample: true },
  { id: "johnson-tiles", logo: "/brands/johnson-tiles.png", name: "Johnson Tiles", categories: ["tiles-flooring"], isSample: true },
  { id: "century-ply", logo: "/brands/century-ply.png", name: "CenturyPly", categories: ["plywood-boards"], isSample: true },
  { id: "greenply", logo: "/brands/greenply.png", name: "Greenply", categories: ["plywood-boards"], isSample: true },
];
