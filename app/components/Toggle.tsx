'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

interface IProps {
  setToggleStatus: (x: boolean) => void;
  deletePost: () => void;
}

const Toggle: React.FC<IProps> = ({ setToggleStatus, deletePost }) => {
  const cancelHandle = () => {
    setToggleStatus(false);
  };
  return (
    <div
      className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/50 z-20'
      onClick={cancelHandle}
    >
      <div
        className=' absolute bg-white p-12 rounded-lg flex flex-col gap-6'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl'>
          Are you sure you want to delete this post? 😢
        </h2>
        <h3 className='text-sm text-red-600'>
          Pressing the red button will permanently delete your post
        </h3>
        <button
          onClick={deletePost}
          className='bg-red-600 text-sm text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-red-700'
        >
          Delete Post
        </button>
        <p
          onClick={cancelHandle}
          className='text-center text-sm text-gray-700 cursor-pointer hover:underline'
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default Toggle;
