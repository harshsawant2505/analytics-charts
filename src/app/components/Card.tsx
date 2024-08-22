import React from 'react'

function Card (props: any) {
  return (
    <div>
        <div className="min-w-[295px] h-[205px]  py-5 px-4  rounded-md bg-white">
            <div className='h-full  flex flex-col justify-between'>
            <div className="font-bold text-gray-500">
            <h2>{props.title}</h2>
            </div>
            <div className="text-black text-4xl font-semibold flex flex-col gap-2">
              <div className='flex gap-3'>
              {props.main}{ props.percentage != 'none' &&<p className={`text-sm font-bold ${props.percentage>0?'text-green-600':'text-red-600'} flex justify-center items-center`}>{Number((props.percentage*100).toFixed(2))}%</p>}
              </div>
            
            <p className='text-gray-500 text-sm'>{props.tagline}</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Card