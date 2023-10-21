
export default function CabinItem({cabin: {name, maxCapacity, regularPrice, discount, image}}) {
    
  return (
    <div className="gird grid-cols-6 gap-2">
        <img src={image} alt="" className="h-12 w-12 rounded-sm"/>
        <div>{name}</div>
        <div>{maxCapacity}</div>
        <div>{regularPrice}</div>
        <div>{discount}</div>
        <div></div>
    </div>
  )
}
