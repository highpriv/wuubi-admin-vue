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
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style></style>
