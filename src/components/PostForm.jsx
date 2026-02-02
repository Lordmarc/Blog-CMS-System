import { useReducer } from "react";
import { LuImagePlus } from "react-icons/lu";
import createReducer, { initialState } from "../posts/createReducer";
import api from "../api/axios";

export default function PostForm() {
  const [state, dispatch] = useReducer(createReducer, initialState);

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

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("content", state.content);

    if (state.image) {
      formData.append("image", state.image);
    }

    state.tags
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)
      .forEach(tag => formData.append("tags[]", tag));

  try {
      await api.post("/v1/posts", formData);
      dispatch({ type: "RESET" });
    } catch (error) {
      if (error.response) {
        console.log("Validation errors:", error.response.data);
      }
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
