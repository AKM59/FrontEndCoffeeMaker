
export interface PriorityItem {
  label: string
  value: number
  color?: string      
}

export const priorityItems: PriorityItem[] = [
  { label: 'Critical', value: 1, color: 'red' },
  { label: 'High',     value: 2, color: 'orange' },
  { label: 'Medium',   value: 3, color: 'primary' },
  { label: 'Low',      value: 4, color: 'green' },
  { label: 'Very Low', value: 5, color: 'grey' },
]


