<template>
  <div class="bg-gray-100 h-full rounded-md pa-4 overflow-scroll">
    <v-alert
      v-if="alertDialog.show"
      :text="alertDialog.text"
      :type="alertDialog.type"
      class="mb-3"
    ></v-alert>
    <div
      class="flex items-center justify-between text-xl font-bold pa-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md mb-4 text-white"
    >
      <h1>İçeriği Düzenle</h1>
      <div>
        <v-btn color="success" @click="editContent"> Kaydet </v-btn>
      </div>
    </div>
    <div class="w-full">
      <img
        :src="imgDomain + contentData.thumbnail"
        alt="content image"
        class="w-full h-48 object-cover rounded-md mb-4"
      />
    </div>

    <div class="flex w-full gap-6">
      <div class="w-2/3">
        <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
          İçerik Başlığı
        </span>
        <v-text-field
          v-model="contentData.title"
          placeholder="Başlık"
          variant="outlined"
          class="w-full"
        />
      </div>
      <div class="w-1/3">
        <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
          İçerik Durumu
        </span>
        <v-select
          v-model="contentData.status"
          :items="statusOptions"
          placeholder="Başlık"
          variant="outlined"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex gap-4">
      <div class="w-1/2">
        <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
          Slug
        </span>
        <v-text-field
          v-model="contentData.slug"
          placeholder="Slug"
          variant="outlined"
        />
      </div>
      <div class="w-1/2">
        <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
          Kategori
        </span>
        <v-select
          v-model="contentData.category"
          :items="categories"
          variant="outlined"
          placeholder="Kategori"
        />
      </div>
    </div>
    <div>
      <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
        İçerik Özeti
      </span>
      <v-textarea
        v-model="contentData.summary"
        placeholder="İçerik"
        variant="outlined"
        class="w-full"
      />
    </div>
    <div>
      <span class="text-sm font-bold text-gray-500 mb-2 block pa-2">
        İçerik
      </span>
      <QuillEditor
        class="border border-gray-300 border-t-0 rounded-b-md"
        theme="snow"
        v-model:content="contentData.content"
        contentType="html"
      />
    </div>
  </div>
</template>

<script setup>
import api from "@/service/api";
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const authStore = useAuthStore();

const { slug } = defineProps(["slug"]);
const alertDialog = ref({
  show: false,
  text: "",
  type: "",
});

watch(
  () => alertDialog.value.show,
  (value) => {
    if (value) {
      setTimeout(() => {
        alertDialog.value.show = false;
      }, 2000);
    }
  }
);
const statusOptions = ["Published", "Draft", "Pending", "Rejected"];

const editContent = () => {
  api
    .put("/admin/posts/?id=" + contentData.value._id, contentData.value)
    .then((response) => {
      if (response.status === 200) {
        alertDialog.value = {
          show: true,
          text: "İçerik başarıyla güncellendi.",
          type: "success",
        };
      } else {
        alertDialog.value = {
          show: true,
          text: "İçerik güncellenirken bir hata oluştu.",
          type: "error",
        };
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const imgDomain = "https://wuubi-media.s3.eu-central-1.amazonaws.com/";
const contentData = ref({ content: "<p>Placeholder content</p>" });
const categories = authStore.siteConfig.contentCategories.map((category) => {
  return category.name;
});

onMounted(async () => {
  try {
    const response = await api.get("/admin/posts?slug=" + slug);
    contentData.value = response.data.posts[0];
  } catch (error) {
    console.error("Error fetching contents:", error);
  }
});
</script>
