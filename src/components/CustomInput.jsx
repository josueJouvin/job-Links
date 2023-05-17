

export const InputText = ({placeholder,value,onChange}) => {
  return (
    <label className="w-full" htmlFor="name">
    <input 
        className="w-full rounded-xl outline outline-lime-600 border-0 bg-gray-100 outline-offset-2 py-1 px-4 focus:outline-offset-8 focus:bg-white" 
        placeholder={placeholder} 
        type="name" 
        name="name"
        value={value} 
        onChange={onChange} 
        />
  </label>
  )
}

export const InputUrl = ({placeholder,defaultValue,onBlur,useUrl}) => {
    return(
      <label className="w-full" htmlFor="url" >
        <input 
            className="w-full rounded-xl outline outline-lime-600 border-0 bg-gray-100 outline-offset-2 py-1 px-4 focus:outline-offset-8 focus:bg-white" 
            placeholder={placeholder} 
            name="url" 
            type="url" 
            defaultValue={defaultValue} 
            onBlur={onBlur} 
            ref={useUrl}
            />
      </label>
    )
}