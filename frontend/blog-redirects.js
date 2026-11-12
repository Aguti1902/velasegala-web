/**
 * Consolidación de artículos duplicados del blog (contenido canibalizado).
 *
 * El antiguo flujo de n8n publicó ~64 artículos sobre solo ~13 temas
 * (blanqueamiento-dental-viladecans, -1, -2, -3...). Google trata eso como
 * contenido duplicado y ninguno posiciona. Aquí se redirige (301) cada
 * duplicado a UNA url canónica, y los artículos que competían con las
 * páginas de tratamiento / home se redirigen a esas páginas de dinero.
 *
 * Formato: [slugDuplicado, destino]
 */
const T = '/tratamientos';

const BLOG_REDIRECTS = [
  // --- Compiten con la HOME por "dentista viladecans" ---
  ['dentista-viladecans', '/'],
  ['dentista-viladecans-1', '/'],
  ['dentista-viladecans-vela-segala', '/'],
  ['dentista-viladecans-vela-segala-1', '/'],
  ['clinica-dental-vela-segala', '/clinica-dental-viladecans'],

  // --- Compiten con páginas de tratamiento ---
  ['implantes-dentales-viladecans', `${T}/implantes-dentales-viladecans`],
  ['implantes-dentales-viladecans-1', `${T}/implantes-dentales-viladecans`],
  ['implantes-dentales-viladecans-2', `${T}/implantes-dentales-viladecans`],
  ['implantes-dentales-viladecans-3', `${T}/implantes-dentales-viladecans`],
  ['implantes-dentales-vela-segala', `${T}/implantes-dentales-viladecans`],
  ['ortodoncia-invisible-viladecans', `${T}/ortodoncia-invisible-viladecans`],
  ['ortodoncia-invisible-viladecans-1', `${T}/ortodoncia-invisible-viladecans`],
  ['ortodoncia-invisible-viladecans-2', `${T}/ortodoncia-invisible-viladecans`],
  ['ortodoncia-invisible-vela-segala', `${T}/ortodoncia-invisible-viladecans`],
  ['blanqueamiento-dental-viladecans', `${T}/blanqueamiento-dental-viladecans`],
  ['blanqueamiento-dental-viladecans-1', `${T}/blanqueamiento-dental-viladecans`],
  ['blanqueamiento-dental-viladecans-2', `${T}/blanqueamiento-dental-viladecans`],
  ['blanqueamiento-dental-viladecans-3', `${T}/blanqueamiento-dental-viladecans`],
  ['blanqueamiento-dental-viladecans-4', `${T}/blanqueamiento-dental-viladecans`],
  ['blanqueamiento-dental-viladecans-5', `${T}/blanqueamiento-dental-viladecans`],

  // --- Duplicados de artículos informativos -> artículo canónico ---
  ['blanqueamiento-dental-mitos-verdades-1', '/blog/blanqueamiento-dental-mitos-verdades'],
  ['blanqueamiento-dental-mitos-verdades-2', '/blog/blanqueamiento-dental-mitos-verdades'],
  ['blanqueamiento-dental-mitos-verdades-3', '/blog/blanqueamiento-dental-mitos-verdades'],
  ['blanqueamiento-dental-mitos-verdades-4', '/blog/blanqueamiento-dental-mitos-verdades'],
  ['blanqueamiento-dental-mitos-verdades-5', '/blog/blanqueamiento-dental-mitos-verdades'],
  ['higiene-dental-diaria-1', '/blog/higiene-dental-diaria'],
  ['higiene-dental-diaria-2', '/blog/higiene-dental-diaria'],
  ['higiene-dental-diaria-guia', '/blog/higiene-dental-diaria'],
  ['guia-higiene-dental', '/blog/higiene-dental-diaria'],
  ['urgencias-dentales-comunes-1', '/blog/urgencias-dentales-comunes'],
  ['urgencias-dentales-comunes-2', '/blog/urgencias-dentales-comunes'],
  ['urgencias-dentales-comunes-3', '/blog/urgencias-dentales-comunes'],
  ['cuidados-ortodoncia-invisible-1', '/blog/cuidados-ortodoncia-invisible'],
  ['cuidados-ortodoncia-invisible-2', '/blog/cuidados-ortodoncia-invisible'],
  ['cuidados-ortodoncia-invisible-3', '/blog/cuidados-ortodoncia-invisible'],
  ['cuidados-ortodoncia-invisible-4', '/blog/cuidados-ortodoncia-invisible'],
  ['cuidados-ortodoncia-invisible-5', '/blog/cuidados-ortodoncia-invisible'],
  ['cuidados-post-ortodoncia-invisible', '/blog/cuidados-ortodoncia-invisible'],
  ['cuándo-llevar-hijo-dentista', '/blog/cuando-llevar-hijo-dentista'],
  ['dentista-hijos-cuando-ir', '/blog/cuando-llevar-hijo-dentista'],
  ['cuando-ir-dentista-ninos', '/blog/cuando-llevar-hijo-dentista'],
  ['prevencion-caries-ninos-1', '/blog/prevencion-caries-ninos'],
  ['prevencion-caries-ninos-2', '/blog/prevencion-caries-ninos'],
  ['prevencion-caries-ninos-3', '/blog/prevencion-caries-ninos'],
  ['prevencion-caries-ninos-4', '/blog/prevencion-caries-ninos'],
  ['consejos-encias-sanas-1', '/blog/consejos-encias-sanas'],
  ['consejos-encias-sanas-2', '/blog/consejos-encias-sanas'],
  ['encías-sanas-consejos', '/blog/consejos-encias-sanas'],
  ['encías-sanas-consejos-1', '/blog/consejos-encias-sanas'],
  ['protesis-dentales-tipos-ventajas-1', '/blog/protesis-dentales-tipos-ventajas'],
  ['protesis-dentales-tipos-ventajas-2', '/blog/protesis-dentales-tipos-ventajas'],
  ['protesis-dentales-tipos-ventajas-3', '/blog/protesis-dentales-tipos-ventajas'],
  ['bruxismo-causas-tratamiento-1', '/blog/bruxismo-causas-tratamiento'],
  ['bruxismo-causas-tratamiento-2', '/blog/bruxismo-causas-tratamiento'],
  ['bruxismo-causas-tratamiento-3', '/blog/bruxismo-causas-tratamiento'],
];

module.exports = { BLOG_REDIRECTS };
