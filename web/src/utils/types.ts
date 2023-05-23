export type AnyObject = Record<string, unknown>

export type CommonModalProps = {
  open: boolean
  onClose: () => void
  onComplete?: () => void
}

export type SelectOption<T = string> = {
  label: string
  value: T
}
