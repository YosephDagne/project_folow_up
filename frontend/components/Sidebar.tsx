"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Building2,
  UserCog,
  Users2,
  UserCircle2,
  Settings,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-[var(--background)] shadow-xl
        overflow-hidden transition-[width] duration-500 ease-in-out
        ${isSidebarCollapsed ? "w-0" : "w-64"}
      `}
    >
      {!isSidebarCollapsed && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <Image src="/logo.png" alt="Logo" width={40} height={50} />

            <button
              className="p-1 hover:opacity-70"
              onClick={() => dispatch(setIsSidebarCollapsed(true))}
              aria-label="Collapse Sidebar"
            >
              <Menu className="h-6 w-6 text-[var(--text)] cursor-pointer" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <SidebarLink icon={LayoutDashboard} label="Dashboard" href="/" />
            <SidebarLink
              icon={FolderKanban}
              label="Projects"
              href="/projects"
            />
            <SidebarLink
              icon={UserCog}
              label="Project Managers"
              href="/project_manager"
            />
            <SidebarLink
              icon={Users2}
              label="Team Leaders"
              href="/team_leaders"
            />
            <SidebarLink
              icon={UserCircle2}
              label="Project Owners"
              href="/project_owner"
            />
            <SidebarLink icon={Building2} label="Teams" href="/teams" />
            <SidebarLink icon={Settings} label="Settings" href="/settings" />
          </nav>
        </div>
      )}
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href === "/" && pathname === "/dashboard");

  return (
    <Link href={href} className="block w-full">
      <div
        className={`relative flex items-center gap-4 px-6 py-3 rounded-md transition-colors duration-200 
          ${
            isActive
              ? "bg-blue-100 dark:bg-gray-700 text-blue-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--text)]"
          }`}
      >
        {isActive && (
          <span className="absolute left-0 h-full w-1 bg-blue-500 rounded-r" />
        )}
        <Icon className="h-6 w-6" />
        <span className="text-xl font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
