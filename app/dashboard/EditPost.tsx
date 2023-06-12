'use client';

import { IComment } from '@/types/post';
import React from 'react';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

interface IProps {
  avatar: string;
  title: string;
  name: string;
  id: string;
  comments?: IComment[];
}

const EditPost: React.FC<IProps> = ({ avatar, title, name, id, comments }) => {
  const [actualTitle, setActualTitle] = React.useState('');
  return (
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
          <DeleteIcon className=' cursor-pointer text-gray-300 hover:text-red-500' />
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
  );
};

export default EditPost;
