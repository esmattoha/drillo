import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      origin: process.env.AUTH_ORIGIN,
      baseURL: process.env.AUTH_BASE_URL,
    },
  },

  modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],

  // @ts-ignore
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: process.env.AUTH_BASE_URL,
    originEnvKey: process.env.AUTH_ORIGIN,
    // provider: {
    //   type: "authjs",
    // },
    // sessionRefresh: {
    //   enablePeriodically: true,
    //   enableOnWindowFocus: true,
    // },
  },
});
