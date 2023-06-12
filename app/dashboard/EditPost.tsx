'use client';

import { IComment } from '@/types/post';
import React from 'react';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import Toggle from '../components/Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface IProps {
  avatar: string;
  title: string;
  name: string;
  id: string;
  comments?: IComment[];
}

const EditPost: React.FC<IProps> = ({ avatar, title, name, id, comments }) => {
  const [actualTitle, setActualTitle] = React.useState<string>('');
  const [toggleStatus, setToggleStatus] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  let toastPostId: string;

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.post('/api/posts/deletePost', {
        id,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.dismiss(toastPostId);
          toast.error(error?.response?.data?.message);
          console.log(error);
        }
      },

      onSuccess: (data) => {
        toast.dismiss(toastPostId);
        toast.success('Post has been deleted 🔥');
        queryClient.invalidateQueries(['authPosts']);
      },
    }
  );

  const deletePost = () => {
    toastPostId = toast.loading('Creating your post');
    mutate(id);
  };

  return (
    <>
      {toggleStatus && (
        <Toggle setToggleStatus={setToggleStatus} deletePost={deletePost} />
      )}
      <div className='bg-white my-4 p-8 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              width={32}
              height={32}
              src={avatar}
              alt='avatar'
              className=' rounded-full'
            />
            <h3 className=' font-boldtext-gray-700'>{name}</h3>
          </div>
          <div className='flex items-center gap-3'>
            <EditIcon className=' cursor-pointer text-gray-300 hover:text-gray-700' />
            <div onClick={() => setToggleStatus(true)}>
              <DeleteIcon className=' cursor-pointer text-gray-300 hover:text-red-500' />
            </div>
          </div>
        </div>
        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>
        <div className=' flex gap-4 cursor-pointer items-center'>
          <Link href={`/post/${id}`}>
            <p className='font-bold text-sm text-gray-700 '>
              {comments?.length || 0} Comments
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditPost;
