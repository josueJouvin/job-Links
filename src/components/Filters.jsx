
import { useState } from "react"

const Filters = ({setFilter}) => {

  const [selectedButton, setSelectedButton] = useState(null)

  const selectedFilter = filter => {
    if (selectedButton === filter) {
      setSelectedButton(null);
      setFilter("");
      return
    } 
      setSelectedButton(filter);
      setFilter(filter);
  } 
  
    return (
      <section className="mt-8" >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-8 z-10">
            
            <button onClick={() => selectedFilter("frontend")} className={`bg-${selectedButton === 'frontend' ? 'lime-500' : 'slate-100'} shadow-lg rounded-lg flex items-center justify-center gap-2 py-3 w-full md:hover:bg-lime-500 transition duration-300 ease-in-out transform active:scale-110 md:hover:scale-105 font-semibold text-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="26" height="26" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 4h6v8h-6z" />
              <path d="M4 16h6v4h-6z" />
              <path d="M14 12h6v8h-6z" />
              <path d="M14 4h6v4h-6z" />
            </svg>
                Front end
            </button>
            <button onClick={() => selectedFilter('backend')} className={`bg-${selectedButton === 'backend' ? 'lime-500' : 'slate-100'} shadow-lg rounded-lg flex items-center justify-center gap-2 py-3 w-full md:hover:bg-lime-500 transition duration-300 ease-in-out transform active:scale-110 md:hover:scale-105 font-semibold text-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="26" height="26" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
                Back end
            </button>
          </div>
          <button onClick={() =>selectedFilter('fullstack')} className={`bg-${selectedButton === 'fullstack' ? 'lime-500' : 'slate-100'} shadow-lg rounded-lg flex items-center justify-center gap-2 py-3 w-full sm:w-2/4 mx-auto mt-4 sm:mt-3 md:hover:bg-lime-500 transition duration-300 ease-in-out transform active:scale-110 md:hover:scale-105 font-semibold text-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stack-2" width="26" height="26" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 4l-8 4l8 4l8 -4l-8 -4"></path>
              <path d="M4 12l8 4l8 -4"></path>
              <path d="M4 16l8 4l8 -4"></path>
            </svg>
              FullStack
          </button>
        </section>
    )
  
}

export default Filters

