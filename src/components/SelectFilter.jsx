const SelectFilter = ({selected, setSelected}) => {
  
    const selectedFilter = filter => {
        setSelected(filter);
    } 
    
    return (
      <select value={selected} onChange={(e) => selectedFilter(e.target.value)} name="" id="" className="border-2 border-slate-300 rounded-md py-2 px-3 text-center font-semibold">
          <option value="">- All Aplications -</option>
          <option value="postulated">Postulated</option>
          <option value="nopostulated">Not Postulated</option>
      </select>
    )
  }
  
  export default SelectFilter