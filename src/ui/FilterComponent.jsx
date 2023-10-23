import { useSearchParams } from "react-router-dom"


export default function FilterComponent() {
    const [searchParam, setSearchParam] = useSearchParams()
    const handleFilter = (value) => {
        searchParam.set('discount', value)
        setSearchParam(searchParam)
    }
  return (
    <div className='flex p-2 shadow-sm rounded-sm'>
        <button onClick={()=>handleFilter('all')} className='btn hover:bg-indigo-800 mx-1 hover:text-white'>All</button>
        <button onClick={()=>handleFilter('with-discount')} className='btn hover:bg-indigo-800 mx-1 hover:text-white'>With Discount</button>
        <button onClick={()=>handleFilter('no-discount')} className='btn hover:bg-indigo-800 mx-1 hover:text-white'>No discount</button>
    </div>
  )
}
