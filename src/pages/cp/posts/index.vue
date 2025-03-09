<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Blog Posts</v-toolbar-title>
      <v-spacer />
      <v-btn to="/cp/posts/create" color="primary">Create Post</v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="post in store.posts" :key="post.id" :to="`/cp/posts/${post.id}/edit`" :title="post.title"
        :subtitle="post.content">
        <template v-slot:append>
          <v-btn :to="`/cp/posts/${post.id}/edit`" icon="mdi-pencil" size="small" class="mr-2"></v-btn>
          <v-btn @click.stop="deletePost(post.id)" icon="mdi-delete" size="small" flat></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog';
const store = useBlogStore();

const deletePost = (id: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    store.deletePost(id);
  }
};
</script>

<route lang="yaml">
meta:
  layout: control-panel
</route>
