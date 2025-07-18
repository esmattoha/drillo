import { useAuth } from "~/composables/useAuth";
export default defineNuxtRouteMiddleware(async (to) => {
  if (["/auth/signin", "/auth/signup"].includes(to.path)) return;

  const { user, fetchSession } = useAuth();
  if (!user.value) {
    await fetchSession();
    if (!user.value) {
      return navigateTo("/auth/signin");
    }
  }
});
