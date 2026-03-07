import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function CardLandscape({ state }) {

  return (
    <div className="flex  gap-4 bg-white p-4 rounded-md w-full shadow">
      <div className="h-40 w-40 rounded-md overflow-hidden">
        <img src={state.image} className="h-full w-full object-cover object-center" alt="" />
      </div>
      <div className="flex flex-1 flex-col ">
        <p className=" text-lg md:text-xl font-semibold">{state.title}</p>
        <p className="text-sm md:text-base text-gray-600">{state.content}</p>
        <div className="flex items-center justify-between  mt-auto ">
          <div className="flex items-center gap-2">
              <div className="rounded-full h-8 w-8">
            <img src={state.user.avatar}/>
          </div>
            
            <p className="text-sm">{state.user.name}</p>
          </div>
               <Link 
                   to={`/blog/${state.slug}`}
                   className="flex justify-center items-center gap-1 text-[#001BB7]">
                   Read More
                   <FaArrowRight/> 
                 </Link>
      </div>
      </div>
    </div>
  );
}
