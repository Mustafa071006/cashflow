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
      borderRadius: "12px",
      background: "#18181b",
      color: "#fff",
      border: "1px solid #3f3f46",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>
    </>
  );
}

export default App;