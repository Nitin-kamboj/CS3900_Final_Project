import { createLazyFileRoute } from '@tanstack/react-router'
import { Contact } from '../components/contact.jsx'

export const Route = createLazyFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return <Contact />
}