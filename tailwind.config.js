/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors : {
        'custom-green': '#36A420',
        'custom-gray' : '#606770'
      },
      screens: {
        'custom-sm': '375px',
    }
    }
  },
  plugins: [
    require('flowbite/plugin')
],
}