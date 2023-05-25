export const baseStyle: React.CSSProperties = {
  alignItems: 'center',
  borderColor: '#eeeeee',
  borderRadius: '10px',
  borderStyle: 'dashed',
  borderWidth: 2,
  color: '#bdbdbd',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  outline: 'none',
  padding: '30px',
  transition: 'border .24s ease-in-out',
}

export const focusedStyle: React.CSSProperties = {
  borderColor: '#2196f3',
  backgroundColor: 'rgba(33, 149, 243, 0.5)',
}

export const acceptStyle: React.CSSProperties = {
  borderColor: '#00e676',
  backgroundColor: 'rgba(0, 230, 119, 0.5)',
}

export const rejectStyle: React.CSSProperties = {
  borderColor: '#ff1744',
  backgroundColor: 'rgba(255, 23, 69, 0.5)',
}
