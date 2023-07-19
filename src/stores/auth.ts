import { defineStore } from "pinia";
import { type Router } from "vue-router";

interface AuthState {
  token: string | null;
  userInfo: {
    name: string;
    lastname: string;
    email: string;
    avatar: string;
  };
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    userInfo: {
      name: "",
      lastname: "",
      email: "",
      avatar: "",
    },
  }),
  persist: {
    storage: sessionStorage,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    logout(router: Router) {
      this.token = null;
      this.userInfo = {
        name: "",
        lastname: "",
        email: "",
        avatar: "",
      };
      router.push("/login");
    },
  },
});
