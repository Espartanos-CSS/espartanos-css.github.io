# portafolio-muestras Specification

## Purpose
Presenta a un cliente potencial los sitios de muestra de Espartanos CSS, qué nivel de servicio representa cada uno y cómo pedir una cotización.

## Requirements

### Requirement: Lista de muestras
La página portafolio SHALL mostrar las cinco muestras, cada una con una vista previa real del sitio, el giro, el nivel (básico, intermedio, premium o producto) y una liga que abre el sitio.

#### Scenario: Abrir una muestra
- **WHEN** el visitante toca la tarjeta de Casa Cantera
- **THEN** se abre el sitio de Casa Cantera

#### Scenario: Todas las muestras presentes
- **WHEN** se carga la página portafolio
- **THEN** aparecen Fonda Lumbre, Dental Alba, Estudio Raíz, Casa Cantera y Andante, cada una con su nivel

### Requirement: Llamado a cotizar
La página portafolio SHALL tener un solo llamado a la acción para pedir cotización, con la misma etiqueta en todas sus apariciones.

#### Scenario: Pedir cotización
- **WHEN** el visitante toca "Pide tu cotización"
- **THEN** se abre el canal de contacto configurado de Espartanos CSS

### Requirement: Precios aproximados por nivel
La página portafolio SHALL mostrar para cada nivel (Básico, Intermedio, Premium y Tienda) un precio "Desde $X + IVA" y una nota que diga que son aproximados y que el precio final se cotiza. Las secciones de precio fijo y póliza mensual MUST NOT mostrar montos.

#### Scenario: Ver precios
- **WHEN** el visitante llega a la sección de niveles
- **THEN** ve Desde $5,000, $12,000, $18,000 y $20,000 + IVA, y la nota de precios aproximados
