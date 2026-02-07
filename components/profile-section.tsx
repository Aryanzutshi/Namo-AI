'use client'

import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileData {
  name: string
  primaryEmail: string
  additionalEmails: string[]
  phoneNumbers: string[]
}

const STORAGE_KEY = 'profile-config'

export function ProfileSection() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    primaryEmail: '',
    additionalEmails: [],
    phoneNumbers: [],
  })

  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [initialProfile, setInitialProfile] = useState<ProfileData | null>(null)

  // Load saved profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setProfile(parsed)
      setInitialProfile(parsed)
    }
  }, [])

  const saveProfile = () => {
    if (!profile.primaryEmail) {
      alert('Primary email is required')
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    setInitialProfile(profile)
    alert('Profile saved')
  }

  const cancelChanges = () => {
    if (initialProfile) {
      setProfile(initialProfile)
    }
  }

  const handleAddEmail = () => {
    if (newEmail && !profile.additionalEmails.includes(newEmail)) {
      setProfile({
        ...profile,
        additionalEmails: [...profile.additionalEmails, newEmail],
      })
      setNewEmail('')
    }
  }

  const handleAddPhone = () => {
    if (newPhone && !profile.phoneNumbers.includes(newPhone)) {
      setProfile({
        ...profile,
        phoneNumbers: [...profile.phoneNumbers, newPhone],
      })
      setNewPhone('')
    }
  }

  const handleRemoveEmail = (index: number) => {
    setProfile({
      ...profile,
      additionalEmails: profile.additionalEmails.filter((_, i) => i !== index),
    })
  }

  const handleRemovePhone = (index: number) => {
    setProfile({
      ...profile,
      phoneNumbers: profile.phoneNumbers.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information for phone agent access
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Primary Email *</Label>
          <Input
            type="email"
            value={profile.primaryEmail}
            onChange={(e) =>
              setProfile({ ...profile, primaryEmail: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Additional Emails */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Additional Emails</h2>

        <div className="flex gap-2">
          <Input
            value={newEmail}
            placeholder="Add another email"
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
          />
          <Button size="sm" onClick={handleAddEmail}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {profile.additionalEmails.map((email, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span>{email}</span>
            <button onClick={() => handleRemoveEmail(index)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Phone Numbers */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Phone Numbers</h2>

        <div className="flex gap-2">
          <Input
            value={newPhone}
            placeholder="Add phone number"
            onChange={(e) => setNewPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddPhone()}
          />
          <Button size="sm" onClick={handleAddPhone}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {profile.phoneNumbers.map((phone, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span>{phone}</span>
            <button onClick={() => handleRemovePhone(index)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={saveProfile}>Save Profile</Button>
        <Button variant="outline" onClick={cancelChanges}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
