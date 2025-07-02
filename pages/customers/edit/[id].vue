<template>
    <v-card>
        <v-toolbar class="border-b-thin" :color="'white'" dark density="compact" flat>
            <v-toolbar-title>Edit Customer</v-toolbar-title>
        </v-toolbar>

        <!-- show spinner while loading -->
        <div v-if="loading" class="d-flex justify-center pa-6">
            <v-progress-circular indeterminate size="48" />
        </div>

        <v-form v-else ref="form" @submit.prevent="updateCustomer">
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="company" :rules="[
                            (v) => !!v || 'Company name is required']" label="Company" required>
                        </v-text-field>

                        <v-text-field v-model="address" :rules="[
                            (v) => !!v || 'Address is required']" label="Address" required></v-text-field>

                        <v-text-field v-model="countryCode" :rules="[
                            (v) => !!v || 'Country code is required',
                            (v) => v.length === 2 || 'Country code must be 2 characters long'
                        ]" label="Country Code" required>
                        </v-text-field>


                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="vatCode" :rules="[
                            (v) => !!v || 'VAT code is required']" label="VAT" required>
                        </v-text-field>

                        <v-text-field v-model="email" :rules="[
                            (v) => !!v || 'Email is required']" label="Email" required>
                        </v-text-field>

                    </v-col>
                </v-row>
                <v-btn type="submit" color="primary">Submit customer</v-btn>

            </v-container>
        </v-form>

    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
const customerId = ref(null);
const toast = useToast()

const router = useRouter()
const valid = ref(false)
const form = ref(null)
const loading = ref(false)

const company = ref('')
const address = ref('')
const countryCode = ref('')
const vatCode = ref('')
const email = ref('')


const fetchCustomerById = async (id) => {
    loading.value = true;
    try {
        if (isNil(id)) {
            console.error('Customer ID is required');
            return;
        }
        const response = await $fetch(`/api/customers/${id}`, {
            method: 'GET',
        });

        company.value = response.data.company || '';
        address.value = response.data.address || '';
        countryCode.value = response.data.country || '';
        vatCode.value = response.data.vat || '';
        email.value = response.data.email || '';
        loading.value = false;
    } catch (error) {
        console.error('Error fetching customer:', error);
        toast.error({ title: 'Error!', message: 'Error fetching customer.' })

    }
}

const updateCustomer = async () => {
    if (!form.value.validate()) {
        console.error('Form validation failed');
        return;
    }
    try {
        const response = await $fetch(`/api/customers/${customerId.value}`, {
            method: 'PATCH',
            body: {
                company: company.value,
                address: address.value,
                country: countryCode.value,
                vat: vatCode.value,
                email: email.value
            }
        });
        router.push({ path: '/customers' });
    } catch (error) {
        console.error('Error updating customer:', error);
        toast.error({ title: 'Error!', message: 'Error updating customer.' })
    }
}

onMounted(async () => {
    customerId.value = route.params.id;
    if (!customerId.value) {
        console.error('Customer ID is not provided in route params');
        return;
    }
    await fetchCustomerById(customerId.value); 
    form.value.resetValidation(); 
});

</script>