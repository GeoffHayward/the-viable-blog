const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
    },
    corePlugins: {
        container: false,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
};