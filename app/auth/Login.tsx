'use client';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <li className=' list-none'>
      <button
        onClick={() => signIn()}
        className='text-sm bg-gray-700 text-white py-2 px-5 rounded-xl disabled:opacity-25 flex gap-2 items-center'
      >
        Sign In
      </button>
    </li>
  );
};

export default Login;
