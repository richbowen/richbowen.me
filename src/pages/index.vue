<template>
  <v-row class="mt-4">
    <v-col cols="12" md="8">
      <v-card>
        <v-row>
          <v-col cols="12" md="2">
            <v-img src="@/assets/richbowen.jpeg" alt="Richard Bowen" width="150" rounded></v-img>
          </v-col>
          <v-col cols="12" md="10">
            <p>
              Welcome to my blog! I'm Richard Bowen, a passionate writer and developer.
              Here, I share my thoughts, projects, and experiences.
            </p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="pa-4">
        <v-btn v-for="(social, index) in socials" :key="index" icon flat :href="social.url" target="_blank">
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-card>

      <v-card class="mt-4">
        <v-card-title>Recent Blog Posts</v-card-title>
        <v-list>
          <v-list-item v-for="post in posts" :key="post.id" :to="`/blog/${slugify(post.title)}`" :title="post.title">
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn variant="text" to="/blog">All blog posts</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useBlogStore } from '@/stores/blog';

interface Social {
  name: string;
  icon: string;
  url: string;
}

const socials = ref<Social[]>([
  {
    name: 'Twitter',
    icon: 'mdi-twitter',
    url: 'https://twitter.com/richgraemebowen',
  },
  {
    name: 'GitHub',
    icon: 'mdi-github',
    url: 'https://github.com/richbowen',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi-linkedin',
    url: 'https://linkedin.com/in/richgraemebowen',
  },
  {
    name: 'Instagram',
    icon: 'mdi-instagram',
    url: 'https://instagram.com/richgraemebowen',
  },
]);

const store = useBlogStore();

const posts = computed(() => store.posts.slice(0, 3));

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
