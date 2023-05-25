import {supabase} from '@/api'

const fetchTasks = async (setTasks) => {
  const {data, error} = await supabase.from('tasks').select()

  if (error) {
    toast({
      title: 'Błąd.',
      description: 'Nie można pobrać tasków.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    setTasks(null)
  }
  if (data) {
    setTasks(data)
  }
}

export default fetchTasks
