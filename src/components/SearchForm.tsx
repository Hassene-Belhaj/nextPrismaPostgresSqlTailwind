"use client"
import { FormEvent, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import {useRouter} from 'next/navigation'

const SearchaBar = () => {
  const [searchText , setSearchText] = useState("");

  const navigation = useRouter() ;

  const handleSubmitSearch = (e : FormEvent) => {
   e.preventDefault()
   navigation.push(`/articles/search?searchText=${searchText}`)
  }

  return (
    <section className="w-full pt-32 pb-8">
            <form onSubmit={handleSubmitSearch}>
               <div className="xs:w-[250px] sm:w-[350px] md:w-[500px] lg:w-[900px] h-12 rounded-full mx-auto relative">
                  <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="text" className="bg-slate-100 outline-none border-2 border-slate-200 w-full h-full rounded-full pl-4 pr-8 placeholder:text-black/80 focus:border-2 focus:border-slate-500 transition focus:duration-300 focus:ease-in-out "  placeholder="Search for article" />
                  <button className="w-8 h-full absolute top-1/2  -translate-y-1/2 right-4 flex justify-center items-center"> 
                    <AiOutlineSearch  size={25}/>
                  </button>
                </div>            
            </form>
    </section> 
)
}

export default SearchaBar