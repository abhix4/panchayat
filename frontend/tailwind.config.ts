import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      colors:{
        "primaryColor":"#16213e"
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(-45deg, #1a1a2e, #16213e, #1b2430, #0f172a)',
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
    },
    
    
  },
  plugins: [],
} satisfies Config;
