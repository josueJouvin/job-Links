
import { useEffect, useState } from "react"

import useEdit from "../hooks/useEdit"
import ModalUser from "./ModalUser"

const Header = () => {
  const {editUser,EditBoton, enable} = useEdit()
  const [useData, setUserData] = useState([])
  
  useEffect(()=>{
    const datos = JSON.parse(localStorage.getItem('userInfo')) ?? [{photo: 'https://unavatar.io/banner.png', text: "Your Name", url: "yourLink.com", id:1}] 
    setUserData(datos)
    
  },[localStorage.getItem('userInfo')])


  return (
    <section className="bg-slate-100 p-3 flex justify-between items-center rounded-lg mt-5 shadow-lg border-2 border-slate-300">
        {
          useData.map((user) => {
            return (
            <div key={user.id} className="flex gap-3">
              <img className="rounded-full w-20 h-20 object-cover shadow-md" src={user.photo} alt="foto usuario" />
              <div className="flex flex-col justify-center gap-1">
                <h1 className="font-extrabold text-xl">{user.text}</h1>
                <a className="hover:cursor-pointer hover:text-lime-500 font-medium hover:font-bold text-lg" target='_blank' rel="noreferrer" href={user.url}>{user.userLink}</a>
              </div>
        </div>   
          )})
        }
    <EditBoton onClick={editUser}/>
    {
      enable && <ModalUser editUser={editUser} setUserData={setUserData} />
    }
  </section >
  )
}

export default Header

