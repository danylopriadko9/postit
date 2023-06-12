'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const AddPost = () => {
  const [title, setTitle] = React.useState<string>('');
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  let toastPostId: string;

  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post('/api/posts/AddPost', {
        title,
      }),
    {
      onError: (error) => {
        setIsDisabled(true);

        if (error instanceof AxiosError) {
          toast.dismiss(toastPostId);
          toast.error(error?.response?.data?.message);
        }

        setIsDisabled(false);
      },

      onSuccess: (data) => {
        toast.dismiss(toastPostId);
        toast.success('Post has been made 🔥');
        setTitle('');
        queryClient.invalidateQueries(['posts']);
        setIsDisabled(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastPostId = toast.loading('Creating your post');

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
          className='bg-gray-200 p-4 text-lg rounded-md my-2 w-full focus:outline-none'
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
