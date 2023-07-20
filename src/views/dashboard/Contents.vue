<template>
  <div class="w-full">
    <div
      class="bg-header text-white p-4 w-full mb-4 flex items-center gap-3 rounded-md"
    >
      <v-icon icon="mdi-pencil" />
      <h2 class="font-bold">İçerikler</h2>
    </div>
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px"
      :columnDefs="columnDefs.value"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      :pagination="true"
      :paginationPageSize="10"
      @cellClicked="$router.push(`/dashboard/contents/${$event.data?.slug}`)"
    >
    </ag-grid-vue>
  </div>
</template>
<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { reactive, ref } from "vue";
import { defineComponent } from "vue";
import { onMounted } from "vue";
import api from "@/service/api";

defineComponent({
  components: {
    AgGridVue,
  },
});

const rowData = ref([]);
const columnDefs = reactive({
  value: [
    { field: "status", headerName: "Durum" },
    { field: "title", headerName: "Başlık" },
    { field: "category", headerName: "Kategori" },
    { field: "slug", headerName: "Slug" },
    { field: "createdAt", headerName: "Oluşturulma Tarihi" },
    {
      field: "userID.username",
      headerName: "Oluşturan",
    },
  ],
});

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

onMounted(async () => {
  try {
    const response = await api.get("/admin/posts");
    rowData.value = response.data.posts;
  } catch (error) {
    console.error("Error fetching contents:", error);
  }
});

const getContents = async () => {};

getContents();
</script>
