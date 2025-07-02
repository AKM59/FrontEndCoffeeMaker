<template>
    <v-card>
        <v-toolbar class="border-b-thin" :color="'white'" dark density="compact" flat>
            <v-toolbar-title>New Customer</v-toolbar-title>
        </v-toolbar>
        <v-form ref="form" @submit.prevent="submitCustomer">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const toast = useToast()
const router = useRouter()
const form = ref(null)

const company = ref('')
const address = ref('')
const countryCode = ref('')
const vatCode = ref('')
const email = ref('')


const submitCustomer = async () => {
    try {
        const customerData = {
            company: company.value,
            address: address.value,
            country: countryCode.value,
            vat: vatCode.value,
            email: email.value
        };
        const response = await $fetch('/api/customers', {
          method: 'POST',
          body: customerData
        });

        console.log('Customer created successfully:', response);
        router.push({ path: '/' }); // Redirect to orders page after successful creation
    } catch (error) {
        console.error('Error creating customer:', error);
        toast.error({ title: 'Error!', message: 'Error creating customer.' })

    }
}


</script>