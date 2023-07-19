<template>
  <div
    class="bg-side w-full h-full text-side flex flex-col items-center gap-8 p-4 md:p-0"
  >
    <span class="border-b-2 hidden md:block">
      <img
        src="../assets/logo-beyaz.png"
        alt="logo"
        class="w-full h-12 mx-auto my-10"
      />
    </span>
    <span class="rounded-full w-16 h-16 mx-auto border-y-2 border-indigo-600">
      <img src="../assets/avatar.png" alt="avatar" class="w-16 h-16 mx-auto" />
    </span>
    <span class="text-center text-white text-sm mt-4 hidden md:block">
      <p class="text-lg font-bold">
        {{ userInfo.name + " " + userInfo.lastname }}
      </p>
      <p class="text-md">{{ userInfo.email }}</p>
    </span>
    <div>
      <v-list bg-color="transparent">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          @click="
            item.to
              ? $router.push(`/dashboard${item.to}`)
              : authStore.logout($router)
          "
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" class="me-0"></v-icon>
          </template>

          <v-list-item-title
            v-text="item.text"
            class="hidden md:block ml-4"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const items = [
  { text: "Kontrol Paneli", icon: "mdi-view-dashboard", to: "/" },
  { text: "Analizler", icon: "mdi-chart-bubble", to: "/analysis" },
  { text: "İçerikler", icon: "mdi-pencil", to: "/contents" },
  { text: "Kullanıcılar", icon: "mdi-account", to: "/users" },
  { text: "Gruplar", icon: "mdi-account-group", to: "/groups" },
  { text: "Çıkış Yap", icon: "mdi-logout" },
];
</script>
