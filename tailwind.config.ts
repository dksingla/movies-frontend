import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        error : '#F44336',
        background: '#1E2A38',
        input: '#2E3B4E',
        card: '#34475E',       
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        1:'2px',
        2:'4px',
        3:'8px',
        4:'12px',
        5:'16px',
        6:'24px',
        7:'32px',
        8:'40px',
        9:'48px',
        10:'64px',
        11:'80px',
        12:'120px',
        13:'160px',
      },
      maxWidth: {
        Container: '1440px',
      },
    },
  },
  plugins: [],
};
export default config;
