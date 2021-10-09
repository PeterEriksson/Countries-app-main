module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: { mainFont: ["Nunito Sans"] },
      colors: {
        whiteSmokeBg: "#f5f5f5",
        mainDark: "#202C37",
        mainDarkGrayish: "#333E48",
        mainLightBg: "#ebe8e8",
        borderColor: "#2B3945",
        lightBorderColor: "#bababa",
        borderLightTest: "#e0e0e0",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      screens: {
        smallMediumBreakpoint: "660px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
