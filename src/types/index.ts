export interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  content: string;
};

export interface PostList {
  posts: Post[];
};
