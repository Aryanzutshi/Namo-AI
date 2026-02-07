'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface ContactFormProps {
  contacts: {
    name: string
    primaryEmail: string
    additionalEmails: string[]
    phoneNumbers: string[]
  }
  onUpdate: (contacts: {
    name: string
    primaryEmail: string
    additionalEmails: string[]
    phoneNumbers: string[]
  }) => void
  editingIndex: { type: 'email' | 'phone'; index: number } | null
  onEditingIndexChange: (index: { type: 'email' | 'phone'; index: number } | null) => void
}

export function ContactForm({
  contacts,
  onUpdate,
  editingIndex,
  onEditingIndexChange,
}: ContactFormProps) {
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleAddEmail = () => {
    if (newEmail.trim()) {
      onUpdate({
        ...contacts,
        additionalEmails: [...contacts.additionalEmails, newEmail.trim()],
      })
      setNewEmail('')
    }
  }

  const handleAddPhone = () => {
    if (newPhone.trim()) {
      onUpdate({
        ...contacts,
        phoneNumbers: [...contacts.phoneNumbers, newPhone.trim()],
      })
      setNewPhone('')
    }
  }

  const handleUpdateEmail = (index: number, value: string) => {
    const updated = [...contacts.additionalEmails]
    updated[index] = value
    onUpdate({
      ...contacts,
      additionalEmails: updated,
    })
  }

  const handleUpdatePhone = (index: number, value: string) => {
    const updated = [...contacts.phoneNumbers]
    updated[index] = value
    onUpdate({
      ...contacts,
      phoneNumbers: updated,
    })
  }

  return (
    <div className="space-y-6">
      {/* Name Field */}
      <div className="bg-card border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={contacts.name}
          onChange={(e) =>
            onUpdate({
              ...contacts,
              name: e.target.value,
            })
          }
          placeholder="Enter your full name"
          className="w-full bg-input border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Primary Email */}
      <div className="bg-card border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Primary Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          value={contacts.primaryEmail}
          onChange={(e) =>
            onUpdate({
              ...contacts,
              primaryEmail: e.target.value,
            })
          }
          placeholder="your.email@example.com"
          className="w-full bg-input border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Additional Emails */}
      <div className="bg-card border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-4">
          Additional Emails
        </label>

        {contacts.additionalEmails.length > 0 && (
          <div className="space-y-2 mb-4">
            {contacts.additionalEmails.map((email, index) => (
              <div key={index} className="flex gap-2 items-center">
                {editingIndex?.type === 'email' && editingIndex?.index === index ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleUpdateEmail(index, e.target.value)}
                    onBlur={() => onEditingIndexChange(null)}
                    autoFocus
                    className="flex-1 bg-input border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <button
                    onClick={() => onEditingIndexChange({ type: 'email', index })}
                    className="flex-1 text-left bg-input border border-border px-3 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    {email}
                  </button>
                )}
                <button
                  onClick={() =>
                    onUpdate({
                      ...contacts,
                      additionalEmails: contacts.additionalEmails.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove email"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
            placeholder="another.email@example.com"
            className="flex-1 bg-input border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleAddEmail}
            className="bg-accent text-accent-foreground px-4 py-2 font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="bg-card border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-4">
          Phone Numbers
        </label>

        {contacts.phoneNumbers.length > 0 && (
          <div className="space-y-2 mb-4">
            {contacts.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2 items-center">
                {editingIndex?.type === 'phone' && editingIndex?.index === index ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleUpdatePhone(index, e.target.value)}
                    onBlur={() => onEditingIndexChange(null)}
                    autoFocus
                    className="flex-1 bg-input border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <button
                    onClick={() => onEditingIndexChange({ type: 'phone', index })}
                    className="flex-1 text-left bg-input border border-border px-3 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    {phone}
                  </button>
                )}
                <button
                  onClick={() =>
                    onUpdate({
                      ...contacts,
                      phoneNumbers: contacts.phoneNumbers.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove phone number"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPhone()}
            placeholder="+1 (555) 000-0000"
            className="flex-1 bg-input border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleAddPhone}
            className="bg-accent text-accent-foreground px-4 py-2 font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
