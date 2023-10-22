import BackButton from "../../ui/BackButton";

export default function CabinDetails() {
  return (
    <div>
        <div className="flex justify-between items-start my-3 mx-3">
          <BackButton />
          <h1 className="text-xl font-bold">Cabin Details</h1>  
        </div>
        <div className="flex">
            <div className="w-1/3">
                <img src="https://cdn.pixabay.com/photo/2015/09/05/20/07/cabin-924958_1280.jpg" alt="" className="w-full h-80 rounded-md"/>
            </div>
            <div className="px-3 w-2/3 ml-3">
                <h1 className="text-xl font-bold">Cabin Title</h1>
                <p className="max-w-md">t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.</p>
                <div className="flex max-w-md justify-between items-start mt-3">
                    <div className="">
                        <h1 className="font-bold">Regular Price</h1>
                        <p>1000</p>
                    </div>
                    <div className="">
                    <h1 className="font-bold">Max Capacity</h1>
                        <p>1000</p>
                    </div>
                    <div className="">
                    <h1 className="font-bold">Discount</h1>
                        <p>1000</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
