"use client";

import { useEffect, useState } from "react";

export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
        };

        const handleOffline = () => {
            setIsOffline(true);
        };

        // Check initial state
        setIsOffline(!navigator.onLine);

        // Add event listeners
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white text-center p-2 z-50 font-medium;">
            📡 You are currently offline. Some features may be limited.
        </div>
    );
}