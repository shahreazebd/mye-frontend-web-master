// const { fontFamily } = require("tailwindcss/defaultTheme");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
        xl: "1280px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "480px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        newPrimary: {
          DEFAULT: "var(--newPrimary)",
          foreground: "var(--primary-foreground)",
        },
        smartCommunicationBg: {
          DEFAULT: "var(--smartCommunicationBg)",
          foreground: "var(--smartCommunicationBg-foreground)",
        },
        heroBackground: {
          DEFAULT: "var(--heroBackground)",
          foreground: "var(--heroBackground-foreground)",
        },
        shippingHeroBackground: {
          DEFAULT: "var(--shippingHeroBackground)",
          foreground: "var(--shippingHeroBackground-foreground)",
        },
        automationShippingBg: {
          DEFAULT: "var(--automationShippingBg)",
          foreground: "var(--automationShippingBg-foreground)",
        },
        majorCarrierBg: {
          DEFAULT: "var(--majorCarrierBg)",
          foreground: "var(--majorCarrierBg-foreground)",
        },
        shippingRatesBg: {
          DEFAULT: "var(--shippingRatesBg)",
          foreground: "var(--shippingRatesBg-foreground)",
        },
        faqBg: {
          DEFAULT: "var(--faqBg)",
          foreground: "var(--faqBg-foreground)",
        },
        singleIntegrationBg: {
          DEFAULT: "var(--singleIntegrationBg)",
          foreground: "var(--singleIntegrationBg-forground)",
        },
        integrationBg: {
          DEFAULT: "var(--integrationBg)",
          foreground: "var(--integrationBg-forground)",
        },
        footer: {
          DEFAULT: "var(--footer)",
          foreground: "var(--footer-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        dark: {
          DEFAULT: "var(--dark)",
          foreground: "var(--dark-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      linearGradientColors: {
        custom: ["#99caff", "#fff6ea"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
