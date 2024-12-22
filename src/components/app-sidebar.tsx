"use client";
import {
  AudioWaveform,
  Box,
  ChartLine,
  Command,
  GalleryVerticalEnd,
  Hammer,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useState } from "react";
import { SpreadsheetSwitcher } from "./speadsheet-switcher";
import { useLocale } from "next-intl";
import Link from "next/link";

// Menu items
const items = [
  { title: "Analytics", url: "/", icon: ChartLine },
  { title: "Sales", url: "/sales", icon: ShoppingCart },
  { title: "Products", url: "/products", icon: Box },
  { title: "Team", url: "/team", icon: Users },
  { title: "tools", url: "#", icon: Hammer },
  { title: "Settings", url: "#", icon: Settings },
];

const data = {
  name: "rasheem",
  email: "mohdrasheem07@gmail.com",
  avatar: "/avatar.jpg",
};

export function AppSidebar() {
  const locale = useLocale()
  const [isActive, setIsActive] = useState("");

  const teams = [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-r-gray-300">
      <SidebarHeader className="flex gap-x-4">
        <SidebarTrigger className="self-end bg-blue-500 dark:bg-blue-700 hover:bg-blue-600" />
        <SpreadsheetSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => setIsActive(item.title)}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={
                      isActive === item.title || item.title === "Dashboard"
                    }
                  >
                    <Link prefetch href={`/${locale}/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data} />
      </SidebarFooter>
    </Sidebar>
  );
}
