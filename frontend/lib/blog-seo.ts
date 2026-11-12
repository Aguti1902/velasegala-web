/**
 * Utilidades SEO para los artículos del blog.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

const stripMd = (s: string) =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Extrae las preguntas frecuentes del markdown: busca un encabezado
 * "Preguntas frecuentes" / "FAQ" y toma cada ### pregunta + su respuesta.
 */
export function extractFaqs(markdown: string): FaqItem[] {
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => /^#{2,3}\s.*(preguntas frecuentes|faq)/i.test(l));
  if (start === -1) return [];

  const faqs: FaqItem[] = [];
  let current: FaqItem | null = null;

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^##\s/.test(line)) break; // fin de la sección FAQ
    const q = line.match(/^###\s+(.*)/) || line.match(/^\*\*(¿.*\?)\*\*\s*$/);
    if (q) {
      if (current && current.answer) faqs.push(current);
      current = { question: stripMd(q[1]), answer: "" };
    } else if (current && line.trim()) {
      current.answer = (current.answer + " " + stripMd(line)).trim();
    }
  }
  if (current && current.answer) faqs.push(current);
  return faqs.slice(0, 10);
}

/** Tratamiento relacionado para enlazado interno (blog -> página de dinero) */
const TREATMENT_LINKS: Array<{ match: RegExp; href: string; label: string }> = [
  { match: /implante/i, href: "/tratamientos/implantes-dentales-viladecans", label: "Implantes dentales en Viladecans" },
  { match: /invisalign|ortodoncia|alineador|bracket/i, href: "/tratamientos/ortodoncia-invisible-viladecans", label: "Ortodoncia invisible en Viladecans" },
  { match: /blanqueamiento/i, href: "/tratamientos/blanqueamiento-dental-viladecans", label: "Blanqueamiento dental en Viladecans" },
  { match: /carilla|est[ée]tica/i, href: "/tratamientos/estetica-dental-viladecans", label: "Estética dental en Viladecans" },
  { match: /enc[ií]a|periodon|piorrea|gingivitis/i, href: "/tratamientos/periodoncia-viladecans", label: "Periodoncia en Viladecans" },
  { match: /endodoncia|nervio|matar el nervio/i, href: "/tratamientos/endodoncia-viladecans", label: "Endodoncia en Viladecans" },
  { match: /pr[óo]tesis|dentadura/i, href: "/tratamientos/protesis-dentales-viladecans", label: "Prótesis dentales en Viladecans" },
  { match: /muela del juicio|extracci[óo]n|cirug[ií]a/i, href: "/tratamientos/cirugia-oral-viladecans", label: "Cirugía oral en Viladecans" },
  { match: /bruxismo|f[ée]rula|apretar/i, href: "/tratamientos/bruxismo-viladecans", label: "Tratamiento del bruxismo en Viladecans" },
  { match: /niñ|hij|infantil|odontopediatr/i, href: "/tratamientos/odontopediatria-viladecans", label: "Odontopediatría en Viladecans" },
  { match: /urgencia|dolor de muela|dolor dental|flem[óo]n/i, href: "/tratamientos/urgencias-dentales-viladecans", label: "Urgencias dentales en Viladecans" },
  { match: /limpieza|higiene|sarro/i, href: "/tratamientos/limpieza-dental-viladecans", label: "Limpieza dental en Viladecans" },
];

export function relatedTreatment(post: { title: string; slug: string; categories?: { name: string }[] }) {
  const haystack = `${post.slug} ${post.title} ${(post.categories || []).map((c) => c.name).join(" ")}`;
  return TREATMENT_LINKS.find((t) => t.match.test(haystack)) || null;
}

export function absoluteUrl(url: string | null | undefined, siteUrl: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${siteUrl.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
}
