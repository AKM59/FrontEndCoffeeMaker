<template>
  <v-container class="order-details-container py-8" fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center mb-6">
          <!-- <v-btn 
            :to="route.push('/')" 
            icon 
            variant="text" 
            color="primary" 
            class="mr-3"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn> -->
          <h1 class="text-h4 font-weight-bold mb-0">Order Details</h1>
          <v-chip
            v-if="order.status"
            :color="getStatusColor(order.status)"
            class="ml-4 text-uppercase"
            variant="elevated"
          >
            {{ order.status }}
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row class="order-content">
      <v-col cols="12" md="8">
        <!-- Main Order Information -->
        <v-card elevation="2" class="rounded-xl mb-6 order-card">
          <v-card-title class="d-flex align-center py-4 px-6 primary-gradient">
            <v-icon color="white" class="mr-2">mdi-clipboard-text</v-icon>
            <span class="text-h5 font-weight-bold white--text">Order Information</span>
          </v-card-title>
          <v-card-text class="px-6 py-4">
            <v-row>
              <v-col cols="12" sm="6" v-if="order.priority">
                <div class="info-group">
                  <div class="info-label">Priority</div>
                  <div class="info-value">
                    <v-chip :color="getPriorityColor(order.priority)" size="small" class="text-capitalize">
                      {{ order.priority }}
                    </v-chip>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="customerName">
                <div class="info-group">
                  <div class="info-label">Customer</div>
                  <div class="info-value customer-name">{{ customerName }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="order.quantity">
                <div class="info-group">
                  <div class="info-label">Quantity</div>
                  <div class="info-value">{{ order.quantity }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="order.createdAt">
                <div class="info-group">
                  <div class="info-label">Created</div>
                  <div class="info-value">{{ new Date(order.createdAt).toLocaleString() }}</div>
                </div>
              </v-col>
              <v-col cols="12" v-if="order.fullAddress">
                <div class="info-group">
                  <div class="info-label">Delivery Address</div>
                  <div class="info-value address-box">
                    <v-icon size="small" color="grey" class="mr-2">mdi-map-marker</v-icon>
                    {{ order.fullAddress }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Batch Information -->
        <v-card elevation="2" class="rounded-xl order-card" v-if="Object.keys(batch).length > 0">
          <v-card-title class="d-flex align-center py-4 px-6 secondary-gradient">
            <v-icon color="white" class="mr-2">mdi-package-variant-closed</v-icon>
            <span class="text-h5 font-weight-bold white--text">Production Batch</span>
          </v-card-title>
          <v-card-text class="px-6 py-4">
            <v-row v-if="batch">
              <v-col cols="12" sm="6" v-if="batch.batchId">
                <div class="info-group">
                  <div class="info-label">Batch ID</div>
                  <div class="info-value batch-id">{{ batch.batchId }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="batch.pieces">
                <div class="info-group">
                  <div class="info-label">Pieces</div>
                  <div class="info-value">{{ batch.pieces }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="batch.productionSite">
                <div class="info-group">
                  <div class="info-label">Production Site</div>
                  <div class="info-value">{{ batch.productionSite }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="batch.status">
                <div class="info-group">
                  <div class="info-label">Status</div>
                  <div class="info-value">
                    <v-chip :color="getStatusColor(batch.status)" size="small" class="text-capitalize">
                      {{ batch.status }}
                    </v-chip>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="batch.currentStation">
                <div class="info-group">
                  <div class="info-label">Current Station</div>
                  <div class="info-value">{{ batch.currentStation }}</div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" v-if="batch.updatedAt">
                <div class="info-group">
                  <div class="info-label">Last Updated</div>
                  <div class="info-value">{{ new Date(batch.updatedAt).toLocaleString() }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row v-else-if="noBatch">
              <v-col cols="12">
                <div class="info-group">
                  <div class="info-label"> No Batch Assigned</div>
                </div>
              </v-col>
            </v-row>
                    
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Order Timeline and Actions -->
      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-xl mb-6 action-card">
          <v-card-title class="d-flex align-center py-4 px-6 accent-gradient">
            <v-icon color="white" class="mr-2">mdi-clock-outline</v-icon>
            <span class="text-h5 font-weight-bold white--text">Order Timeline</span>
          </v-card-title>
          <v-card-text class="px-6 py-4">
            <v-timeline align="start" direction="vertical" density="compact" line-color="primary" line-thickness="2">
              <v-timeline-item 
                dot-color="success" 
                size="small"
                icon="mdi-plus-circle"
              >
                <div class="timeline-content">
                  <div class="timeline-title">Order Created</div>
                  <div class="timeline-date">{{ new Date(order.createdAt || Date.now()).toLocaleString() }}</div>
                </div>
              </v-timeline-item>
              
              <v-timeline-item 
                dot-color="info" 
                size="small"
                icon="mdi-truck-outline"
                v-if="batch.batchId"
              >
                <div class="timeline-content">
                  <div class="timeline-title">Batch Assigned</div>
                  <div class="timeline-date">{{ new Date(batch.createdAt || Date.now()).toLocaleString() }}</div>
                </div>
              </v-timeline-item>
              
              <v-timeline-item 
                dot-color="primary" 
                size="small"
                icon="mdi-update"
                v-if="order.updatedAt && order.updatedAt !== order.createdAt"
              >
                <div class="timeline-content">
                  <div class="timeline-title">Last Updated</div>
                  <div class="timeline-date">{{ new Date(order.updatedAt).toLocaleString() }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="rounded-xl action-card">
          <v-card-title class="d-flex align-center py-4 px-6 info-gradient">
            <v-icon color="white" class="mr-2">mdi-cog-outline</v-icon>
            <span class="text-h5 font-weight-bold white--text">Actions</span>
          </v-card-title>
          <v-card-text class="px-6 py-4">
            <v-btn 
              block
              @click="notImplemented()"
              color="primary" 
              class="mb-3" 
              prepend-icon="mdi-pencil"
              variant="elevated"
            >
              Edit Order
            </v-btn>
            <v-btn 
              @click="notImplemented()"
              block 
              color="secondary" 
              class="mb-3" 
              prepend-icon="mdi-printer"
              variant="elevated"
            >
              Print Details
            </v-btn>
            <v-btn
              @click="deleteOrder(order._id)"
              block 
              color="error" 
              variant="elevated"
              prepend-icon="mdi-delete"
            >
              Cancel Order
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const batch = ref({})
const order = ref({})
const error = ref(null)
const toast = useToast()
const customerName = ref('')
const noBatch = ref(false)

// Status and priority color mapping
const getStatusColor = (status) => {
  const statusMap = {
    'pending': 'warning',
    'processing': 'info',
    'completed': 'success',
    'cancelled': 'error',
    'shipped': 'purple'
  }
  return statusMap[status?.toLowerCase()] || 'grey'
}

const getPriorityColor = (priority) => {
  const priorityMap = {
    'critical': 'error',
    'high': 'error-lighten-1',
    'medium': 'warning',
    'low': 'success',
    'very low': 'info'
  }
  return priorityMap[priority?.toLowerCase()] || 'grey'
}

const notImplemented = () => {
  return alert('Functionality not implemented yet.')
}

const fetchBatch = async id => {
  try {
    const { data } = await $fetch(`/api/batches/orders?id=${id}`)
    batch.value = data[0] || {}
    noBatch.value = false;
  } catch (err) {
    noBatch.value = true
    error.value = err
    toast.error({ title: 'Error!', message: 'Error fetching batch.' })
  }
}

const fetchOrderById = async id => {
  try {
    loading.value = true
    const { data } = await $fetch(`/api/orders/${id}`)
    order.value = data || {}
    customerName.value = await fetchCustomerName(order.value.customerId)
  } catch (err) {
    error.value = err
    toast.error({ title: 'Error!', message: 'Error fetching order.' })
  } finally {
    loading.value = false
  }
}

const fetchCustomerName = async id => {
  try {
    const { data } = await $fetch(`/api/customers/${id}`)
    return data.company || 'Unknown Customer'
  } catch (err) {
    return 'Unknown Customer'
  }
}

const deleteOrder = async (id) => {
  if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
    return
  }
  try {
    await $fetch(`/api/orders/${id}`, {
      method: 'DELETE'
    })
    toast.success({ title: 'Success!', message: 'Order deleted successfully.' })
    router.push('/')
  } catch (err) {
    toast.error({ title: 'Error!', message: 'Error deleting order.' })
    console.error(err)
  }
}

onMounted(() => {
  const id = route.params.id
  fetchBatch(id)
  fetchOrderById(id)
})
</script>

<style scoped>
.order-details-container {
  max-width: 1400px;
  margin: 0 auto;
}

.order-card, .action-card {
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.order-card:hover, .action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.primary-gradient {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: white;
}

.secondary-gradient {
  background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
  color: white;
}

.accent-gradient {
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  color: white;
}

.info-gradient {
  background: linear-gradient(135deg, #9c27b0 0%, #e040fb 100%);
  color: white;
}

.info-group {
  margin-bottom: 12px;
}

.info-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
}

.customer-name {
  font-weight: 600;
  color: #1976d2;
}

.batch-id {
  font-family: monospace;
  font-weight: 600;
  color: #ff5722;
  letter-spacing: 0.5px;
}

.address-box {
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.timeline-content {
  padding: 0 12px;
}

.timeline-title {
  font-weight: 600;
  font-size: 14px;
}

.timeline-date {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
