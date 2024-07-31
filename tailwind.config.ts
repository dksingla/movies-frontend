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
        primary: '#2BD17E',
        error : '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',   
        'custom-border': 'rgba(34, 73, 87, 1)',
        hover: 'rgba(8, 41, 53, 0.55)',   
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
        13:'200px',
        14:'300px',
        15:'420px',
      },
      maxWidth: {
        Container: '1440px',
      },
    },
  },
  plugins: [],
};
export default config;
