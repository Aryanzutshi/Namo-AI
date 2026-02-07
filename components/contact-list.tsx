'use client'

import { Mail, Phone, User } from 'lucide-react'

interface ContactListProps {
  contacts: {
    name: string
    primaryEmail: string
    additionalEmails: string[]
    phoneNumbers: string[]
  }
  onRemove: (type: 'email' | 'phone', index: number) => void
}

export function ContactList({ contacts }: ContactListProps) {
  const hasContent =
    contacts.name ||
    contacts.primaryEmail ||
    contacts.additionalEmails.length > 0 ||
    contacts.phoneNumbers.length > 0

  return (
    <div className="bg-card border border-border p-6">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Saved Contact Information
      </h2>

      {!hasContent ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Add your information above to see it displayed here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Name */}
          {contacts.name && (
            <div className="border-l-4 border-accent pl-4">
              <div className="flex items-center gap-2 mb-1">
                <User size={18} className="text-accent" />
                <span className="text-sm text-muted-foreground">Name</span>
              </div>
              <p className="text-lg text-foreground font-medium">{contacts.name}</p>
            </div>
          )}

          {/* Primary Email */}
          {contacts.primaryEmail && (
            <div className="border-l-4 border-accent pl-4">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={18} className="text-accent" />
                <span className="text-sm text-muted-foreground">Primary Email</span>
              </div>
              <p className="text-lg text-foreground font-medium">{contacts.primaryEmail}</p>
            </div>
          )}

          {/* Additional Emails */}
          {contacts.additionalEmails.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 border-l-4 border-accent pl-4">
                <Mail size={18} className="text-accent" />
                <span className="text-sm text-muted-foreground">Additional Emails</span>
              </div>
              <div className="space-y-2 ml-4">
                {contacts.additionalEmails.map((email, index) => (
                  <div
                    key={index}
                    className="bg-input border border-border p-2 text-foreground text-sm"
                  >
                    {email}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phone Numbers */}
          {contacts.phoneNumbers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 border-l-4 border-accent pl-4">
                <Phone size={18} className="text-accent" />
                <span className="text-sm text-muted-foreground">Phone Numbers</span>
              </div>
              <div className="space-y-2 ml-4">
                {contacts.phoneNumbers.map((phone, index) => (
                  <div
                    key={index}
                    className="bg-input border border-border p-2 text-foreground text-sm"
                  >
                    {phone}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
