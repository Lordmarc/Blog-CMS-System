import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LogsProvider from "./activity/LogsProvider.js";
import App from "./App.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import "./index.css";
import PostProvider from "./posts/PostProvider.jsx";
import UserProvider from "./users/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <UserProvider>
        <PostProvider>
          <LogsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LogsProvider>
        </PostProvider>
      </UserProvider>
    </StrictMode>
  </AuthProvider>,
);
