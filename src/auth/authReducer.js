// authReducer.jsx
export const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user, 
        token: action.payload.token, 
        error: null 
      };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "REGISTER_START":
      return { ...state, loading: true };
    case "REGISTER_USER":
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user, 
        token: action.payload.token 
      };
    case "REGISTER_ERROR":
      return { ...state, loading: false, error: action.payload.error };
    case "RESTORE_AUTH":
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload.user, 
        token: action.payload.token 
      };
    case "AUTH_CHECK_DONE":
      return { ...state, loading: false };
    case "LOGOUT":
      return { user: null, token: null, isAuthenticated: false, loading: false, error: null };
    default:
      return state;
  }
}