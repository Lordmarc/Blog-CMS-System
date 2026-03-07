import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
 

export default function PostCard({ state }){



  const formattedDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: 'numeric'
    });
  };

  console.log("User state:", state)
  return ( 
    <div className="post-card">
      <div className="h-44 w-full">
          <img src={state.image} alt="" className="h-full w-full object-cover"/>
      </div> 
      <div className="post-card-description">
        <p className="title">{state.title}</p>
        <p className="content">{state.content}</p>
       
       <div className="profile-info">
        <div className="flex justify-center items-center gap-2">
          <div className="rounded-full h-8 w-8">
            <img src={state.user.avatar}/>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold ">{state.user?.name}</p>
            <p className="text-gray-600 text-sm">{formattedDate(state.created_at)}</p>
          </div>
          
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