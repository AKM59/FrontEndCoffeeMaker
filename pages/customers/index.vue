<template>
  <v-container class="customers-page" fluid>
    <h2 class="mb-4">Customers</h2>

    <v-banner>
      <v-btn @click="redirectToNewPage()" color="primary" class="mb-2">
        <v-icon left>mdi-plus</v-icon>
        Create customer
      </v-btn>
    </v-banner>

    <v-data-table-server
      :search="search"
      :headers="headers"
      :items="customers"
      :items-length="totalResults"
      :loading="loading"
      :items-per-page="10"
      item-key="_id"
      class="mt-4"
      @update:options="fetchCustomers"
    >
      <!-- Actions column -->
      <template #item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="redirectToEditPage(item._id)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <!-- Date formatting -->
      <template #item.createdAt="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString() }}
      </template>

      <!-- Loading spinner -->
      <template #loading>
        <v-row justify="center" class="py-6">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const customers = ref([]);
const totalResults = ref(0);
const loading = ref(false);
const error = ref(null);

const headers = [
  { title: 'Company', key: 'company' },
  { title: 'Address', key: 'address' },
  { title: 'Country', key: 'country' },
  { title: 'VAT', key: 'vat' },
  { title: 'Email', key: 'email' },
  { title: 'Created At', key: 'createdAt' },
  { title: 'Actions', key: 'actions', sortable: false }
];

function redirectToEditPage(id) {
  router.push({ path: `/customers/edit/${id}` });
}

function redirectToNewPage() {
  router.push({ path: '/customers/new' });
}

const fetchCustomers = async (options = { page: 1, itemsPerPage: 10 }) => {
  try {
    loading.value = true;

    const { page, itemsPerPage } = options;

    const response = await $fetch(`/api/customers?page=${page}&limit=${itemsPerPage}`, {
      method: 'GET',
    });

    customers.value = response.data?.results || [];
    totalResults.value = response.data?.totalResults || 0;
  } catch (err) {
    error.value = err;
    console.error('Error fetching customers:', err);
  } finally {
    loading.value = false;
  }
};

const deleteItem = async (item) => {
  try {
    const confirmed = confirm(`Are you sure you want to delete ${item.company}?`);
    if (!confirmed) return;

    await $fetch(`/api/customers/${item._id}`, {
      method: 'DELETE',
    });

    // Refresh first page to keep user on valid page index
    fetchCustomers({ page: 1, itemsPerPage: 10 });
  } catch (err) {
    console.error('Error deleting customer:', err);
  }
};

onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
.customers-page {
  padding: 2rem;
}
</style>
