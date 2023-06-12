'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/authPosts';
import axios from 'axios';
import Posts from '../components/Posts';
import EditPost from './EditPost';

// Fetch my posts
const getMyPosts = async () => {
  const response = await axios.get('/api/posts/AuthPosts');
  return response.data;
};

const MyPosts = () => {
  const { data, error, isLoading } = useQuery<IUser>({
    queryFn: getMyPosts,
    queryKey: ['authPosts'],
  });

  if (error) return <>error</>;
  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <>Loading....</>
      ) : (
        data?.posts.map((el) => (
          <EditPost
            key={el.id}
            avatar={data.image}
            title={el.title}
            name={data.name}
            id={el.id}
            comments={el.comments}
          />
        ))
      )}
    </div>
  );
};

export default MyPosts;
