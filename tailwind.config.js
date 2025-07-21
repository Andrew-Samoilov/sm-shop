/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './styles/**/*.{css}',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/styles/**/*.{css}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                accent: 'var(--color-accent)',
                // додаткові кольори з globals.css:
                dark: 'var(--color-dark)',
                light: 'var(--color-light)',
                body: 'var(--color-body)',
                border: 'var(--color-border)',
            },
            fontFamily: {
                primary: ['Karla', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
