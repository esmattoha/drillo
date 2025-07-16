export const useAuth = () => {
  const user: any = useState("auth:user", () => null);
  const loading = useState("auth:loading", () => false);

  const fetchSession = async () => {
    try {
      loading.value = true;
      const session = await $fetch("/api/auth/session");
      user.value = session;
      return session;
    } catch {
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const signup = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    loading.value = true;
    try {
      await $fetch("/api/auth/signup", { method: "POST", body: payload });
      return await signin({ email: payload.email, password: payload.password });
    } finally {
      loading.value = false;
    }
  };

  const signin = async (payload: { email: string; password: string }) => {
    loading.value = true;
    try {
      const res = await $fetch("/api/auth/signin", {
        method: "POST",
        body: payload,
      });
      localStorage.setItem("auth_token", res.token);
      user.value = res.user;
    } finally {
      loading.value = false;
    }
  };

  const signout = async () => {
    await $fetch("/api/auth/signout", { method: "POST" });
    user.value = null;
    await navigateTo("/auth/signin");
  };

  return {
    user,
    loading,
    fetchSession,
    signup,
    signin,
    signout,
  };
};
