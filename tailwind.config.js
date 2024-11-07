/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      'tablet-large': '768px',
      desktop: '1200px',
    },

    spacing: {
      '0': '0px',
      '8': '8px',
      '13': '13px',
      '16': '16px',
      '18': '18px',
      '22': '22px',
      '24': '24px',
      '32': '32px',
      '40': '40px',
      '56': '56px',
      '64': '64px',
      '66': '66px',
      '72': '72px',
      '80': '80px',
      '96': '96px',
      '152': '152px',
      '440': '440px',
      '508': '508px',

    },

    extend: {
      colors: {
        accent: '#4219D0',
        'secondary-accent': '#F4BA47',
        primary: '#0F0F11',
        secondary: '#89939A',
        icons: '#B4BDC3',
        elements: '#E2E6E9',
        'hover-and-bg': '#FAFBFC',
        white: '#FFFFFF',
        green: '#27AE60',
        red: '#EB5757',
      },

      borderRadius: {
        sm: '8px',
        lg: '48px',
      },

      boxShadow: {
        'footer-top': '0px -1px 0px 0px #E2E6E9',
      },

      backgroundImage: {
        close: "url(public/img/icons/svg/icon-close.svg)",
        'close-active': "url(public/img/icons/svg/icon-close-active.svg)",
        plus: "url(public/img/icons/svg/icon-plus.svg)",
        minus: "url(public/img/icons/svg/icon-minus.svg)",
        'minus-active': "url(public/img/icons/svg/icon-minus-active.svg)",
        'arrow-top': "url(public/img/icons/svg/icon-arrow-top.svg)",
      },
    },

    fontFamily: {
      sans: ['Mont', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      small: [
        '12px',
        {
          lineHeight: '15px',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],

      price: [
        '22px',
        {
          lineHeight: '30.8px',
          letterSpacing: '0',
          fontWeight: '800',
        },
      ],

      buttons: [
        '14px',
        {
          lineHeight: '21px',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],

      uppercase: [
        '12px',
        {
          lineHeight: '11px',
          letterSpacing: '0.04em',
          fontWeight: '700',
        },
      ],
    },
  },

  plugins: [],
};
