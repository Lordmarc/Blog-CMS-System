import { useContext, useReducer } from "react";
import { LuImagePlus } from "react-icons/lu";
import createReducer, { initialState } from "../posts/createReducer";
import api from "../api/axios";
import { uploadImage } from "../lib/helpers";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../auth/AuthProvider";

export default function PostForm() {
  const [state, dispatch] = useReducer(createReducer, initialState);
  const { state: authState} = useContext(AuthContext);

  const handleImageChange = (e) => { 
    const file = e.target.files[0];
    if (!file) return;
 
    dispatch({
      type: "SET_IMAGE",
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authState?.isAuthenticated) {
    alert("You must be logged in to post.");
    return;
    }

  try {
      console.log("6. inside try block"); 
      let imageUrl = null;
       console.log("7. checking image..."); 
      if (state.image){
            console.log("8. uploading image...");  // ← add
    imageUrl = await uploadImage(state.image);
    console.log("9. imageUrl result:", imageUrl); 
      }

      const tagsArray = state.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

      const slug = state.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")   // remove special characters
      .replace(/\s+/g, "-")            // spaces to dashes
      .replace(/-+/g, "-");    

      const { data: postData, error } = await supabase.from('posts').insert([
        {
          user_id: authState.user.id,
          title: state.title,
          content: state.content,
          status: "Published",
          slug: slug,
          image: imageUrl,
          tags: tagsArray,
        } 
      ]).select().single();
      console.log("insert result:", postData, error);

      if (error) throw error;

      await supabase.from('activity_logs').insert([
        {
          type: 'Post',
          action: 'Published',
          description: state.title,
          user_id: authState.user.id,
          meta: {
            post_id: postData.id
          }
        }
      ])

      dispatch({ type: "RESET" });
      alert("Post created successfully!");
    } catch (error) {
        console.error("CATCH ERROR:", error);
    }

  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <div className="flex-1">
              <input
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={e =>
            dispatch({
              type: "SET_FIELD",
              field: "title",
              value: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Start writing your story..."
          value={state.content}
          onChange={e =>
            dispatch({
              type: "SET_FIELD",
              field: "content",
              value: e.target.value,
            })
          }
        />
        </div>
            
        <div className="post-setting">
          <p>POST SETTINGS</p>

          <p className="my-2 text-gray-500">Featured Image</p>
            <input
            type="file"
            id="featuredImage"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          <label
            htmlFor="featuredImage"
            className="flex h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed overflow-hidden"
          >
            {state.preview ? (
              <img
                src={state.preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <LuImagePlus />
                <p>Click to upload</p>
              </div>
            )}
          </label>
          
          <label htmlFor="tags">Tags</label>
          <input
            className="tags"
            name="tags"
            type="text"
            placeholder="Add tags (comma separated)"
            value={state.tags}
            onChange={e =>
              dispatch({
                type: "SET_FIELD",
                field: "tags",
                value: e.target.value,
              })
            }
          />

          <button type="submit" className="published-btn">
            Publish
          </button>
        </div>
        
      </form>
    </div>
  );
}
