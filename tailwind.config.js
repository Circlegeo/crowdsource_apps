module.exports = {
    // purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === "production",
        content: [
            './src/**/*.{vue,js,ts,jsx,tsx}',
            './public/**/*.html',
        ],
        whitelist: ["lvml"],
        whitelistPatterns: [/leaflet-.+$/],
        whitelistPatternsChildren: [/leaflet-.+$/],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {}
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}