"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initTracker, recordPage } from "@/lib/tracker";

export default function TrackingProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initTracker();
  }, []);

  useEffect(() => {
    if (pathname) {
      recordPage(pathname);
    }
  }, [pathname]);

  return null;
}