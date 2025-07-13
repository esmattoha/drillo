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
    },
  },

  modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],

  // @ts-ignore
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    enableGlobalAppMiddleware: true,
    basePath: "/api/auth",
    provider: {
      type: "authjs",
    },
  },
});
