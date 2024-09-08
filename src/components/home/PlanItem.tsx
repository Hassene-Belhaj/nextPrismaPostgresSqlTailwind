import React from 'react'
import { TiTick } from 'react-icons/ti'

const PlanItem = () => {
  return (
    <div className="xs:w-[270px] sm:w-[350px] h-full bg-slate-200 rounded-3xl items-center flex flex-col m-auto gap-4 pt-4 shadow-lg hover:scale-105 transition cursor-pointer">
    <h2 className="py-4 text-4xl font-semibold text-indigo-800">Premium</h2>
    <h3 className="text-3xl font-semibold">$4.99/mo </h3>
    <span className="font-semibold bg-gray-500 text-white px-4 py-2 rounded-full">10% OFF</span>
    <h4 className="text-3xl font-semibold">Top Features</h4>
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 ">
        <TiTick />
        <p className="font-semibold">100 Websites</p>
      </div>
      <div className="flex items-center gap-1">
        <TiTick size={20} />
        <p className="font-semibold">100 GB SSD STORAGE</p>
      </div>
      <div className="flex items-center gap-1">
        <TiTick size={20} />
        <p className="font-semibold">Weekly Backups</p>
      </div>
      <div className="flex items-center gap-1">
        <TiTick size={20} />
        <p className="font-semibold">Unlimited Bandwidth</p>
      </div>
      <div className="flex items-center gap-1">
        <TiTick size={20} />
        <p className="font-semibold">Free SSL</p>
      </div>
      <div className="flex items-center gap-1">
        <TiTick size={20} />
        <p className="font-semibold">Free Email</p>
      </div>
    </div>
    <div className="w-full px-8 py-8">
       <button className=" w-full h-12 bg-slate-800 text-white rounded-full hover:opacity-90 duration-300 ease-in-out">BUY NOW</button>
    </div>
  </div>
  )
}

export default PlanItem