import Link from 'next/link';
import React from 'react';
import Login from './Login';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Logged from './Logged';

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className='flex justify-between items-center py-8'>
      <Link href='/'>
        <h1 className=' font-bold text-lg'>Send it.</h1>
      </Link>
      <ul className='flex items-center gap-6'>
        {session?.user && <Logged image={session?.user?.image || ''} />}
        {!session?.user && <Login />}
      </ul>
    </nav>
  );
};

export default Nav;
