import { MetadataRoute } from 'next';
import { API_URL } from '@/lib/config';

// URL de producción siempre fija (nunca localhost)
const PROD_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.velasegalaviladecans.com';

// Páginas estáticas del sitio
const staticPages: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                                                         priority: 1.0,  changeFreq: 'daily'   },
  { path: '/clinica-dental-viladecans',                              priority: 0.95, changeFreq: 'weekly'  },
  { path: '/tratamientos',                                            priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/pedir-cita',                                              priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/tratamientos/implantes-dentales-viladecans',             priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/ortodoncia-invisible-viladecans',           priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/estetica-dental-viladecans',                priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/blanqueamiento-dental-viladecans',          priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/limpieza-dental-viladecans',                priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/periodoncia-viladecans',                    priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/endodoncia-viladecans',                     priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/cirugia-oral-viladecans',                   priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/protesis-dentales-viladecans',              priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/odontopediatria-viladecans',                priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/bruxismo-viladecans',                       priority: 0.85, changeFreq: 'weekly'  },
  { path: '/tratamientos/urgencias-dentales-viladecans',             priority: 0.85, changeFreq: 'weekly'  },
  { path: '/blog',                                                    priority: 0.8,  changeFreq: 'daily'   },
  { path: '/contacto',                                                priority: 0.75, changeFreq: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, changeFreq }) => ({
    url: `${PROD_URL}${path}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));

  // Obtener posts publicados del blog
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${API_URL}/posts?status=PUBLISHED&limit=200`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      const data = await response.json();
      const posts: any[] = data.data || data || [];

      blogEntries = posts.map((post) => ({
        url: `${PROD_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Continuar sin los posts si hay error o timeout
  }

  return [...staticEntries, ...blogEntries];
}
