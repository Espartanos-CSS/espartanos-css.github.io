import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const paginas = ['fonda-lumbre', 'dental-alba', 'estudio-raiz', 'casa-cantera', 'andante']
const raiz = import.meta.dirname

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        portafolio: resolve(raiz, 'index.html'),
        ...Object.fromEntries(
          paginas
            .filter((p) => existsSync(resolve(raiz, p, 'index.html')))
            .map((p) => [p, resolve(raiz, p, 'index.html')]),
        ),
      },
    },
  },
})
