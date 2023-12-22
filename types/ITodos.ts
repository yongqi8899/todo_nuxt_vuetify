export interface ITodos {
  id: number | string
  title: string
  description: string
  priority: number
  created: Date
  done: boolean
  image: string
  category_id: number | null
}
