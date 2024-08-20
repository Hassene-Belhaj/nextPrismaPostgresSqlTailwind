"use client" ;

import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";


const ToasterConfig = () => {
    const { toasts } = useToasterStore();
    const TOAST_LIMIT = 1;
    
    useEffect(() => {
      toasts
      .filter((t:any) => t.visible) // Only consider visible toasts
      .filter((_, i:any) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t:any) => toast.remove(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);
    
  return (
    <Toaster
    reverseOrder={false}
    position="top-right"
    containerStyle={{
      top : "100px"
    }}
    toastOptions={{
      duration: 3000,
      style: {
        fontFamily: "Roboto, sans-serif",
        fontWeight: "500",
        background: "#E5E7EB",
        padding: "1rem",
        textTransform: "capitalize",
        display: "flex",
        gap: "1rem",
      },
      success: {
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      },
      error: {
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      },
    }}
  />
  )
}

export default ToasterConfig