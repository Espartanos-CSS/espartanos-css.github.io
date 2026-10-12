# sitios-muestra Specification

## Purpose
Define lo que todo sitio de muestra debe cumplir y el comportamiento particular de cada uno, para que el cliente vea funciones reales y no solo diseño.

## Requirements

### Requirement: Aviso de muestra
Cada sitio SHALL mostrar de forma visible que es un negocio ficticio hecho por Espartanos CSS, con una liga de regreso al portafolio.

#### Scenario: Regresar al portafolio
- **WHEN** el visitante toca el aviso de muestra
- **THEN** regresa a la página portafolio

### Requirement: Acciones simuladas
Toda acción que en un negocio real enviaría datos o mensajes (WhatsApp, citas, compras) SHALL avisar que es una muestra en lugar de enviar algo.

#### Scenario: Botón de WhatsApp
- **WHEN** el visitante toca un botón de WhatsApp en cualquier muestra
- **THEN** aparece un aviso de que es un sitio de muestra y no se abre ninguna conversación

### Requirement: Calidad base
Cada página SHALL estar en español, declarar `lang="es"`, verse bien desde 360 px de ancho sin scroll horizontal, tener texto alternativo en toda imagen, no contener guiones largos y respetar la preferencia de movimiento reducido.

#### Scenario: Movimiento reducido
- **WHEN** el sistema del visitante pide reducir movimiento
- **THEN** el sitio se muestra completo sin animaciones de scroll

#### Scenario: Revisión automática
- **WHEN** se corre la prueba de humo sobre el build
- **THEN** cada página pasa los chequeos de idioma, viewport, imágenes con alt e imágenes existentes, y ausencia de guiones largos

### Requirement: Menú del restaurante
Fonda Lumbre SHALL mostrar su menú agrupado por categoría con precio en pesos, y el horario indicando si está abierto en este momento.

#### Scenario: Abierto ahora
- **WHEN** el visitante entra dentro del horario de servicio
- **THEN** el sitio indica que la fonda está abierta

### Requirement: Cita en el consultorio
Dental Alba SHALL tener un formulario de cita que valide nombre, teléfono de 10 dígitos y servicio antes de confirmar, con los errores debajo de cada campo.

#### Scenario: Teléfono inválido
- **WHEN** el visitante escribe un teléfono de 8 dígitos y envía
- **THEN** aparece un error debajo del campo de teléfono y no se confirma la cita

#### Scenario: Datos completos
- **WHEN** el visitante llena todo correctamente y envía
- **THEN** ve una confirmación que aclara que es una muestra

### Requirement: Horario de clases
Estudio Raíz SHALL mostrar las clases por día de la semana, abriendo en el día actual, y permitir cambiar de día.

#### Scenario: Cambiar de día
- **WHEN** el visitante elige el jueves
- **THEN** se muestran solo las clases del jueves

### Requirement: Galería de propiedades
Casa Cantera SHALL presentar sus propiedades destacadas en una galería que avanza de lado con el scroll en pantallas grandes y como lista vertical en celular o con movimiento reducido.

#### Scenario: Celular
- **WHEN** el ancho de pantalla es menor a 768 px
- **THEN** las propiedades se apilan verticalmente y el scroll es normal

### Requirement: Compra del producto
Andante SHALL permitir elegir color, que cambia las fotos de la galería, elegir cantidad, y agregar al carrito mostrando el total en pesos.

#### Scenario: Cambiar color
- **WHEN** el visitante elige el color Vino
- **THEN** la galería muestra las fotos de la mochila en ese color

#### Scenario: Agregar al carrito
- **WHEN** el visitante agrega 2 mochilas
- **THEN** el carrito muestra 2 piezas y el total correspondiente en pesos
