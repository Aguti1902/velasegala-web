-- Script SQL para actualizar fechas de publicación de posts existentes
-- Este script actualiza las fechas a fechas pasadas para que aparezcan en el blog

UPDATE "Post"
SET "publishAt" = CASE
  WHEN slug = 'precio-implantes-dentales-viladecans-factores' THEN '2024-12-01'::timestamp
  WHEN slug = 'ortodoncia-invisible-viladecans-ventajas-duracion' THEN '2024-11-25'::timestamp
  WHEN slug = 'primera-visita-dentista-viladecans' THEN '2024-11-20'::timestamp
  ELSE "publishAt" - INTERVAL '1 year'  -- Para otros posts, retroceder 1 año
END
WHERE "publishStatus" = 'PUBLISHED' 
  AND "publishAt" > NOW();  -- Solo actualizar posts con fechas futuras

