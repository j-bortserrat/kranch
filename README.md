# KRANCH — Fried Station · Web

Web multipágina (estática) para **KRANCH Fried Station**, Carrer del Comte d'Altea 36, Valencia.

## Contenido
- `index.html` — Inicio
- `carta.html` — Carta (por categorías)
- `galeria.html` — Galería
- `resenas.html` — Reseñas
- `contacto.html` — Contacto (horario, mapa, formulario)
- `assets/` — estilos, scripts, datos (carta y reseñas) e imágenes
- `.nojekyll` — para que GitHub Pages sirva los archivos tal cual

No usa dependencias externas (solo Google Fonts). Español/Inglés con selector de idioma.

## Cómo publicar en GitHub Pages
1. Crea un repositorio nuevo en github.com (por ejemplo `kranch`).
2. Sube **todo el contenido de esta carpeta** (los archivos `.html`, la carpeta `assets`, `.nojekyll` y este `README.md`) arrastrándolos a la página del repositorio → *Add file* → *Upload files* → *Commit*.
3. En el repositorio: **Settings → Pages**.
4. En *Build and deployment* → *Source*: elige **Deploy from a branch**.
5. *Branch*: `main` · carpeta `/ (root)` → **Save**.
6. Espera 1-2 minutos. Tu web estará en `https://TU-USUARIO.github.io/kranch/`.

> Importante: sube los archivos sueltos (que `index.html` quede en la raíz del repositorio), no la carpeta comprimida.

## Editar después
- Carta y precios: `assets/menu-data.js`
- Reseñas: `assets/reviews-data.js`
- Textos de interfaz (ES/EN): `assets/i18n.js`
- Datos del negocio (teléfono, horario, dirección, redes): `assets/app.js` (objeto `SITE`)
