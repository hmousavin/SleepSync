module.exports = {
    content: ['./src/(app|page|component|hook|layout)/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#ffffff", // Light mode
                    dark: "#181a20", // Dark mode
                },
                button: {
                    cancel: "#f1f2ff", // Light mode
                    accept: "#5558ff", // Same for both modes
                },
                text: {
                    head: "#212121",
                    body: "#616161", // Light mode
                },
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
}
