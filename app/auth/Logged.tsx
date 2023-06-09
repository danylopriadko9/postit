'use client';
import { signOut } from 'next-auth/react';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  image: string;
}

const Logged: React.FC<IProps> = ({ image }) => {
  return (
    <li className='flex gap-8 items-center'>
      <button
        className='text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25 flex gap-2 items-center'
        onClick={() => signOut()}
      >
        <LogoutIcon />
        Sign Out
      </button>
      <Link href='/dashboard'>
        <Image
          className=' rounded-full'
          src={image}
          width={40}
          height={40}
          alt={''}
        />
      </Link>
    </li>
  );
};

export default Logged;
