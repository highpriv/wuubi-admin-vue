<template>
  <div class="h-full w-full h-screen flex justify-between">
    <div class="w-1/4 md:w-1/6">
      <Sidebar :userInfo="userData" />
    </div>
    <div class="w-3/4 md:w-5/6 pa-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

defineComponent({
  components: {
    Sidebar,
  },
});

const authStore = useAuthStore();
const router = useRouter();
const userData = authStore.userInfo;

if (!authStore.token) {
  router.push("/login");
}
</script>
