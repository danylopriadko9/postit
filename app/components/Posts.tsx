'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProps {
  avatar: string;
  title: string;
  name: string;
  id: string;
  commentsQty: number;
}

const Posts: React.FC<IProps> = ({ avatar, title, name, id, commentsQty }) => {
  return (
    <div className='bg-white my-8 p-8 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Image
          className='rounded-full'
          height={32}
          width={32}
          src={avatar}
          alt='avatar'
        />
        <h3 className='font-boldtext-ray-700'>{name}</h3>
      </div>
      <div className='my-8'>
        <p className='break-all'>{title}</p>
      </div>
      <div className=' flex gap-4 cursor-pointer items-center'>
        <Link href={`/post/${id}`}>
          <p className='font-bold text-sm text-gray-700 '>
            Comments {commentsQty}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Posts;
