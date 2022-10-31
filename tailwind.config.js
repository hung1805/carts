module.exports = {
  // mode: "jit",
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto, sans-serif"],
        poppins: ["Poppins, sans-serif"],
      },
      transitionProperty: {
        height: "height",
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
      backgroundImage: {
        "cart-bg":
          "linear-gradient(to right, rgba(0,0,0, 0.01), rgba(0,0,0, 0.01)), url('../src/assets/img/cart-bg.png')",
        "empty-cart":
          "linear-gradient(to right, rgba(0,0,0, 0.01), rgba(0,0,0, 0.1)), url('../src/assets/img/empty-box.png')",
        "empty-wishlist":
          "linear-gradient(to right, rgba(0,0,0, 0.01), rgba(0,0,0, 0.01)), url('../src/assets/img/empty-wishlist.png')",
      },
      transitionDelay: {
        0: "0ms",
        2000: "2000ms",
      },
    },
    groupLevel: 4,
    groupScope: "scope",
    groupVariants: ["hover", "focus"],
    listStyleType: {
      square: "square",
    },
    height: {
      custom_banner: "450px",
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      custom_blue: "#4F46E5",
      custom_pink: "#da7b93",
      custom_orange: "#F1592A",
      custom_red: "#fc4445",
      custom_bg_error: "#F87373",
      custom_lightblue: "#1A8CD8",
      custom_yellow: "#FFCB2D",
      custom_grey: "#ADADAD",
      custom_background: "#F3F4F8",
    },
    container: {
      center: true,
      padding: {
        lg: "2rem",
        xl: "3rem",
        "2xl": "6rem",
      },
      screen: {
        ssm: "480px",
      },
    },
    keyframes: {
      growDown: {
        "0%": {
          opacity: 0,
          transform: "translateY(-100%)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      growUp: {
        "0%": {
          transform: "translateY(-100%)",
        },
        "100%": {
          transform: "translateY(0%)",
        },
      },
      fadeOut: {
        "0%": {
          opacity: 0,
          transform: "scale(0)",
        },
        "100%": {
          opacity: 1,
          transform: "scale(1)",
        },
      },
      growOut: {
        "0%": {
          transform: "scale(0)",
        },
        "80%": {
          transform: "scale(1,1)",
        },
        "100%": {
          transform: "scale(1)",
        },
      },
      animate: {
        "0%": {
          transform: "translateX(100%)",
          opacity: 0,
        },
        "100%": {
          transform: " translateX(0)",
          opacity: 1,
        },
      },
    },
    animation: {
      growOut: "growOut 1s ease-in-out forwards",
      fadeOut: "fadeOut 0.5s ease-in-out",
      animate: "animate 1s ease-in-out",
    },
  },
  variants: {
    extend: {
      display: ["hover", "focus", "group-hover"],
      backgroundColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
      textColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
      transitionProperty: ["hover", "focus"],
      height: ["hover", "group-hover"],
    },
    scrollbar: ["rounded"],
  },
  plugins: [
    require("tailwindcss-nested-groups"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
  ],
};
