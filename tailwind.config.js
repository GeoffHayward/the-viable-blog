const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        preserveHtmlElements: false,
        content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
        options: {
            keyframes: true
        },
    },
    corePlugins: {
        container: false,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            typography: {
                DEFAULT: {
                    css: {
                        'code': {
                            color: '#9F1239'
                        },
                        'code::before': {
                            content: '""'
                        },
                        'code::after': {
                            content: '""'
                        }
                    }
                }
            }
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
};