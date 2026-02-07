import { createContext, useReducer } from "react";
import commentReducer, { initialState } from "./commentReducer";

export const CommentContext = createContext();

export default function CommentProvider({ children }){
  const [state, dispatch] = useReducer(commentReducer, initialState);
}