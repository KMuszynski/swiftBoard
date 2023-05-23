export type AnyObject = Record<string, unknown>

export type CommonModalProps = {
  open: boolean
  onClose: () => void
  onComplete?: () => void
}
