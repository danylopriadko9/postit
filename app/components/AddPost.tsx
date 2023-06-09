'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = React.useState<string>('');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post('/api/posts/AddPost', {
        title,
      }),
    {
      onError: (error) => {
        setIsDisabled(true);
        console.log(error);
      },

      onSuccess: (data) => {
        setTitle('');
        setIsDisabled(false);
        console.log(data);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    mutate(title);
  };

  return (
    <form
      className='bg-white my-8 p-8 rounded-md'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <textarea
          className='bg-gray-200 p-4 text-lg rounded-md my-2 w-full'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id=''
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <p
          className={` font-bold text-sm  ${
            title.length > 300 ? 'text-red-700' : 'text-gray-700'
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className={` text-sm bg-teal-600 cursor-pointer text-white rounded-xl p-2 px-6 outline-none disabled:opacity-25`}
          type='submit'
        >
          Create a post
        </button>
      </div>
    </form>
  );
};

export default AddPost;
