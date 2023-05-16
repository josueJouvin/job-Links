import { useState } from "react"


export const useInputValidation = () => {
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [errorUrl, setErrorUrl] = useState(false)

    const handleText = (e) => {
       return setText(e.target.value)
    }

    const handleUrl = (e) => {
        const inputUrl = e.target.value
        const urlRegex = /^https?:\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?:(?::[\d]{1,5})?\/.*)?$/;
        
        if (!urlRegex.test(inputUrl)){
            setErrorUrl(true)
            setUrl("")
            return
        }
        
        setErrorUrl(false)
        return setUrl(inputUrl)
    }

    const resetUrl = () => setUrl("")
    const resetText = () => setText("")
    
    return{
        text,
        url,
        errorUrl,
        handleText,
        handleUrl,
        resetUrl,
        resetText,
        setText,
        setUrl
    }
}
