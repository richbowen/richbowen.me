<template>
  <v-app>
    <v-main>
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item to="/cp" link>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/cp/posts" link>
            <v-list-item-title>Blog Posts</v-list-item-title>
          </v-list-item>
          <v-list-item to="/cp/projects" link>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar flat>
        <v-toolbar-title>Control Panel</v-toolbar-title>
        <v-spacer />
        <v-btn to="/" text>Home</v-btn>
      </v-app-bar>
      <v-divider></v-divider>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
