'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import { useQuery } from '@tanstack/react-query';
import Posts from './components/Posts';
import { IPost } from '@/types/post';

// Fetch all posts
const getAllPosts = async () => {
  const response = await axios.get('/api/posts/getPosts');
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: getAllPosts,
    queryKey: ['posts'],
  });
  if (error) return 'error';
  return (
    <main>
      <AddPost />
      {isLoading
        ? 'Loading...'
        : data?.map((el: IPost) => (
            <Posts
              key={el.id}
              name={el.user.name}
              avatar={el.user.image}
              title={el.title}
              id={el.id}
              commentsQty={el.comments.length}
            />
          ))}
    </main>
  );
}
