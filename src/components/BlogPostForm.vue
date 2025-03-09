<template>
  <v-container>
    <v-form @submit.prevent="savePost">
      <v-text-field v-model="post.title" label="Title" required></v-text-field>
      <v-textarea v-model="post.content" label="Content" required auto-grow></v-textarea>
      <v-btn type="submit" color="primary">{{ postId ? 'Update' : 'Create' }} Post</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useBlogStore } from '@/stores/blog';
import { useRouter, useRoute } from 'vue-router';
import { slugify } from '@/utils';

const store = useBlogStore();
const router = useRouter();
const route = useRoute();

const postId = route.params?.id;
const isEditing = !!postId;

const post = reactive({
  id: isEditing ? parseInt(postId) : Date.now(),
  title: '',
  slug: '',
  author: 'Richard Bowen',
  date: new Date().toISOString().substr(0, 10),
  content: '',
});

onMounted(() => {
  if (isEditing) {
    const existingPost = store.getPostById(parseInt(postId));
    if (existingPost) {
      Object.assign(post, existingPost);
    }
  }
});

const savePost = () => {
  if (isEditing) {
    store.updatePost(parseInt(postId), post);
  } else {
    store.addPost(post);
  }
  router.push('/cp/posts');
};
</script>
