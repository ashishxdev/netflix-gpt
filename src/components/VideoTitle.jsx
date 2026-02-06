import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='pt-[10%] md:pt-[0] text-2xl md:text-4xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
      <div className='my-3'>
        <button className='bg-white text-black text-xl py-1 md:py-3 px-6 md:px-12 rounded-lg hover:bg-opacity-80'>▶️ Play</button>
        <button className='mx-2 bg-gray-500 text-white text-xl py-1 md:py-3 px-6 md:px-12 bg-opacity-50 rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
