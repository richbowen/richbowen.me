<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-pagination v-model="page" :length="pageCount" :total-visible="5"
          @update:model-value="changePage"></v-pagination>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="post in paginatedPosts" :key="post.id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>By: {{ post.author }}, Date: {{ post.date }}</v-card-subtitle>
          <v-card-text>
            <p>{{ truncateText(post.content, 100) }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="`/blog/${slugify(post.title)}`">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="paginatedPosts.length === 0">
      <v-sheet class="pa-4 text-center">
        <v-icon icon="mdi-file-document-outline" size="64" class="mb-4"></v-icon>
        <p class="text-h6">No blog posts yet.</p>
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/blog';
import { computed, ref } from 'vue';

const store = useBlogStore();
const postsPerPage = 10;
const page = ref(1);

const pageCount = computed(() => {
  return Math.ceil(store.posts.length / postsPerPage);
});

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return store.posts.slice(start, end);
});

const changePage = () => {
  window.scrollTo(0, 0);
};

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

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}
</script>
