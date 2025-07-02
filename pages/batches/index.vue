<template>
  <v-container fluid class="">
    <h2 class="mb-4">Batches</h2>

    <v-data-table-server
      :headers="headers"
      :items="batches"
      :items-length="totalResults"
      :loading="loading"
      :items-per-page="10"
      item-key="_id"
      @update:options="fetchBatches"
    >
          <template #item.createdAt="{ item }">
        {{ new Date(item.createdAt).toLocaleString() }}
      </template>
      <template #item.updatedAt="{ item }">
        {{ new Date(item.updatedAt).toLocaleString() }}
      </template>

      <template v-slot:loading>
        <v-row justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-data-table-server>
  </v-container>

</template>

<script setup>
const toast = useToast()
const loading = ref(false)
const batches = ref([]);
const totalResults = ref(0);
const error = ref(null);


const headers = [
  { title: 'Batch ID', key: 'batchId' },
  { title: 'Pieces', key: 'pieces' },
  { title: 'Production Site', key: 'productionSite' },
  { title: 'Status', key: 'status' },
  { title: 'Current Station', key: 'currentStation' },
  { title: 'Created At', key: 'createdAt' },
  { title: 'Updated At', key: 'updatedAt' },
]


const fetchBatches = async (options) => {
  try {
    loading.value = true;
    const response = await $fetch(`/api/batches?page=${options.page}&limit=${options.itemsPerPage}`, {
      method: 'GET'
    });
    batches.value = response.data?.results || [];
    totalResults.value = response.data?.totalResults || 0;
  } catch (err) {
    toast.error({ title: 'Error!', message: 'Error fetching batches.' })
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBatches({ page: 1, itemsPerPage: 10 });
});

</script>

<style scoped></style>