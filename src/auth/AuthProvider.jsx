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
        console.log("Auth state changed:", event, session);

        try {
          if (session?.user) {
            let role = "user";

            // ✅ Kung bagong user, i-insert sa profiles
            if (event === "SIGNED_IN") {
              const isNewUser = new Date() - new Date(session.user.created_at) < 10000;
              if (isNewUser) {
                const { error: insertError } = await supabase.from("profiles").insert([
                  {
                    id: session.user.id,
                    role: "user",
                    gender: "male",
                  }
                ]);

                if (insertError) {
                  console.error("Failed to insert profile:", insertError);
                } else {
                  console.log("Profile inserted successfully!");
                }
              }
            }

            // ✅ Fetch role para sa lahat ng users
            try {
              const { data: profileData, error: roleError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();

              if (!roleError && profileData?.role) {
                role = profileData.role;
              }
            } catch (err) {
              console.warn("Failed to fetch role:", err.message);
            }

            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                user: { ...session.user, role },
                token: session.access_token,
              },
            });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } finally {
          console.log("Dispatching AUTH_CHECK_DONE");
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