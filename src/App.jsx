
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
    <div className="flex flex-col min-h-screen">
      <main className="w-11/12 mx-auto md:w-2/3 xl:w-3/5 2xl:w-5/12 flex-1">
        <Header />
        <Filters setFilter={setFilter}/>

        <section className="mt-10">
          <div className="flex items-center gap-2">
              <img className="bg-lime-300 p-2 rounded-full items-center h-10 w-10" src="./src/pictures/link.png" alt="link" />
              <span className="text-xl font-bold">Links</span>
          </div>
          <div className="flex flex-row justify-between items-center mt-3 mb-8">
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

        {links.length ? <Links links={links} setEditarLinks={setEditarLinks} deleteLink={deleteLink} filter={filter} filterLinks={filterLinks} selected={selected}/> : <p className="text-center text-xl md:text-2xl text-slate-600 mb-3">Add links to jobs you have applied for or are interested in.</p>}
        
        {
          enable && <ModalLink editUser={editUser} saveLinks={saveLinks} editarLinks={editarLinks} setEditarLinks={setEditarLinks} deleteLink={deleteLink}/>
        }
      </main>
      <footer className="text-base font-medium text-slate-600 flex flex-col md:flex-row gap-2 justify-between items-center border-t-2 py-5 w-11/12 mx-auto md:w-2/3 xl:w-3/5 2xl:w-5/12"> 
          <p className="">Made with ♥ in Ecuador</p>
          <div className="flex gap-3 items-center justify-center">
            <a href="https://github.com/josueJouvin" className="flex hover:text-lime-600 items-center" target='_blank' rel="noreferrer"> 
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" strokeWidth="0" fill="currentColor"></path>
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/josuejouvin/" className="flex hover:text-lime-600 items-center" target='_blank' rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-linkedin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M8 11l0 5"></path>
              <path d="M8 8l0 .01"></path>
              <path d="M12 16l0 -5"></path>
              <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
              </svg>
              <span>Linkedin</span>
            </a>
          </div>
      </footer>
    </div>
  )
}

export default App

