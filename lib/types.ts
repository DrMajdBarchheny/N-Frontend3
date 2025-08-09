export interface NavigationItem {
  name: string
  href: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  bio: string
  experience: string
  specialties: string[]
  achievements: string[]
  image: string
  email: string
  linkedin?: string
  phone?: string
  featured: boolean
}

export interface Client {
  id: string
  name: string
  logo: string
  industry: string
  partnership_year: number
  project_type: string
  project_value: string
  description: string
  featured: boolean
  testimonial?: {
    text: string
    author: string
    position: string
    rating: number
  }
}



export interface Project {
  title: string
  category: string
  image: string
  description: string
}

export interface Stat {
  number: string
  label: string
  icon: any
}

export interface Service {
  icon: any
  title: string
  description: string
  color: string
}
