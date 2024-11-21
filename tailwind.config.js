/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

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
      0: '0px',
      4: '4px',
      8: '8px',
      12: '12px',
      13: '13px',
      16: '16px',
      18: '18px',
      22: '22px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      66: '66px',
      72: '72px',
      80: '80px',
      96: '96px',
      152: '152px',
    },

    extend: {
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'secondary-accent': 'var(--color-secondary-accent)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        icons: 'var(--color-icons)',
        elements: 'var(--color-elements)',
        surface1: 'var(--color-surface1)',
        surface2: 'var(--color-surface2)',
        'hover-and-bg': 'var(--color-hover-and-bg)',
        'prod-black': '#1F1F1F',
        'prod-midnight': '#4D5850',
        'prod-blue': '#205D7A',
        'prod-green': '#E1F8DB',
        'prod-pink': '#FFDFDF',
        'prod-starlight': '#F9F3EE',
        'prod-white': '#F7F7F5',
        'prod-yellow': '#F3D161',
        'prod-purple': '#BAB4E8',
        'prod-midnightgreen': '#4D5850',
        'prod-gold': '#FEEDD8',
        'prod-silver': '#ECEAE4',
        'prod-spacegray': '#535353',
        'prod-spaceblack': '#333333',
        'prod-rosegold': '#EDBFB6',
        'prod-coral': '#EF7762',
        'prod-graphite': '#5C5B57',
        'prod-sierrablue': '#9BB5CE',
        'prod-skyblue': '#205D7A',
        'prod-red': '#F24333',
      },

      borderRadius: {
        sm: '8px',
        lg: '48px',
      },

      boxShadow: {
        'footer-top': '0px -1px 0px 0px #E2E6E9',
      },

      gridColumnStart: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
      },

      gridColumnEnd: {
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
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

      body: [
        '14px',
        {
          lineHeight: '21px',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      h4: [
        '16px',
        {
          lineHeight: '20px',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],

      h3: [
        '20px',
        {
          lineHeight: '26px',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],

      h2: [
        '22px',
        {
          lineHeight: '31px',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],

      h1: [
        '32px',
        {
          lineHeight: '41px',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        },
      ],

      'h4-lg': [
        '20px',
        {
          lineHeight: '26px',
          letterSpacing: '0',
          fontWeight: '600',
        },
      ],

      'h3-lg': [
        '22px',
        {
          lineHeight: '31px',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],

      'h2-lg': [
        '32px',
        {
          lineHeight: '41px',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        },
      ],

      'h1-lg': [
        '48px',
        {
          lineHeight: '56px',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        },
      ],
    },
  },

  plugins: [],
};
