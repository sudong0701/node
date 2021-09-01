module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "520px": "520px",
        "dialog": "420px",
        "largeSelect": "209px",
        "mediumSelect": "119px",
        "smallSelect": "99px"
      },
      maxHeight: {
        "icon": "240px"
      },
      flex: {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5
      },
      margin: {
        "s": 4,
        "m": 8,
        "l": 16,
        "naive": 20,
        "xl": 24,
        "2xl": 32,
        "3xl": 40,
        "4xl": 48,
        '50': 50
      },
      padding: {
        "s": 4,
        "m": 8,
        "l": 16,
        "naive": 20,
        "xl": 24,
        "2xl": 32,
        "3xl": 40,
        "4xl": 48,
        '50': 50
      },
      inset: {
        "s": 4,
        "m": 8,
        "l": 16,
        "naive": 20,
        "xl": 24,
        "2xl": 32,
        "3xl": 40,
        "4xl": 48,
        '50': 50,
        '60': 60,
        "73": 73,
        '129': 129,
        '224': 224,
        '282': 282
      },
      fontSize: {
        "s": '12px',
        "m": "14px",
        "l": "16px",
        "xl": "18px",
        "2xl": "20px",
        "3xl": "22px",
        "4xl": "24px",
        "5xl": "26px",
        "6xl": "28px",
        "7xl": "30px"
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#409eff',
        'primary-500': 'rgb(64, 158, 255, .5)',
        'primary-400': 'rgb(64, 158, 255, .4)',
        'primary-300': 'rgb(64, 158, 255, .3)',
        'primary-200': 'rgb(64, 158, 255, .2)',
        'primary-100': 'rgb(64, 158, 255, .1)',
        'success': '#67C23A',
        'warning': '#E6A23C',
        'danger': '#F56C6C',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary': '#409eff',
        'primary-500': 'rgb(64, 158, 255, .5)',
        'primary-400': 'rgb(64, 158, 255, .4)',
        'primary-300': 'rgb(64, 158, 255, .3)',
        'primary-200': 'rgb(64, 158, 255, .2)',
        'primary-100': 'rgb(64, 158, 255, .1)',
        'success': '#67C23A',
        'warning': '#E6A23C',
        'danger': '#F56C6C',
      }),
      borderRadius: {
        's': '5px',
        'm': '10px'
      },
      boxShadow: {
        "default": '0px 0px 10px rgba(153, 153, 153, 0.15)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
