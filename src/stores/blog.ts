// src/stores/blog.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import Database from 'sql.js';
import type { Post } from '@/types';
import { slugify } from '@/utils';

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<Post[]>([]);
  let db: Database.Database | null = null;
  const dbName = 'blogDatabase'; // Name for localStorage key

  const initDatabase = async () => {
    try {
      const SQL = await Database({ locateFile: (file: string) => `https://sql.js.org/dist/${file}` });

      const storedDb = localStorage.getItem(dbName);
      if (storedDb) {
        const uInt8Array = new Uint8Array(storedDb.split(',').map(Number));
        db = new SQL.Database(uInt8Array);
      } else {
        db = new SQL.Database();
      }

      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slug TEXT,
          title TEXT,
          author TEXT,
          date TEXT,
          content TEXT
        )
      `);
      await loadPostsFromDatabase();

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  const loadPostsFromDatabase = async () => {
    if (!db) return;
    try {
      const result = db.exec('SELECT * FROM posts');
      if (result.length > 0) {
        const columns = result[0].columns;
        const values = result[0].values;
        posts.value = values.map((row) => {
          const post: Post = {
            id: row[columns.indexOf('id')] as number,
            'slug': row[columns.indexOf('slug')] as string,
            title: row[columns.indexOf('title')] as string,
            author: row[columns.indexOf('author')] as string,
            date: row[columns.indexOf('date')] as string,
            content: row[columns.indexOf('content')] as string,
          };
          return post;
        });
      } else {
        posts.value = [];
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const saveDatabaseToLocalStorage = () => {
    if (!db) return;
    const byteArray = db.export();
    localStorage.setItem(dbName, byteArray.toString());
  };

  const addPost = async (post: Omit<Post, 'id'>) => {
    if (!db) return;
    try {
      db.run(
        'INSERT INTO posts (title, slug, author, date, content) VALUES (?, ?, ?, ?, ?)',
        [post.title, slugify(post.title), post.author, post.date, post.content]
      );
      await loadPostsFromDatabase();
      saveDatabaseToLocalStorage();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id: number, updatedPost: Omit<Post, 'id'>) => {
    if (!db) return;
    try {
      db.run(
        'UPDATE posts SET title = ?, slug = ?, author = ?, date = ?, content = ? WHERE id = ?',
        [updatedPost.title, slugify(updatedPost.title), updatedPost.author, updatedPost.date, updatedPost.content, id]
      );
      await loadPostsFromDatabase();
      saveDatabaseToLocalStorage();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id: number) => {
    if (!db) return;
    try {
      db.run('DELETE FROM posts WHERE id = ?', [id]);
      await loadPostsFromDatabase();
      saveDatabaseToLocalStorage();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const getPostById = (id: number): Post | undefined => {
    return posts.value.find((post) => post.id === id);
  };

  initDatabase();

  return { posts, addPost, updatePost, deletePost, getPostById };
});
