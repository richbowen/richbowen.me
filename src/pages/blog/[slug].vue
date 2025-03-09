<template>
  <v-container>
    <v-card v-if="post">
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-subtitle>By: {{ post.author }}, Date: {{ post.date }}</v-card-subtitle>
      <v-card-text v-html="post.content"></v-card-text>
    </v-card>
    <v-container v-else>
      Post not found.
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

const store = useBlogStore();
const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const posts = store.posts;
  const foundPost = posts.find((post) => slugify(post.title) === route.params.slug);
  post.value = foundPost;
});

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
</script>
