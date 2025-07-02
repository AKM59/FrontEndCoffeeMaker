<template>
  <v-app>
    <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
    <v-list-item title="" subtitle="">
        <v-img width="250" src="/logo.png" />
      <v-list-item-title class="text-purple-lighten-4 font-weight-bold">CoffeeMek</v-list-item-title>
      <v-list-item-subtitle class="text-purple-lighten-3">Gestione ordini e clienti</v-list-item-subtitle>
    </v-list-item>

      <v-divider></v-divider>
      <v-list active-class="text-purple-lighten-4 font-weight-bold" color="transparent">
        <v-list-item
          v-for="item in items"
          :key="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn to="/altervista" block color="yellow-darken-1" variant="tonal">
            <v-icon class="swing-icon" left>mdi-egg-easter</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
<script setup>
import { navItems } from '#imports'
const items = navItems;

</script>

<style scoped>
@keyframes swing {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(10deg); }
  50%  { transform: rotate(0deg); }
  75%  { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}

.swing-icon {
  display: inline-block;
  animation: swing 1s infinite ease-in-out;
  transform-origin: bottom center;
}
</style>
