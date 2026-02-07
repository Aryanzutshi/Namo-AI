'use client'

import { useState } from 'react'
import { Plus, Trash2, Mail, Phone, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

export function ContactsDirectory() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleAddContact = () => {
    if (formData.name && formData.email) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          ...formData,
        },
      ])
      setFormData({ name: '', email: '', phone: '' })
      setShowForm(false)
    }
  }

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your directory of contacts for agent access
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Add New Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-sm">
                Name *
              </Label>
              <Input
                id="contact-name"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-sm">
                Email *
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="text-sm">
                Phone
              </Label>
              <Input
                id="contact-phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAddContact}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Add Contact
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false)
                setFormData({ name: '', email: '', phone: '' })
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No contacts yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Add people to your contacts directory to make them available to
            your phone agent.
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Contact
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-card border border-border rounded-lg p-4 space-y-3 hover:border-accent/50 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
              </div>

              <div className="space-y-2 text-sm">
                {contact.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 text-xs h-8"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 text-xs h-8 hover:text-destructive"
                  onClick={() => handleRemoveContact(contact.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
