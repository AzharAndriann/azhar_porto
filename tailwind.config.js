/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    container:{
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
       primary: "#14b8a6",
        dark: "#f8fafc",
        secondary:"#a3a3a3",
        blue:"#1d4ed8",
        bg: "#e2e8f0",
        nav:"#67e8f9",
        niv:"#14b8a6",
        utama: "#14b8a6",
        putih:"#ffff",
        second:"#64748b",
        biru:"#0284c7",
        back:"#172554",
        navb:"#64748b",
        nivb:"#164e63",
        bar:"#353b48",
            },
      screens:{
        "2xl": "1230px",
      }
      
    },
  },
  plugins: [],
};
