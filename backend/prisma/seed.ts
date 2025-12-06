import { PrismaClient, PublishStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar base de datos
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Base de datos limpiada');

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@velasegala.com',
      name: 'Dr. Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Usuario admin creado:', admin.email);

  // Crear tratamientos
  const treatments = await Promise.all([
    prisma.treatment.create({
      data: {
        title: 'Implantes Dentales en Viladecans',
        slug: 'implantes-dentales-viladecans',
        description:
          'Recupera tus dientes con implantes dentales de última generación. Más del 95% de éxito y garantía de por vida.',
        longDescription: `Los implantes dentales son la mejor solución para recuperar dientes perdidos. En nuestra clínica de Viladecans utilizamos implantes de las mejores marcas del mercado (Straumann, Nobel Biocare) con una tasa de éxito superior al 95%.

El implante dental es una raíz artificial de titanio que se integra con el hueso (osteointegración) y sobre la que se coloca una corona que imita perfectamente el aspecto y función de un diente natural.`,
        featuredImage: '/images/tratamientos/implantes-dentales.jpg',
        icon: '🦷',
        priceRange: '800€ - 1.500€',
        duration: '3-6 meses',
        metaTitle:
          'Implantes Dentales en Viladecans - Precio desde 800€ | Clínica Dental',
        metaDescription:
          'Implantes dentales en Viladecans desde 800€. Recupera tus dientes con implantes de última generación. Primera visita gratuita y financiación sin intereses.',
        faqItems: [
          {
            question: '¿Cuánto cuesta un implante dental en Viladecans?',
            answer:
              'El precio varía entre 800€ y 1.500€ dependiendo del tipo de implante y si es necesario injerto de hueso.',
          },
          {
            question: '¿Cuánto dura el tratamiento?',
            answer:
              'El proceso completo suele durar entre 3 y 6 meses, incluyendo la osteointegración.',
          },
          {
            question: '¿Es doloroso?',
            answer:
              'No, se realiza con anestesia local. Las molestias posteriores son leves y se controlan con analgésicos.',
          },
        ],
        order: 1,
        published: true,
      },
    }),

    prisma.treatment.create({
      data: {
        title: 'Ortodoncia Invisible en Viladecans',
        slug: 'ortodoncia-invisible-viladecans',
        description:
          'Alinea tus dientes de forma discreta con ortodoncia invisible. Sistema Invisalign certificado.',
        longDescription: `La ortodoncia invisible es la solución estética perfecta para alinear tus dientes sin que nadie lo note. Utilizamos el sistema Invisalign, líder mundial en ortodoncia invisible.

Se trata de alineadores transparentes hechos a medida que se cambian cada 1-2 semanas. Son cómodos, removibles (puedes quitártelos para comer) y prácticamente invisibles.`,
        featuredImage: '/images/tratamientos/ortodoncia-invisible.jpg',
        icon: '😁',
        priceRange: '2.500€ - 4.500€',
        duration: '12-18 meses',
        metaTitle:
          'Ortodoncia Invisible Viladecans - Invisalign | Clínica Dental',
        metaDescription:
          'Ortodoncia invisible en Viladecans con sistema Invisalign. Alinea tus dientes de forma discreta. Primera visita gratuita y financiación.',
        faqItems: [
          {
            question: '¿Cuánto cuesta la ortodoncia invisible en Viladecans?',
            answer:
              'El precio varía entre 2.500€ y 4.500€ según la complejidad del caso y la duración del tratamiento.',
          },
          {
            question: '¿Cuánto dura el tratamiento?',
            answer:
              'La mayoría de tratamientos duran entre 12 y 18 meses, aunque depende de cada caso.',
          },
          {
            question: '¿Es realmente invisible?',
            answer:
              'Sí, los alineadores son prácticamente imperceptibles. Nadie notará que llevas ortodoncia.',
          },
        ],
        order: 2,
        published: true,
      },
    }),

    prisma.treatment.create({
      data: {
        title: 'Estética Dental en Viladecans',
        slug: 'estetica-dental-viladecans',
        description:
          'Mejora tu sonrisa con tratamientos de estética dental: carillas, blanqueamiento y más.',
        longDescription: `La estética dental engloba todos los tratamientos enfocados a mejorar el aspecto de tu sonrisa. En nuestra clínica de Viladecans ofrecemos:

- Carillas dentales (porcelana o composite)
- Blanqueamiento dental profesional
- Reconstrucciones estéticas
- Diseño de sonrisa digital

Estudiamos tu caso y te proponemos el tratamiento más adecuado para conseguir la sonrisa que siempre has deseado.`,
        featuredImage: '/images/tratamientos/estetica-dental.jpg',
        icon: '✨',
        priceRange: '200€ - 3.000€',
        duration: '1-4 sesiones',
        metaTitle:
          'Estética Dental Viladecans - Carillas y Blanqueamiento | Clínica Dental',
        metaDescription:
          'Estética dental en Viladecans: carillas dentales, blanqueamiento profesional y diseño de sonrisa. Primera visita gratuita.',
        faqItems: [
          {
            question: '¿Qué tratamientos de estética dental ofrecen?',
            answer:
              'Ofrecemos carillas dentales, blanqueamiento profesional, reconstrucciones estéticas y diseño de sonrisa.',
          },
          {
            question: '¿Cuánto cuesta el blanqueamiento dental?',
            answer:
              'El blanqueamiento profesional cuesta entre 200€ y 400€ según el tipo de tratamiento.',
          },
          {
            question: '¿Cuánto duran las carillas dentales?',
            answer:
              'Con buenos cuidados, las carillas de porcelana pueden durar más de 15 años.',
          },
        ],
        order: 3,
        published: true,
      },
    }),
  ]);

  console.log('✅ Tratamientos creados:', treatments.length);

  // Crear categorías
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Implantes Dentales',
        slug: 'implantes-dentales',
        description:
          'Artículos sobre implantes dentales, precios, cuidados y más',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Ortodoncia',
        slug: 'ortodoncia',
        description:
          'Información sobre ortodoncia invisible, Invisalign y brackets',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Estética Dental',
        slug: 'estetica-dental',
        description: 'Consejos sobre blanqueamiento, carillas y diseño de sonrisa',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Viladecans',
        slug: 'viladecans',
        description: 'Noticias y consejos para pacientes de Viladecans',
      },
    }),
  ]);

  console.log('✅ Categorías creadas:', categories.length);

  // Crear tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'implantes dentales viladecans', slug: 'implantes-dentales-viladecans' } }),
    prisma.tag.create({ data: { name: 'precio implantes dentales', slug: 'precio-implantes-dentales' } }),
    prisma.tag.create({ data: { name: 'ortodoncia invisible viladecans', slug: 'ortodoncia-invisible-viladecans' } }),
    prisma.tag.create({ data: { name: 'invisalign viladecans', slug: 'invisalign-viladecans' } }),
    prisma.tag.create({ data: { name: 'blanqueamiento dental viladecans', slug: 'blanqueamiento-dental-viladecans' } }),
    prisma.tag.create({ data: { name: 'carillas dentales', slug: 'carillas-dentales' } }),
  ]);

  console.log('✅ Tags creados:', tags.length);

  // Crear posts de blog
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title:
          'Precio de Implantes Dentales en Viladecans: Factores que Influyen',
        slug: 'precio-implantes-dentales-viladecans-factores',
        content: `# Precio de Implantes Dentales en Viladecans: ¿Qué Factores Influyen?

Si estás considerando ponerte **implantes dentales en Viladecans**, una de las primeras preguntas que te harás es: **¿cuánto cuesta un implante dental?**. En este artículo te explicamos los factores que influyen en el precio y qué puedes esperar en nuestra clínica.

## ¿Cuánto Cuesta un Implante Dental en Viladecans?

El precio de un implante dental en Viladecans **varía entre 800€ y 1.500€** por implante. Esta variación se debe a varios factores que veremos a continuación.

## Factores que Influyen en el Precio

### 1. Marca del Implante

Utilizamos implantes de marcas líderes como **Straumann**, **Nobel Biocare** y **Zimmer**, que ofrecen las mayores garantías de éxito. Los implantes premium tienen un coste mayor pero ofrecen mejor osteointegración y durabilidad.

### 2. Necesidad de Injerto de Hueso

Si has perdido hueso maxilar, puede ser necesario realizar un injerto antes de colocar el implante. Esto incrementa el coste total del tratamiento.

### 3. Tipo de Corona

La corona que se coloca sobre el implante puede ser de diferentes materiales:
- **Metalcerámica**: más económica
- **Zirconio**: estética superior, más natural

### 4. Complejidad del Caso

Cada caso es único. Algunos pacientes necesitan tratamientos adicionales como extracciones, tratamientos periodontales o elevación de seno.

## ¿Qué Incluye el Precio?

En nuestra clínica dental de Viladecans, el precio del implante incluye:

- Primera visita con diagnóstico completo
- Radiografías y escáner 3D
- Colocación del implante
- Pilar de conexión
- Corona definitiva
- Revisiones de seguimiento

## Financiación Sin Intereses

Ofrecemos **financiación hasta en 12 meses sin intereses** para que puedas recuperar tu sonrisa sin preocupaciones económicas.

## Primera Visita Gratuita

Te ofrecemos una **primera visita totalmente gratuita** donde:
- Evaluaremos tu caso
- Te explicaremos el tratamiento paso a paso
- Te daremos un presupuesto detallado y personalizado

## Conclusión

El precio de los implantes dentales en Viladecans depende de múltiples factores, pero lo más importante es confiar en profesionales con experiencia que utilicen materiales de calidad.

**¿Quieres saber cuánto costaría en tu caso?** Pide tu primera visita gratuita y te haremos un presupuesto personalizado sin compromiso.`,
        excerpt:
          'Descubre los factores que influyen en el precio de los implantes dentales en Viladecans y qué puedes esperar pagar. Precios desde 800€ con financiación sin intereses.',
        featuredImage: '/images/blog/precio-implantes-dentales.jpg',
        metaTitle:
          'Precio Implantes Dentales Viladecans: ¿Cuánto Cuesta? | 2025',
        metaDescription:
          'Precio de implantes dentales en Viladecans: desde 800€. Descubre qué factores influyen, qué incluye el precio y opciones de financiación. Primera visita gratis.',
        publishStatus: PublishStatus.PUBLISHED,
        publishAt: new Date('2024-12-01'),
        authorId: admin.id,
        categories: {
          connect: [
            { id: categories[0].id },
            { id: categories[3].id },
          ],
        },
        tags: {
          connect: [
            { id: tags[0].id },
            { id: tags[1].id },
          ],
        },
      },
    }),

    prisma.post.create({
      data: {
        title:
          'Ortodoncia Invisible en Viladecans: Ventajas, Duración y Cuidados',
        slug: 'ortodoncia-invisible-viladecans-ventajas-duracion',
        content: `# Ortodoncia Invisible en Viladecans: Todo lo que Necesitas Saber

La **ortodoncia invisible** se ha convertido en la opción preferida por adultos y adolescentes que quieren alinear sus dientes de forma discreta. En este artículo te contamos todo sobre la ortodoncia invisible en Viladecans.

## ¿Qué es la Ortodoncia Invisible?

La ortodoncia invisible, también conocida como **Invisalign**, es un sistema de alineadores transparentes hechos a medida que van moviendo tus dientes progresivamente hasta su posición correcta.

## Ventajas de la Ortodoncia Invisible

### 1. Estética

Son prácticamente **invisibles**. Nadie notará que llevas ortodoncia, lo que te permite sonreír con confianza durante todo el tratamiento.

### 2. Comodidad

No tienen alambres ni brackets que puedan causar rozaduras. Son cómodos de llevar desde el primer día.

### 3. Removibles

Puedes quitártelos para comer, beber y cepillarte los dientes. Esto facilita enormemente la higiene oral.

### 4. Menos Visitas al Dentista

Solo necesitas acudir a revisiones cada 6-8 semanas, a diferencia de los brackets tradicionales que requieren ajustes mensuales.

### 5. Predictibilidad

Gracias al software ClinCheck, puedes ver cómo quedará tu sonrisa antes incluso de empezar el tratamiento.

## ¿Cuánto Dura el Tratamiento?

La duración media de un tratamiento de ortodoncia invisible en Viladecans es de **12 a 18 meses**, aunque depende de la complejidad de cada caso.

Casos leves pueden resolverse en 6-9 meses, mientras que casos más complejos pueden necesitar hasta 24 meses.

## Proceso del Tratamiento

### 1. Primera Visita Gratuita

Evaluamos tu caso y determinamos si eres candidato para Invisalign.

### 2. Estudio Digital

Tomamos impresiones digitales 3D de tu boca y fotografías.

### 3. Planificación

Diseñamos tu tratamiento con software ClinCheck y te mostramos el resultado final.

### 4. Fabricación de Alineadores

Se fabrican todos tus alineadores personalizados.

### 5. Inicio del Tratamiento

Recibes tus primeros juegos de alineadores y te explicamos cómo usarlos.

### 6. Revisiones

Acudes cada 6-8 semanas para controlar la evolución y recoger nuevos alineadores.

## Cuidados de la Ortodoncia Invisible

Para garantizar el éxito del tratamiento:

- **Lleva los alineadores 22 horas al día** (solo quítatelos para comer y cepillarte)
- **Limpia los alineadores** diariamente con agua tibia y jabón neutro
- **Mantén una buena higiene oral** cepillándote después de cada comida
- **Guarda los alineadores** en su estuche cuando no los lleves

## Precio de la Ortodoncia Invisible en Viladecans

El precio de Invisalign en nuestra clínica de Viladecans varía entre **2.500€ y 4.500€** según la complejidad del caso.

Ofrecemos **financiación sin intereses** hasta en 12 meses.

## ¿Es para Ti la Ortodoncia Invisible?

Invisalign es adecuado para la mayoría de casos, desde apiñamiento leve hasta maloclusiones más complejas. La única forma de saber si es tu solución es con una valoración personalizada.

**Pide tu primera visita gratuita** y descubre si la ortodoncia invisible puede cambiar tu sonrisa.`,
        excerpt:
          'Descubre las ventajas de la ortodoncia invisible en Viladecans, cuánto dura el tratamiento y qué cuidados requiere. Sistema Invisalign certificado.',
        featuredImage: '/images/blog/ortodoncia-invisible.jpg',
        metaTitle:
          'Ortodoncia Invisible Viladecans: Ventajas y Precio | Invisalign',
        metaDescription:
          'Ortodoncia invisible en Viladecans: ventajas, duración (12-18 meses), cuidados y precio desde 2.500€. Sistema Invisalign certificado. Primera visita gratis.',
        publishStatus: PublishStatus.PUBLISHED,
        publishAt: new Date('2024-11-25'),
        authorId: admin.id,
        categories: {
          connect: [
            { id: categories[1].id },
            { id: categories[3].id },
          ],
        },
        tags: {
          connect: [
            { id: tags[2].id },
            { id: tags[3].id },
          ],
        },
      },
    }),

    prisma.post.create({
      data: {
        title:
          'Primera Visita al Dentista en Viladecans: Qué Esperar y Cómo Prepararte',
        slug: 'primera-visita-dentista-viladecans',
        content: `# Primera Visita al Dentista en Viladecans: Guía Completa

¿Hace tiempo que no vas al dentista? ¿Te da algo de miedo o no sabes qué esperar? En este artículo te contamos todo sobre la **primera visita al dentista en Viladecans** para que vayas tranquilo y sin sorpresas.

## ¿Por Qué es Importante la Primera Visita?

La primera visita dental es fundamental porque nos permite:

- **Conocer el estado actual** de tu salud bucodental
- **Detectar problemas** en fase temprana (caries, enfermedad periodontal, etc.)
- **Establecer un plan de tratamiento** personalizado si es necesario
- **Prevenir problemas** futuros con consejos de higiene y cuidados

## ¿En Qué Consiste la Primera Visita?

### 1. Anamnesis (Historial Médico)

Te haremos preguntas sobre:
- Tu salud general
- Medicamentos que tomas
- Alergias
- Hábitos (tabaco, alcohol)
- Motivo de tu visita

### 2. Exploración Oral Completa

Revisaremos:
- **Dientes**: buscando caries, fracturas, desgastes
- **Encías**: evaluando si hay inflamación o sangrado
- **Tejidos blandos**: mucosas, lengua, paladar
- **Articulación**: comprobando la ATM
- **Oclusión**: cómo encajan tus dientes

### 3. Radiografías (si son necesarias)

En muchos casos realizamos radiografías para ver:
- Caries entre dientes
- Estado de las raíces
- Nivel de hueso
- Muelas del juicio
- Lesiones no visibles a simple vista

### 4. Diagnóstico y Plan de Tratamiento

Te explicaremos:
- Qué problemas hemos detectado
- Qué tratamientos necesitas
- Opciones disponibles
- Presupuesto detallado

## ¿Cuánto Dura la Primera Visita?

La primera visita suele durar entre **30 y 45 minutos**. Nos tomamos el tiempo necesario para conocerte y evaluar tu caso con calma.

## ¿Cómo Prepararte para la Primera Visita?

### Antes de Ir

- **Cepíllate bien los dientes** antes de acudir
- **Prepara tu historial médico** (medicamentos, alergias, operaciones)
- **Anota tus dudas** para no olvidar preguntarlas
- **Llega 5-10 minutos antes** para rellenar la ficha

### Qué Llevar

- **DNI o documento identificativo**
- **Tarjeta sanitaria** (si la tienes)
- **Radiografías anteriores** si las tienes
- **Lista de medicamentos** que tomas

## ¿Duele la Primera Visita?

**No, la primera visita no duele**. Es solo una exploración visual y radiográfica. No se realizan tratamientos invasivos en la primera cita (salvo que vengas con dolor agudo y necesites una urgencia).

## ¿Cuánto Cuesta la Primera Visita?

En nuestra clínica dental de Viladecans, la **primera visita es totalmente gratuita** e incluye:

- Exploración completa
- Radiografías necesarias
- Diagnóstico
- Presupuesto detallado

## ¿Cada Cuánto Debo Ir al Dentista?

La recomendación general es acudir **cada 6 meses** para revisiones preventivas. Sin embargo, si tienes problemas periodontales u otros, puede que necesites revisiones más frecuentes.

## Supera el Miedo al Dentista

Si tienes miedo o ansiedad, no eres el único. Es algo muy común. En nuestra clínica:

- Te explicamos todo lo que vamos a hacer **antes de hacerlo**
- Trabajamos con **anestesia** cuando es necesario
- Puedes **pausar** en cualquier momento
- Nuestro equipo es **cercano y empático**

## Primera Visita para Niños

Si traes a tu hijo por primera vez, hacemos que sea una experiencia **positiva y divertida**:

- Usamos lenguaje adaptado a su edad
- Les enseñamos las herramientas de forma lúdica
- No forzamos nada en la primera visita
- Creamos confianza para futuras visitas

## Conclusión

La primera visita al dentista en Viladecans es el primer paso para mantener una boca sana. Es rápida, no duele y te dará mucha información sobre tu salud bucodental.

**¿Hace mucho que no vas al dentista?** Pide tu primera visita gratuita y sal de dudas. Sin compromiso.`,
        excerpt:
          'Guía completa sobre la primera visita al dentista en Viladecans: qué esperar, cómo prepararte, cuánto dura y qué incluye. Primera visita gratuita.',
        featuredImage: '/images/blog/primera-visita-dentista.jpg',
        metaTitle:
          'Primera Visita al Dentista en Viladecans: Qué Esperar | Guía 2025',
        metaDescription:
          'Primera visita al dentista en Viladecans: qué incluye, cómo prepararte y qué esperar. Visita gratuita con exploración completa y presupuesto. Sin dolor.',
        publishStatus: PublishStatus.PUBLISHED,
        publishAt: new Date('2024-11-20'),
        authorId: admin.id,
        categories: {
          connect: [{ id: categories[3].id }],
        },
        tags: {
          connect: [],
        },
      },
    }),
  ]);

  console.log('✅ Posts de blog creados:', posts.length);

  console.log('\n🎉 Seed completado con éxito!');
  console.log('\n📝 Datos creados:');
  console.log(`   - 1 usuario admin (email: ${admin.email}, password: Admin123!)`);
  console.log(`   - ${treatments.length} tratamientos`);
  console.log(`   - ${categories.length} categorías`);
  console.log(`   - ${tags.length} tags`);
  console.log(`   - ${posts.length} posts de blog`);
  console.log('\n✅ ¡La base de datos está lista para usar!');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


