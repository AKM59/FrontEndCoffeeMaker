export interface NavItem {
  title: string
  icon: string
  to: string
}

export const navItems: NavItem[] = [
  { title: 'Orders', icon: 'mdi-list-box', to: '/' },
  { title: 'Customers', icon: 'mdi-account-box',   to: '/customers' },
  { title: 'Batches',   icon: 'mdi-cube',          to: '/batches'   },
  { title: 'About',     icon: 'mdi-information',   to: '/about'     },
]
