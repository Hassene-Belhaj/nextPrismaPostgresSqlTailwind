import React from 'react'

const page = () => {
  return (
    <main className='max-w-[800px] m-auto pt-12 px-2'>
          <form action="" className='w-full flex flex-col gap-8'>
            <div className='w-full h-12'>
                <input className='outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out w-full h-full pl-4 rounded-xl' placeholder='Title' type="text" />
            </div>
            <div className='w-full h-64'>
                <textarea className='outline-none border-2 border-slate-200 focus:border-slate-600 transition duration-300 ease-in-out  w-full h-full resize-none rounded-xl p-4' placeholder='Description' name="" id=""/>
            </div>
            <div className='w-full h-12 mt-8'>
                <button className='w-full h-full bg-slate-800 text-white rounded-full'>Sumbit</button>
            </div>
          </form>
    </main>
  )
}

export default page