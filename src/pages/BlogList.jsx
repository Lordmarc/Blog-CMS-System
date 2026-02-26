import { useContext, useEffect, useRef, useState } from "react";
import CardLandscape from "../components/CardLandscape";
import { PostContext } from "../posts/PostProvider";
import Pagination from "../components/pagination";
import { RxMagnifyingGlass } from "react-icons/rx";
import api from "../api/axios";
import PostCard from "../components/PostCard";

export default function BlogList(){
  const { state } = useContext(PostContext)
  const [ currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const searchRef = useRef(null);
  const postsPerPage = 5;

  const posts = state.filters.filter(item => item.title?.toLowerCase().includes(search.toLowerCase()));
  const totalPosts = posts.length;
  
  const indexOfLastPost = Math.min(currentPage * postsPerPage, totalPosts);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  console.log("Laman:", state)

  useEffect(() => {
    function handleClickOutside(event){
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  useEffect(() => {
    const fetchTopTags = async () => {
      try{
        const res = await api.get('/v1/posts/blog');

        setTags(res.data.data);
      }catch(err){
        console.error("Failed to fetch tags", err)
      }
    }

    fetchTopTags();
  },[])

  console.log(tags);
  return(
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col-reverse md:flex-row justify-center gap-8 w-full">
        <div className="flex-1 flex flex-col gap-4 h-full w-full max-w-lg">
          { currentPosts.map(post => (
            <CardLandscape key={post.id} state={post} />
          )) }
          <div className="mt-auto">
            <Pagination  firstIndex={indexOfFirstPost} lastIndex={indexOfLastPost} currentPage={currentPage} handleCurrentPage={setCurrentPage} totalPages={totalPages} totalPosts={totalPosts} />

          </div>
        </div>
        <div className="flex flex-col gap-8 h-full">
          <div className="flex flex-col relative bg-white  max-h-24 p-4 rounded-md" ref={searchRef}>
            <p className="mb-2 font-semibold">SEARCH ARTICLES</p>

            <div className="flex items-center bg-white rounded border px-2">
              <RxMagnifyingGlass />

              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpen(true)}
                className="outline-none px-2 py-1 w-full"
              />
            </div>

            {open && (
                <div className="absolute top-20 left-0 w-full bg-white  mt-1 rounded-lg shadow-lg z-50">
                    {posts.length > 0 ? (
                      posts.slice(0, 5).map((post) => (
                        <p
                          key={post.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSearch(post.title);
                            setOpen(false);
                          }}
                        >
                          {post.title}
                        </p>
                      ))
                    ) : (
                      <p className="p-2 text-gray-400">No results found</p>
                    )}
                  </div>
                )}
              </div>
              <div className="">
                <p className="text-sm font-semibold">POPULAR TAGS</p>
                <div className="grid grid-cols-3 gap-4 p-4">
                  {tags.map(tag => (
                    <div className="bg-slate-100 text-center p-1 text-sm rounded">{tag.name.toUpperCase().charAt(0) + tag.name.slice(1)}</div>
                  ))}
                </div>
             
              </div>
        </div>
     

    </div>
  );
}