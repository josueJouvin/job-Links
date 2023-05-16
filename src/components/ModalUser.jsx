
import { useEffect, useState } from "react"
import { useInputValidation } from "../hooks/useInputValidation"
import ErrorMs from './ErrorMs'
import ContainerModal from "./ContainerModal"
import {InputText, InputUrl} from "./CustomInput"

const ModalUser = ({editUser}) => {
  
  const {text, url, errorUrl, handleText, handleUrl} = useInputValidation()

  const [photo, setPhoto] = useState("")
  const [edit, setEdit] = useState(false)
  const [message, setMessage] = useState("")


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.length > 0) {
      setEdit(true)
      setPhoto(userInfo[0].photo)
      handleText({target: {value: userInfo[0].text}})
      handleUrl({target: {value: userInfo[0].url}})
    }
  },[])
  
  const handleImageUpload = (e) =>{
    const file = e.target.files[0];

    if(!file){
      return;
    }

    if(!file.type.startsWith('image/')){
      setMessage("El archivo no es el correcto")
      setPhoto("")
      return;
    }

    setMessage("")

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result)
    };
    reader.readAsDataURL(file);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(text === "" && url === "" && photo === ""){
      editUser()
      return
    }
    
    if(text === "" || photo === ""){
      setMessage("Todos los campos son obligatorios")
      return
    }
  
    if (errorUrl || url === "") {
      setMessage("Url incorrecta o vacia")
      return
    }

    const userInfo = {
      photo,
      text,
      url,
      id: 1,
      userLink: new URL(url).hostname
    }

    if(edit){
      localStorage.setItem("userInfo", JSON.stringify([userInfo]))
      setMessage("")
      editUser()
      return
    }
    
    localStorage.setItem('userInfo', JSON.stringify([userInfo]))
    setMessage("")
    editUser()
  }

  return (
    <ContainerModal>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-lime-600">Edit Profile</span>
            <button className="hover:cursor-pointer transition duration-300 transform hover:scale-110 ease-in-out text-lg font-bold border-solid border-2 border-black p-2" type="submit">Save and Close X</button>
            
          </div>
          <div className="flex justify-center items-center gap-5 my-7">
            <img className="w-28 h-28 shadow-md rounded-full object-cover relative" alt="" src={photo}/>
            <label htmlFor="uploadImage" className="cursor-pointer bg-lime-500 px-3 py-2 font-medium text-lg hover:bg-lime-600 transition duration-300 ease-in-out rounded- text-gray-100 hover:scale-110">
            Choose A Photo
            </label>
            <input className="hidden rounded-full" type="file" accept="image/*" id="uploadImage" name="uploadImage" onChange={handleImageUpload}/>
          </div>
          {
            message && <ErrorMs message={message}/>  
          }
        <div className="flex flex-col items-center justify-center gap-5 sm:w-4/6 mx-auto">
          
          <InputText
            placeholder="User Name*" 
            value={text} 
            onChange={handleText}
          />

          <InputUrl
            placeholder="Link your portfolio, linkedind*"
            defaultValue={url} 
            onBlur={handleUrl}
          />
        </div>
      </form>
    </ContainerModal>
  )
}

export default ModalUser
