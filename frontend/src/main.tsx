import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";
import { AuthProvider } from "./context/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
