import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function CardLandscape({ state }) {
  const male = "/assets/male.png";
  const female = "/assets/female.jpg";

  return (
    <div className="flex gap-4 bg-white p-4 rounded-md w-full shadow">
      <div className="h-40 w-40 rounded-md overflow-hidden">
        <img src={`${import.meta.env.VITE_BASE_URL}/storage/${state.image}`} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-xl font-semibold">{state.title}</p>
        <p className="text-gray-600">{state.content}</p>
        <div className="flex items-center justify-between  mt-auto ">
          <div className="flex items-center gap-2">
            <img src={state.user.gender === "male" ? male : female} alt="" className="h-5 w-5"/>
            <p className="text-sm">John Doe</p>
          </div>
               <Link 

                   className="flex justify-center items-center gap-1 text-[#001BB7]">
                   Read More
                   <FaArrowRight/>
                 </Link>
        </div>
      </div>
    </div>
  );
}
