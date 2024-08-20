"use client"
import { AiOutlineSearch } from "react-icons/ai"

const SearchaBar = () => {
  return (
    <section className="w-full pt-12 pb-8">
            <form className="">
               <div className="xs:w-[250px] sm:w-[350px] md:w-[450px] lg:[800px] h-12 rounded-full mx-auto relative">
                  <input type="text" className="bg-slate-100 outline-none border-2 border-slate-200 w-full h-full rounded-full pl-4 pr-8 placeholder:text-black/80 focus:border-2 focus:border-black transition focus:duration-300 focus:ease-in-out "  placeholder="Search for article" />
                  <button className="w-8 h-full absolute top-1/2  -translate-y-1/2 right-1 flex justify-center items-center"> 
                    <AiOutlineSearch  size={25}/>
                  </button>
                </div>            
            </form>
    </section> 
)
}

export default SearchaBar