import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "@/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "9999px",
            background: "#1d1d1f",
            color: "#f5f5f7",
            border: "1px solid #333336",
            fontSize: "14px",
            letterSpacing: "-0.224px",
            padding: "10px 16px",
          },
          success: {
            iconTheme: {
              primary: "#30d158",
              secondary: "#000000",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff453a",
              secondary: "#000000",
            },
          },
        }}
      />
    </>
  );
}

export default App;
