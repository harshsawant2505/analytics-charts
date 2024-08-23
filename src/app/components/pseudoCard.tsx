import React from 'react'

function PseudoCard() {
  return (
//     <div>
//     <div className="min-w-[295px] h-[205px]  py-5 px-4  rounded-md bg-gray-300">
//         <div className='h-full  flex flex-col justify-between'>
//         <div className="font-bold text-gray-500">
//         <h2 className='w-20 h-5 bg-gray-400'></h2>
//         </div>
//         <div className="text-black text-4xl font-semibold flex flex-col gap-2">
//           <div className='flex gap-3 w-[40%] h-5 bg-gray-400 text-gray-400'>
           
//           </div>
        
//         <p className='text-gray-500 w-10 bg-gray-400 border h-3 text-sm '></p>
//         </div>
//         </div>
//     </div>
// </div>
<div className="bg-white min-w-[295px] h-[205px]  py-5 px-4  rounded-md shadow-md p-4 animate-pulse">

  <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
  
  <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
  <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
  <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
</div>
  )
}

export default PseudoCard