export const initialState = {
  title: "",
  content: "",
  image: null,
  preview:  null,
  tags: "",
}

export default function createReducer(state, action){
  switch(action.type){
    case "SET_FIELD":
      return {...state, [action.field]: action.value };

    case "SET_IMAGE":
      return {...state, image: action.file, preview: action.preview}
    
    case "RESET":
      return initialState;

    default:
      return state;
  }
}