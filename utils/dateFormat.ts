import dayjs from 'dayjs'

export default function formatDate(dateString: string) {
  const date = dayjs(dateString)
  return date.format('DD-MM-YYYY')
}
