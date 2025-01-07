// stores/auth.ts
import { defineStore } from "pinia";
import type { User } from "~/types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    login(user: User, token: string) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
