const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        background: 'background-image',
      },
      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              color: 'var(--primary-text)',
              '> *': {
                gridColumn: '1 / -1',

                [`@media (min-width: ${theme('screens.sm')})`]: {
                  gridColumn: '2 / -2',
                },
              },
              h1: {
                marginBottom: '0 !important',
              },
              'h1, h2': {
                fontWeight: theme('fontWeight.bold'),

                '& > a': {
                  fontWeight: 'inherit',
                },
              },
              a: {
                color: 'var(--primary-text)',
                textDecoration: 'none',
                backgroundSize: '0% 2px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom left',
                willChange: 'background-size',
                transitionProperty: 'background-size',
                transitionDuration: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundImage:
                  'linear-gradient(90deg, var(--primary-text), var(--primary-text))',

                '&:hover': {
                  backgroundSize: '100% 2px',
                },
              },
              strong: {
                color: 'var(--primary-text)',
              },
              'p > code, a > code': {
                color: 'var(--primary-text)',
                fontWeight: 400,
                padding: '2px 4px',
                borderRadius: '6px',
                backgroundColor: 'var(--code-background)',

                '&::after, &::before': {
                  content: 'unset',
                },
              },
              pre: {
                paddingLeft: '0 !important',

                [`@media (min-width: ${theme('screens.sm')})`]: {
                  gridColumn: '1 / -1',
                },
              },
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
