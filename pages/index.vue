<template>
  <v-container fluid class="orders-page">
    <h1 class="mb-4">Orders</h1>

    <v-banner>
      <v-row class="d-flex ">
        <v-col cols="2">
          <v-btn class="button_order" @click="redirectTo('new')" color="primary" >
            <v-icon left>mdi-plus</v-icon>
            Create Order
          </v-btn>
        </v-col>
        <v-col cols="4">

          <div class="">
            <v-select width="250px" v-model="selectedStatus" :items="status" item-title="text" item-value="value"
              label="Filter by Status" clearable variant="outlined" @update:model-value="searchStatus" />
          </div>
        </v-col>
      </v-row>

    </v-banner>


    <v-alert v-if="errorMessage" :type="errorType" variant="tonal" class="mb-4" dismissible
      @update:modelValue="errorMessage = ''">
      {{ errorMessage }}
    </v-alert>

    <v-data-table-server :headers="headers" :items="orders" :items-length="totalResults" :loading="loading"
      :items-per-page="10" item-key="_id" class="px-4" @update:options="fetchOrders">
      <template #item.priority="{ item }">
        <v-chip variant="tonal" class="text-capitalize" :color="formatPriority(item.priority)?.color || 'grey'">
          {{ formatPriority(item.priority)?.label || 'Unknown' }}
        </v-chip>
      </template>

      <template #item.status="{ item }">
        <v-chip label variant="tonal" class="text-capitalize" :color="formatStatus(item.status)?.color || 'grey'">
          {{ formatStatus(item.status)?.text || 'Unknown' }}
        </v-chip>
      </template>

      <template #item.createdAt="{ item }">
        {{ new Date(item.createdAt).toLocaleDateString() }}
      </template>

      <template #item.updatedAt="{ item }">
        {{ new Date(item.updatedAt).toLocaleDateString() }}
      </template>

      <template #item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="redirectTo(item._id)">
          mdi-eye
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template #loading>
        <v-row justify="center" class="my-4">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { priorityItems, orderStatuses } from '#imports'

const selectedStatus = ref(null)
const errorMessage = ref('')
const errorType = ref('error')
const orders = ref([])
const loading = ref(true)
const totalResults = ref(0)

const router = useRouter()

const status = ref(orderStatuses)

const headers = [
  { title: 'Status', key: 'status' },
  { title: 'Company', key: 'customerId.company' },
  { title: 'Created At', key: 'createdAt' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Priority', key: 'priority' },
  { title: 'Address', key: 'fullAddress' },
  { title: 'Updated At', key: 'updatedAt' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const formatStatus = (status) => {
  return orderStatuses.find(item => item.value === status) || ''
}

const formatPriority = (priority) => {
  return priorityItems.find(item => item.value === priority) || ''
}

const redirectTo = (path) => {
  router.push({ path: `/orders/${path}` })
}

const fetchOrders = async (options) => {
  try {
    loading.value = true
    const response = await $fetch(`/api/orders?page=${options.page}&limit=${options.itemsPerPage}`)
    orders.value = response.data?.results || []
    totalResults.value = response.data?.totalResults || 0
    errorMessage.value = ''
  } catch (err) {
    console.error('Error fetching orders:', err)
    errorMessage.value = 'Failed to fetch orders. Please try again later.'
    errorType.value = 'error'
  } finally {
    loading.value = false
  }
}

const searchStatus = async () => {
  if (!selectedStatus.value) {
    return fetchOrders({ page: 1, itemsPerPage: 10 })
  }

  try {
    loading.value = true
    const response = await $fetch(`/api/orders/filters?status=${selectedStatus.value}`)
    orders.value = response.data || []
    totalResults.value = response.data?.totalResults || 0
    errorMessage.value = ''
  } catch (err) {
    console.error('Error fetching orders by status:', err)
    errorMessage.value = 'Failed to fetch orders by status. Please try again later.'
    errorType.value = 'error'
  } finally {
    loading.value = false
  }
}

const clearStatusFilter = () => {
  selectedStatus.value = null
  fetchOrders({ page: 1, itemsPerPage: 10 })
}

const deleteItem = async (item) => {
  if (confirm(`Are you sure you want to delete order ${item._id}?`)) {
    try {
      await $fetch(`/api/orders/${item._id}`, { method: 'DELETE' })
      await fetchOrders({ page: 1, itemsPerPage: 10 })
      errorMessage.value = 'Order deleted successfully.'
      errorType.value = 'success'
    } catch (err) {
      console.error('Failed to delete order:', err)
      errorMessage.value = 'Failed to delete order. Please try again later.'
      errorType.value = 'error'
    }
  }
}

onMounted(() => {
  fetchOrders({ page: 1, itemsPerPage: 10 })
})
</script>

<style scoped>
.orders-page {
  padding: 2rem;
}

.v-card {
  padding: 1rem;
}

.button_order {
  width: 100% !important;
  max-width: 200px !important;
  height: 55px !important;
}

</style>
