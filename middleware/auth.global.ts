import { useAuth } from "~/composables/useAuth";
export default defineNuxtRouteMiddleware(async (to) => {
  if (["/auth/signin", "/auth/signup"].includes(to.path)) return;

  const auth = useAuth();
  if (!auth.user.value) {
    await auth.fetchSession();
    if (!auth.user.value) return navigateTo("/auth/signin");
  }
});
