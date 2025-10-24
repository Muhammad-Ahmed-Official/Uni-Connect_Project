"use client";

import { useEffect } from "react";
import OfflineIndicator from "./OfflineIndicator";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'production') {
  //     if ("serviceWorker" in navigator) {
  //       navigator.serviceWorker
  //         .register("/sw.js", {
  //           scope: "/",
  //           updateViaCache: "none",
  //         })
  //         .then((registration) => {
  //           console.log(
  //             "Service Worker registered (PRODUCTION):",
  //             registration.scope
  //           );
  //         })
  //         .catch((error) => {
  //           console.error("Service Worker registration failed:", error);
  //         });
  //     }
  //   }
  // }, []);
  return (
    <div>
      <OfflineIndicator />
      {children}
    </div>
  );
}