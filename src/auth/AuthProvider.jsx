// AuthProvider.jsx
import { createContext, useEffect, useReducer } from "react";
import authReducer, { initialState } from "./authReducer";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let listener;

    const init = async () => {
      await supabase.auth.initialize();

      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {


        try {
          if (session?.user) {
            // Fetch role from profiles
            const { data: profileData } = await supabase
              .from("profiles")
              .select("role, name")
              .eq("id", session.user.id)
              .single();

            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                user: { 
                  ...session.user, 
                  role: profileData?.role ?? "user",
                  name: profileData?.name ?? "",
                },
                token: session.access_token,
              },
            });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } finally {
          dispatch({ type: "AUTH_CHECK_DONE" });
        }
      }); 

      listener = data;
    };

    init();

    return () => listener?.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}