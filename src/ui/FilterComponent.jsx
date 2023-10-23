import { useSearchParams } from "react-router-dom"


export default function FilterComponent({param,options}) {
    const [searchParam, setSearchParam] = useSearchParams()
    const handleFilter = (value) => {
        searchParam.set(param, value)
        setSearchParam(searchParam)
    }
  return (
    <div className='flex p-2 shadow-sm rounded-sm'>
       {
            options.map((option) => (
                <button onClick={()=>handleFilter(option.value)} className='btn hover:bg-indigo-800 mx-1 hover:text-white' key={option.value} >{option.label}</button>
            ))
       }
        
    </div>
  )
}
