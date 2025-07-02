<template>
  <v-card>
    <v-toolbar class="border-b-thin" :color="'white'" dark density="compact" flat>
      <v-toolbar-title>New Order</v-toolbar-title>
    </v-toolbar>
    <v-form ref="form" @submit.prevent="submitOrder">

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <v-select v-model="selectedCustomer" item-title="text" item-value="value" :items="customersList"
              label="Select Customer" :rules="[(v) => !!v || 'Customer is required']" required></v-select>


            <v-select item-title="text" item-value="value" v-model="selectedPriority" :items="priorityList" label="Select Priority" :rules="[(v) => !!v || 'Priority is required']"
              required></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field disabled v-model="fullAddress" :rules="[
              (v) => !!v || 'Full address is required']" label="Full Address" required></v-text-field>

            <v-number-input v-model="quantity" :rules="[
              (v) => !!v || 'Quantity is required',
              (v) => v >= 0 || 'Quantity cannot be negative'
            ]" label="Quantity" required>
            </v-number-input>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="isSubmitting" :disabled="isSubmitting">
          <v-icon start class="mr-1">mdi-check</v-icon>
          {{ isSubmitting ? 'Submitting...' : 'Submit Order' }}
        </v-btn>

      </v-container>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { priorityItems } from '#imports'
// const route = useRoute()
const toast = useToast()
const router = useRouter()
const selectedPriority = ref(null)
const selectedCustomer = ref(null)
const priorityList = ref(priorityItems.map(item => ({
  text: item.label,
  value: item.value,
})))
const fullAddress = ref('')
const quantity = ref(0)
const valid = ref(false)
const customersList = ref([])
const form = ref(null)
const isSubmitting = ref(false) //loading state

const fetchCustomers = async () => {
  try {
    const response = await $fetch('/api/customers?page=1&limit=20', {
      method: 'GET',
    });
    customersList.value = response.data.results.map(c => ({
      text: c.company,
      value: c._id
    }))
  } catch (error) {
    toast.error({ title: 'Error!', message: 'Error fetching customers' })

    console.error('Error fetching customers:', error);
  }
};

onMounted(() => {
  fetchCustomers();
});

const fetchFullAddress = async (id) => {
  try {
    const response = await $fetch(`/api/customers/${id}`, {
      method: 'GET',
    });
    fullAddress.value = response.data?.address || '';
  } catch (err) {
    console.log('Error fetching address:', err);
    toast.error({ title: 'Error!', message: 'Error fetching address.' })

  }
}

const submitOrder = async () => {
  if (!form.value.validate()) {
    toast.error({ title: 'Validation Error', message: 'Please fill in all required fields correctly.' });
    return;
  }
  
  try {
    isSubmitting.value = true; // Start loading
    
    const orderData = {
      customerId: selectedCustomer.value,
      fullAddress: fullAddress.value,
      quantity: quantity.value,
      priority: selectedPriority.value,
    };
    console.log('Order data:', orderData);
    const response = await $fetch('/api/orders', {
      method: 'POST',
      body: orderData
    });

    console.log('Order created successfully:', response);
    toast.success({ title: 'Success!', message: 'Order created successfully.' });
    router.push({ path: '/' });
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error({ title: 'Error!', message: 'Error creating order.' });
  } finally {
    isSubmitting.value = false; // End loading regardless of result
  }
}

watch(selectedCustomer, (newValue) => {
  if (!newValue) {
    fullAddress.value = ''
  } else {
    fetchFullAddress(newValue);
  }
})
</script>