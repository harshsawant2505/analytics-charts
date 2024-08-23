import React from 'react'

function PseudoPieChart() {
  return (
    <div className="relative w-40 h-40 animate-pulse">
      {/* Full circle for the background */}
      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
      
      {/* Ring-like segments */}
      {/* Segment 1 */}
      <div
        className="absolute inset-0 bg-gray-300 rounded-full"
        style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)' }}
      ></div>
      
      {/* Segment 2 */}
      <div
        className="absolute inset-0 bg-gray-400 rounded-full"
        style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}
      ></div>
      
      {/* Segment 3 */}
      <div
        className="absolute inset-0 bg-gray-500 rounded-full"
        style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 50%)' }}
      ></div>
      
      {/* Segment 4 */}
      <div
        className="absolute inset-0 bg-gray-300 rounded-full"
        style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}
      ></div>
      
      {/* Hollow center */}
      <div className="absolute inset-4 bg-white rounded-full"></div>
    </div>
  )
}

export default PseudoPieChart