import { Grid, Filter } from 'lucide-react'

export const VIEW_TYPES = {
  GRID: 'grid',
  FILTER: 'filter'
}

export const VIEW_OPTIONS = [
  {
    id: VIEW_TYPES.GRID,
    label: 'Grid View',
    icon: Grid,
    description: 'Browse all skip options in a visual grid'
  },
  {
    id: VIEW_TYPES.FILTER,
    label: 'Filter View', 
    icon: Filter,
    description: 'Use filters to find your perfect skip'
  }
]
