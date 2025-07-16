export const useAuth = () => {
  const user: any = useState("auth:user", () => null);
  const loading = useState("auth:loading", () => false);
  const toast = useToast();

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
      await signin({ email: payload.email, password: payload.password });
      toast.add({
        color: "success",
        title: "Success",
        description: "Your account has been created successfully.",
      });
    } catch (err: any) {
      toast.add({
        color: "error",
        title: "Error",
        description: err?.data?.statusMessage || err.message,
      });
      throw err;
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
      toast.add({
        color: "success",
        title: "Success",
        description: "You are successfully Signed In",
      });
    } catch (err: any) {
      toast.add({
        color: "error",
        title: "Error",
        description: err?.data?.statusMessage || err.message,
      });
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signout = async () => {
    await $fetch("/api/auth/signout", { method: "POST" });
    user.value = null;
    await navigateTo("/auth/signin");
    toast.add({
      color: "success",
      title: "Success",
      description: "Sign out successfully.",
    });
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
