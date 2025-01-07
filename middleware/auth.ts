// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    // Salvar a rota pretendida para redirecionamento após login
    return navigateTo(`/login?redirect=${to.fullPath}`);
  }
});
