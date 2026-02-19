import { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PostContext } from "../posts/PostProvider";
import PostNav from "./PostNav";
import PostTable from "./PostTable";
import { Link } from "react-router-dom";


export default function ManagePosts() {
  const { state, dispatch } = useContext(PostContext);
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const postsPerPage = 5;
  const buttons = [
    { name: "All", count: state.posts },
    { name: "Published", count: state.published },
    { name: "Draft", count: state.drafts },
  ];

  const handleClick = (type) => {
    setActive(type)
    switch(type){
      case "All":
        dispatch({ type: "ALL_POSTS" })
        break;
      case "Published":
        dispatch({ type: "PUBLISHED_POSTS" })
        break;
      case "Draft":
        dispatch({ type: "DRAFTS_POSTS" })
        break;
      default:
        break;
    } 
  };

  const posts = state.filters.filter(item => item.title?.toLowerCase().includes(search.toLowerCase()));
  const totalPosts = posts.length;
  const indexOfLastPost = Math.min(currentPage * postsPerPage, totalPosts);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  return (
    <div className="manage-posts">
      <div className="heading">
        <div>
          <h2>Posts</h2>
          <p>Manage your blog articles and publications.</p>
        </div>
        <Link 
          className="create-post"
          to="create-post">
          <FaPlus />
          New Post
        </Link>
      </div>
 
      <PostNav buttons={buttons} active={active} search={search} navTab={handleClick} setSearch={setSearch}/>

      <PostTable 
          state={state}
          totalPosts={totalPosts}
          currentPosts={currentPosts} 
          firstIndex={indexOfFirstPost} 
          lastIndex={indexOfLastPost} 
          currentPage={currentPage} 
          handleCurrentPage={setCurrentPage} 
          totalPages={totalPages}/>
    </div>
  );
}
