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
  siteConfig: {
    metaTitle: string;
    contactAddress: string;
    contentCategories: string[];
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
    siteConfig: {
      metaTitle: "",
      contactAddress: "",
      contentCategories: [],
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
    async setSiteConfig() {
      const response = await fetch("http://localhost:3000/settings");
      const data = await response.json();
      this.siteConfig = data;
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
