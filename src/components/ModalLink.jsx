import TrashBtn from './TrashBtn'
import { useInputValidation } from '../hooks/useInputValidation'
import { useRef, useState, useEffect } from 'react'
import ErrorMs from './ErrorMs'
import ContainerModal from './ContainerModal'
import {InputText, InputUrl} from "./CustomInput"


const ModalLink = ({editUser, saveLinks, editarLinks, setEditarLinks, deleteLink}) => {
  const useUrl = useRef(null)
  
  const {text, url, errorUrl, handleText, handleUrl, resetText, resetUrl, setText, setUrl} = useInputValidation()
  const [description, setDescription] = useState("")
  const [vacancy, setVacancy] = useState("")
  const [message, setMessage] = useState("")
  const [id, setId] = useState("")
  const [postulated, setPostulated] = useState(false)
  const [statePostulated, setStatePostulated] = useState("nopostulated")

  useEffect(() => {
    if (editarLinks && Object.keys(editarLinks).length > 0) {
      setDescription(editarLinks.description)
      setVacancy(editarLinks.vacancy)
      setText(editarLinks.text)
      setUrl(editarLinks.url)
      setId(editarLinks.id)
      setPostulated(editarLinks.postulated)
      setStatePostulated(editarLinks.statePostulated)
    }
  },[editarLinks])

  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = /\d/

    if(vacancy === "" || text === "" || url === ""){
      setMessage("Developer Position, Platform name and url is required")
      return
    }
    
    if(regex.test(text)){
      setMessage("Platform name cannot have numbers")
      return
    } 
  
    if (errorUrl) {
      setMessage("Incorrect or empty url")
      return
    }
    
    const link = {
      vacancy,
      text,
      description,
      url,
      id,
      short: new URL(url).hostname,
      postulated,
      statePostulated
    }
    saveLinks(link)
    useUrl.current.value = ""
    setMessage("")
    setVacancy("")
    setDescription("")
    resetText()
    resetUrl()
    setStatePostulated("nopostulated")
    setPostulated(false)
  }
  
  const closeModal = () => {
    if(editarLinks.id){
      setEditarLinks({})
    }
    editUser()
  }
    return (
      <ContainerModal>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col justify-center gap-5 md:gap-6 w-full">
            <div className="flex items-center gap-7 justify-center w-full ">
              <button type='submit' className="transition duration-300 transform hover:scale-110 ease-in-out font-bold border-solid border-2 border-black p-2 round w-full">{editarLinks.id ? "Edit" : "Save"}</button>
              <button onClick={closeModal} className=" transition duration-300 transform hover:scale-110 ease-in-out font-bold border-solid border-2 border-black p-2 round w-full">Close</button>
            </div>
            <select onChange={(e) => setVacancy(e.target.value)} value={vacancy} className='p-2 outline outline-lime-600 border-0 bg-gray-100 outline-offset-2focus:outline-offset-8 focus:bg-white text-center font-medium w-full' name="type" id="type">
              <option value="">- Developer Position -</option>
              <option value="frontend">Front End</option>
              <option value="backend">Back End</option>
              <option value="fullstack">Full Stack</option>
            </select>          
          </div>

          {
            message && <ErrorMs message={message}/>
          }
                
          <div className="flex flex-col items-center justify-center gap-6 mx-auto my-7 w-full">
            <InputText
              placeholder="Platform Name*" 
              value={text} 
              onChange={handleText}
            />
            <InputText
              placeholder="Job Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputUrl
              placeholder="Vacancy link*"
              defaultValue={url} 
              onBlur={handleUrl}
              useUrl={useUrl}
            />
          </div>

          <div className="flex justify-between">

            <label htmlFor="checkbox" className='postulated-checkbox-label'>
              <input 
                className='postulated-checkbox' 
                type="checkbox" 
                id='checkbox'
                checked={postulated}
                onChange={() => {
                  setPostulated(!postulated)
                  setStatePostulated(postulated ? "nopostulated" : "postulated")
                }}/>
              Postulated
            </label>
            {id && <TrashBtn onClick={() =>{
              deleteLink(id)
              editUser()
            }}/>}
          </div>
        </form>
      </ContainerModal>
    )
  }
export default ModalLink