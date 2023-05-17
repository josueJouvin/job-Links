import useEdit from "../hooks/useEdit"
import TrashBtn from "./TrashBtn"
import { useState, useEffect } from "react"

const Links = ({links, setEditarLinks, deleteLink, filter, filterLinks, selected}) => {
  const renderLinks = filterLinks.length ? filterLinks : links
  const {EditBoton} = useEdit()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Actualizar el ancho de la ventana cuando cambie
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="flex flex-col gap-4 mb-10">
      {
        filter ||selected ? (
          <>
          {filterLinks.length ? null : <p className="text-center text-2xl text-slate-600">There are no job applications for this filter</p>}
          {filterLinks.map(link => (
            <a key={link.id} className={`bg-slate-100 p-3 rounded-lg flex justify-between items-center transition duration-300 ease-in-out transform gap-3 active:border-lime-500 active:border-2 md:hover:scale-105 md:hover:border-2 md:hover:border-lime-500 ${link.postulated && 'border-2 border-lime-500'}`} href={link.url} target='_blank' rel="noreferrer">
              <img className="w-10 md:w-12" src={`https://logo.clearbit.com/${link.short}`} alt="App logo" onError={(e) => { e.target.onerror = null; e.target.src = './pictures/jobLinkLogo.png' }}/>
            <div className="text-center">
              <span className="text-lg font-extrabold">{link.text}</span>
              <p className="font-semibold text-center">{windowWidth > 768 ? `${link.description.slice(0,45)}...` : `${link.description.slice(0,15)}...`}</p>
            </div>
            <div className="flex flex-col gap-3">
            <EditBoton onClick={()=>{
              setEditarLinks(link)
            }
            }/>
            <TrashBtn onClick={() =>{
              deleteLink(link.id)
            }}/>
            </div>
          </a>
          ))}
          </>
        ) : (
          renderLinks.map(link => (
            <a key={link.id} className={`bg-slate-100 p-3 rounded-lg flex justify-between items-center transition duration-300 ease-in-out transform gap-3 active:border-lime-500 active:border-2 md:hover:scale-105 md:hover:border-2 md:hover:border-lime-500 ${link.postulated && 'border-2 border-lime-600'}`} href={link.url} target='_blank' rel="noreferrer">
              <img className="w-10 md:w-12" src={`https://logo.clearbit.com/${link.short}`} alt="App logo" onError={(e) => { e.target.onerror = null; e.target.src = './pictures/jobLinkLogo.png' }}/>
            <div className="text-center">
              <span className="text-lg font-extrabold">{link.text}</span>
              <p className="font-semibold text-center">
                {windowWidth > 768 ? `${link.description.slice(0,45)}...` : `${link.description.slice(0,15)}...`}
              </p>
            </div>
            <div className="flex flex-col gap-3">
            <EditBoton onClick={()=>{
              setEditarLinks(link)
            }
            }/>
            <TrashBtn onClick={() =>{
              deleteLink(link.id)
            }}/>
            </div>
          </a>
          ))             
        )
      }
    </section>
  )
}

export default Links