import React from 'react';
import Link  from 'next/link';

export default function Home() {
  return (
    <div className='w-full h-screen  bg-white  flex justify-center items-center'>
     
        <Link href={'/analytics'} className='bg-blue-500 px-5 py-4 rounded-sm text-white mt-7'>Go to Analytics Page</Link>
      
    </div>
  );
}
