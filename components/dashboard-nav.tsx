'use client'

import React from "react"

import { LayoutDashboard, User, Users } from 'lucide-react'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

type TabType = 'overview' | 'profile' | 'contacts'

interface DashboardNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const navItems: Array<{
    id: TabType
    label: string
    icon: React.ReactNode
    description: string
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="h-4 w-4" />,
      description: 'Dashboard overview',
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: <User className="h-4 w-4" />,
      description: 'Your contact information',
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: <Users className="h-4 w-4" />,
      description: 'Manage contacts directory',
    },
  ]

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div>
          <h1 className="font-semibold text-sidebar-foreground">Namo Dashboard</h1>
          <p className="text-xs text-sidebar-foreground/60">v1.0</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    tooltip={item.description}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Integrations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton disabled className="text-xs">
                  <span className="text-sidebar-foreground/50">
                    Phone Agent
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled className="text-xs">
                  <span className="text-sidebar-foreground/50">
                    Calendar Sync
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}
