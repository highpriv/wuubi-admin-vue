<template>
  <v-app>
    <v-main class="bg-black">
      <v-container class="flex h-screen items-center justify-center">
        <div
          class="bg-white w-full md:w-1/2 p-6 rounded-lg flex flex-col items-center justify-center"
        >
          <img src="../assets/logo.png" alt="logo" class="mb-6 w-48" />
          <v-form v-model="form" @submit.prevent="onSubmit" class="w-full">
            <v-text-field
              type="email"
              v-model="email"
              :rules="[required]"
              class="mb-2"
              label="Email"
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              :rules="[required]"
              label="Şifre"
              placeholder="Şifrenizi Giriniz"
            ></v-text-field>

            <br />

            <v-btn
              @click="login"
              :disabled="!form"
              :loading="loading"
              block
              class="bg-black"
              size="large"
              type="submit"
              variant="elevated"
            >
              Giriş Yap
            </v-btn>
          </v-form>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "App",
  data() {
    return {
      form: false,
      email: "",
      password: "",
      loading: false,
      required: (v) => !!v || "Bu alan zorunludur",
    };
  },

  methods: {
    async login() {
      try {
        const response = await this.$axios.post("/admin/login", {
          email: this.email,
          password: this.password,
        });

        const data = response.data;

        if (response.status === 200) {
          const { name, email, lastname, avatar } = data;
          useAuthStore().setToken(data.token);
          useAuthStore().setUserInfo({
            name,
            email,
            lastname,
            avatar,
          });
          this.$router.push("/dashboard");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
