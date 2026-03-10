const config = {
    theme: {
        extend: {
            animation: {
                'marquee-left': 'marquee-left 40s linear infinite',
                'marquee-right': 'marquee-right 40s linear infinite',
            },
            keyframes: {
                'marquee-left': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        },
    },
};