# Proposal

## Why

Cuando un cliente pregunta "¿y qué pueden hacer?", hoy no tenemos nada propio que enseñarle. Seis sitios de muestra con liga pública resuelven eso, y además dejan listos cuatro niveles de precio que se ven y se sienten distintos.

## What Changes

- Una página portafolio de Espartanos CSS que presenta las muestras, dice qué nivel es cada una y lleva a cotizar.
- Cinco sitios de negocios ficticios, cada uno con identidad visual propia:
  - **Fonda Lumbre** (restaurante, nivel básico): menú, horario, ubicación, pedido por WhatsApp. Sin animación pesada.
  - **Dental Alba** (consultorio, nivel intermedio): servicios, equipo, testimonios y formulario de cita con validación.
  - **Estudio Raíz** (pilates y yoga, nivel intermedio): horario de clases por día, planes, instructoras y clase de prueba.
  - **Casa Cantera** (inmobiliaria, nivel premium): scroll suave, galería de propiedades que se desplaza de lado al hacer scroll, revelado de imágenes.
  - **Andante** (venta de un producto, una mochila de piel): galería, selector de color que cambia las fotos, carrito y pedido.
- Cada sitio avisa que es una muestra y regresa al portafolio.
- Proyecto en Docker con build estático listo para publicar gratis.

Fuera de alcance: cobros reales, envío real de formularios, panel de administración, dominio propio.

## Capabilities

### New Capabilities
- `portafolio-muestras`: la página de Espartanos CSS que lista las muestras y lleva a cada una.
- `sitios-muestra`: las reglas comunes a los cinco sitios y el comportamiento propio de cada uno (menú, citas, horario, galería, carrito).

### Modified Capabilities

Ninguna, el proyecto es nuevo.

## Impact

Repositorio nuevo `espartanos-muestras`, sin relación con ningún otro proyecto. Dependencias: Vite, GSAP, Lenis, fuentes autoalojadas e íconos Phosphor. Fotos de Unsplash descargadas al repo con crédito en el README.
