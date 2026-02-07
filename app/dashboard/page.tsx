'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardNav } from '@/components/dashboard-nav'
import { ProfileSection } from '@/components/profile-section'
import { ContactsDirectory } from '@/components/contacts-directory'
import { QuickStatsCard } from '@/components/quick-stats-card'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'

type TabType = 'overview' | 'profile' | 'contacts'

interface AgentConfig {
  phoneAccess: boolean
  dataSharing: boolean
  notifications: boolean
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
      </Sidebar>

      <SidebarInset>
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          <div className="h-full w-full">
            {activeTab === 'overview' && <OverviewSection />}
            {activeTab === 'profile' && <ProfileSection />}
            {activeTab === 'contacts' && <ContactsDirectory />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function OverviewSection() {
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    phoneAccess: false,
    dataSharing: false,
    notifications: true,
  })

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Namo Dashboard. Manage your information and credentials here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickStatsCard
          title="Profile Status"
          value="Active"
          description="Your profile is complete"
          icon="✓"
        />
        <QuickStatsCard
          title="Contacts"
          value="0"
          description="People in your directory"
          icon="👥"
        />
        <QuickStatsCard
          title="Last Activity"
          value="Just now"
          description="Platform activity log"
          icon="🕐"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Getting Started */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Getting Started
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-accent font-bold">1.</span>
              <span>Complete your profile with contact details</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">2.</span>
              <span>Add people to your contacts directory</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">3.</span>
              <span>Configure agent permissions and settings</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">4.</span>
              <span>Enable phone agent to access your data</span>
            </li>
          </ul>
        </div>

        {/* Agent Configuration */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Agent Configuration
          </h2>

          <div className="space-y-4">
            {/* Phone Agent Access */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Phone Agent Access
                </p>
                <p className="text-xs text-muted-foreground">
                  Allow the AI agent to place and receive calls on your behalf
                </p>
              </div>
              <Switch
                checked={agentConfig.phoneAccess}
                onCheckedChange={(checked) =>
                  setAgentConfig({ ...agentConfig, phoneAccess: checked })
                }
              />
            </div>

            {/* Data Sharing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Data Sharing
                </p>
                <p className="text-xs text-muted-foreground">
                  Share context data to improve agent responses
                </p>
              </div>
              <Switch
                checked={agentConfig.dataSharing}
                onCheckedChange={(checked) =>
                  setAgentConfig({ ...agentConfig, dataSharing: checked })
                }
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Receive alerts for agent activity and call summaries
                </p>
              </div>
              <Switch
                checked={agentConfig.notifications}
                onCheckedChange={(checked) =>
                  setAgentConfig({ ...agentConfig, notifications: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
