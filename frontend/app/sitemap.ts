import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { API_URL } from '@/lib/config';

// Páginas estáticas del sitio
const staticPages = [
  '',
  '/contacto',
  '/pedir-cita',
  '/clinica-dental-viladecans',
  '/blog',
  '/tratamientos',
  '/tratamientos/implantes-dentales-viladecans',
  '/tratamientos/ortodoncia-invisible-viladecans',
  '/tratamientos/estetica-dental-viladecans',
  '/tratamientos/blanqueamiento-dental-viladecans',
  '/tratamientos/limpieza-dental-viladecans',
  '/tratamientos/periodoncia-viladecans',
  '/tratamientos/endodoncia-viladecans',
  '/tratamientos/cirugia-oral-viladecans',
  '/tratamientos/protesis-dentales-viladecans',
  '/tratamientos/odontopediatria-viladecans',
  '/tratamientos/bruxismo-viladecans',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Usar la URL del sitio, pero si es localhost, usar la URL de producción
  let baseUrl = SITE_CONFIG.url;
  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    // En producción, usar el dominio real
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.velasegalaviladecans.com';
  }
  
  const currentDate = new Date();

  // Generar entradas para páginas estáticas
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  // Obtener posts publicados del blog
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${API_URL}/posts?status=PUBLISHED&limit=100`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
    });

    if (response.ok) {
      const data = await response.json();
      const posts = data.data || data || [];

      blogEntries = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error al generar sitemap del blog:', error);
    // Continuar sin los posts si hay error
  }

  return [...staticEntries, ...blogEntries];
}

