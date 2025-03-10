<template>
  <v-main>
    <v-container>
      <div class="text-h4 my-4 font-weight-bold">
        <router-link to="/" class="text-decoration-none text-black">Richard Bowen</router-link>
      </div>
      <v-toolbar>
        <v-btn variant="text" to="/about" class="mr-3">About</v-btn>
        <v-btn variant="text" to="/blog" class="mr-3">Blog</v-btn>
        <v-btn variant="text" to="/projects">Projects</v-btn>
      </v-toolbar>
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>
