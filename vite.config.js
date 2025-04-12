import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    base: '/twothreebird-tic-tac-toe/',
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    server: {
        open: true
    }
});