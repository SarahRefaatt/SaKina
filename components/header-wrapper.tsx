"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

export default function HeaderWrapper() {
  const pathname = usePathname();

    const hideHeader = ["/order", "/confirmed_order","/test"].includes(pathname);

  if (hideHeader) return null;

  return <SiteHeader />;
}
