
"use client"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import InViewImagesGrid from "@/components/ui/ImageGrid"
import React from "react";


export default function Page() {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className=" ">
              <InViewImagesGrid />
            </div>
          
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
