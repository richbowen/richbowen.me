<template>
  <v-row class="mt-4">
    <v-col cols="12" md="8">
      <v-card class="pr-4 pt-4">
        <v-row dense>
          <v-col cols="12" md="3">
            <v-img src="@/assets/richbowen.png" alt="Richard Bowen" width="300" rounded></v-img>
          </v-col>
          <v-col cols="12" md="9">
            <h2 class="text-h5 pb-2">A digital artisan building great software</h2>
            <p class="pb-4">
              I specialize in effective, highly usable product implementation, whether it is an MVP or revamping an
              existing product.
            </p>
            <br />
            <p>
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
        <v-list v-if="posts.length > 0">
          <v-list-item v-for="post in posts" :key="post.id" :to="`/blog/${slugify(post.title)}`" :title="post.title">
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>No posts yet.</v-list-item>
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
import { slugify } from '@/utils';

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
</script>
