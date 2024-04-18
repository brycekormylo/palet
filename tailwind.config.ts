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
        'base': {
          default: 'hsl(220,100%,50%)',
          '100': 'hsl(220,100%,60%)'
        }
      }
    },
  },
  plugins: [],
};
export default config;
