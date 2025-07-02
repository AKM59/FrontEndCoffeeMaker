<template>
  <v-col cols="12" md="4">
    <div class="_field py-4 px-4">
      <span class="_fieldKey font-weight-bold">{{ label }}</span><br />
      <span class="grey--text">{{ value }}</span>
    </div>
  </v-col>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number, Boolean]
})
</script>
