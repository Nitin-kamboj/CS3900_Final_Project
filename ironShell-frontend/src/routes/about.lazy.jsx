import { createLazyFileRoute } from '@tanstack/react-router'
import { About as AboutComponent } from '../components/about.jsx'

export const Route = createLazyFileRoute('/about')({
  component: ()=> <AboutComponent/>,
})
