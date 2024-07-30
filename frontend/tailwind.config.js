/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'apple-sdgothic-medium': ['AppleSDGothicNeoM', 'sans-serif'],
        'apple-sdgothic-semi-bold': ['AppleSDGothicNeoSB', 'sans-serif'],
        'apple-sdgothic-bold': ['AppleSDGothicNeoB', 'sans-serif'],
        'apple-sdgothic-extra-bold': ['AppleSDGothicNeoEB', 'sans-serif'],
      },
      width: {
        '1.5/12': '12.5%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#fb923c',
          'secondary': '#60a5fa',
          'accent': '#37cdbe',
          'neutral': '#3d4451',
          'base-100': '#ffffff',
        },
      },
      // 'dark',
      // 'cupcake',
    ],
  },
};
