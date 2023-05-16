
import { useEffect, useState } from "react"
import Header from "./components/Header"
import ModalLink from "./components/ModalLink"
import useEdit from "./hooks/useEdit"
import Links from "./components/Links"
import { generateId } from "./helpers/generateId"
import Filters from "./components/Filters"
import SelectFilter from "./components/SelectFilter"

function App() {
 const { editUser, enable} = useEdit()

 const [links, setLinks] = useState(localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [])
 const [editarLinks, setEditarLinks] = useState({})
 const [filter, setFilter] = useState("")
 const [selected, setSelected] = useState("")
 const [filterLinks, setFilterLinks] = useState(links)

 useEffect(() =>{
  if(Object.keys(editarLinks).length > 0){
    editUser()
  }
 },[editarLinks])

 const saveLinks = link => {
    if(link.id){
      const linkEditado = links.map(linkState => linkState.id === link.id ? link : linkState)
      setLinks(linkEditado)
      setFilterLinks(linkEditado.filter(nLink => nLink.vacancy === filter || filter === ""))
      setEditarLinks({})
      editUser()
      return
    }

    link.id = generateId()
    setLinks([...links, link])
    setFilterLinks([...links, link].filter(nLink => nLink.vacancy === filter || filter === ""))
 }

 const deleteLink = id => {
    const borrar = links.filter(linkState => linkState.id !== id)
    setLinks(borrar)
    setFilterLinks(borrar.filter(nLink => nLink.vacancy === filter || filter === ""))
 }

 useEffect(() => {
  localStorage.setItem('links', JSON.stringify(links) ?? [])
 },[links])

 useEffect(() => {
  setFilterLinks(
    links.filter((link) =>
      ((filter === "postulated" && link.postulated) ||
        (filter === "nopostulated" && !link.postulated) ||
        (filter === "" || link.vacancy === filter)) &&
      ((selected === "" || link.statePostulated === selected))
    )
  );
}, [filter, selected, links]);

  return (
      <main className="w-11/12 mx-auto md:w-2/3 xl:w-3/5 2xl:w-5/12">
        <Header />
        <Filters setFilter={setFilter}/>

        <section className="mt-10">
          <div className="flex items-center gap-2">
              <img className="bg-lime-300 p-2 rounded-full items-center h-10 w-10" src="/src/pictures/link.png" alt="link" />
              <span className="text-xl font-bold">Links</span>
          </div>
          <div className="flex justify-between items-center mt-3 mb-8">
            <button onClick={() =>{
                editUser()
                setEditarLinks({})
              }} className="bg-lime-500 flex items-center gap-2 py-3 px-5 rounded-md text-white font-medium text-lg hover:bg-lime-600 transition duration-300 ease-in-out">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z" fill="#fff"/>
              </svg>
              New Link
            </button>
            <SelectFilter setFilter={setFilter} selected={selected} setSelected={setSelected}/>
          </div>
        </section>

        {links.length ? <Links links={links} setEditarLinks={setEditarLinks} deleteLink={deleteLink} filter={filter} filterLinks={filterLinks} selected={selected}/> : <p className="text-center text-2xl text-slate-600">No job links</p>}
        
        {
          enable && <ModalLink editUser={editUser} saveLinks={saveLinks} editarLinks={editarLinks} setEditarLinks={setEditarLinks} deleteLink={deleteLink}/>
        }
    </main>
  )
}

export default App

