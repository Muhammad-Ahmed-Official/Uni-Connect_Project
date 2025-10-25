"use client";

import { useEffect } from "react";
import OfflineIndicator from "./OfflineIndicator";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations()
          .then(registrations => {
            for (let registration of registrations) {
              registration.unregister();
              console.log("Unregistered old Service Worker");
            }
          })
          .then(() => {
            return navigator.serviceWorker
              .register("/sw.js", {
                scope: "/",
                updateViaCache: "none",
              })
              .then((registration) => {
                console.log("New Service Worker registered:", registration.scope);
              });
          })
          .catch((error) => {
            console.error("Service Worker setup failed:", error);
          });
      }
    }
  }, []);

  return (
    <div>
      <OfflineIndicator />
      {children}
    </div>
  );
}