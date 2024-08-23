'use client'

import React from 'react';
import Link from 'next/link'
import { useEffect } from 'react';

export default function Home() {
  const startDate = (new Date(2024,0));
  const endDate = (new Date());

    useEffect(() => {
      console.log(startDate)
      console.log(endDate)
    }, [])


  return (
    <div className='w-full h-screen  bg-white  flex justify-center items-center'>
     
        <Link href={`/analytics?start=${startDate}&end=${endDate}`} className='bg-blue-500 px-5 py-4 rounded-sm text-white mt-7'>Go to Analytics Page</Link>
       
    </div>
  );
}
